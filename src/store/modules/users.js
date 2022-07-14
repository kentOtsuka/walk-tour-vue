import axios from "../../plugins/axios";

const state = {
  authUser: null,
  users: []
};

const getters = {
  authUser: (state) => state.authUser,
  users: state => state.users,
};

const mutations = {
  // current_userをstateに保持させる
  setUser: (state, user) => {
    state.authUser = user;
  },
  // 新規ユーザをUserテーブルに追加
  addUser: (state, user) => {
    state.users.push(user)
  }
};

const actions = {
  async loginUser({ commit }, user) {
    // Rails側にユーザーのログイン情報を送り、返ってきたレスポンスをsessionsResponseという定数に定義している
    const sessionsResponse = await axios.post("/login", user);
    if (sessionsResponse.data.token != null) {
      // レスポンスのtoken部分を抽出し、localStorageのauth_tokenに保持させる
      localStorage.auth_token = sessionsResponse.data.token;
      // tokenをBearerヘッダー入れることでapi通信するたびに毎回tokenを設定する必要がなくなるように設定（ステートレス）
      axios.defaults.headers.common[ "Authorization" ] = `Bearer ${localStorage.auth_token}`;
      // current_userの取得
      const userResponse = await axios.get("/users/me");
      commit("setUser", userResponse.data);
      return 'success'
    } else {
      return 'fail'
    }
  },
  // ログアウト処理
  logoutUser({ commit }) {
    // localStorageからauth_tokenに削除
    localStorage.removeItem("auth_token");
    // tokenをBearerヘッダーから消す
    axios.defaults.headers.common["Authorization"] = "";
    // current_userをnulにする
    commit("setUser", null);
  },
  // 新規登録メソッド
  async registerUser({ commit }, user) {
    const response = await axios.post("/register", user);
    if (response.data.user != null) {
      commit("addUser", response.data.user)
      return 'success'
    } else {
      return 'fail';
    }
  },

  // current_userが存在するかを確認
  async fetchAuthUser({ commit, state }) {
    // localStorageにauth_tokenが無ければログインしていないということでその時点で終了
    if (!localStorage.auth_token) return null;
    // stateに認証済みユーザーが入ればそれを返す
    if (state.authUser) return state.authUser;
    // ユーザー情報をサーバに問い合わせ、レスポンスをステートに設定し、そのレスポンスを返却する
    const userResponse = await axios.get("/users/me").catch(err => {
      console.log(err.response)
      return null;
    });
    if (!userResponse) return null;
    const authUser = userResponse.data;
    if (authUser) {
      commit("setUser", authUser);
      return authUser;
    } else {
      commit("setUser", null);
      return null;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

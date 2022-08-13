const getters = {};

const state = {
  //初期状態を定義
  text: '',
  snackbar: false,
};

const mutations = {
  //stateをmutationsで変更する。
  setSnackbar: (state, text) => {
    state.snackbar = true;
    state.text = text;
  },
  unsetSnackbar: () => {
    state.snackbar = false;
    state.text = '';
  },
};

const actions = {
  //スナックバーを表示させる時の関数（第一引数に表示するテキストの内容)
  openSnackbar: ({ commit }, text) => {
    //mutationsを発動させる。テキストの内容を引数で持たせる
    //commit('mutatiuonsの関数名')でmutationsを発動させられる
    commit('setSnackbar', text);
  },
  //スナックバーを非表示にする関数
  closeSnackbar: ({ commit }) => {
    commit('unsetSnackbar');
  },
};

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions,
};

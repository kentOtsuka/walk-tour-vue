import Vue from "vue";
import Router from "vue-router";
import store from "./store"
import Home from "./pages/TheHome.vue"
import SpotResult from "./pages/SpotResult.vue"
import SpotRanking from "./pages/SpotRanking.vue"
import SpotRequest from "./pages/SpotRequest.vue"
import NewsList from "./pages/NewsList.vue"
import UserProfile from "./pages/UserProfile.vue"
import Login from "./pages/auth/TheLogin.vue"
import Register from "./pages/auth/TheRegister.vue"

// VueRouterの宣言
Vue.use(Router)
Vue.config.productionTip = false

// URLの設定
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/", component: Home, name: "Home"
    },
    {
      path: "/countries/:id", component: SpotResult, name: "SpotResult", props: true,
    },
    {
      path: "/profile", component: UserProfile, name: "UserProfile", meta: { requiredAuth: true }
    },
    {
      path: "/login", component: Login, name: "Login", meta: { loggedIn: true }
    },
    {
      path: "/register", component: Register, name: "Register", meta: { loggedIn: true }
    },
    {
      path: "/spotRanking", component: SpotRanking, name: "SpotRanking",
    },
    {
      path: "/newsList", component: NewsList, name: "NewsList"
    },
    {
      path: "/spotRequest", component: SpotRequest, name: "SpotRequest", meta: { requiredAuth: true }
    },
  ],
  // 画面遷移後は先頭位置で表示
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

// ページ遷移時に必ず実行される
router.beforeEach((to, from, next) => {
  // storeに認証済みのユーザが存在するかを問合せる
  store.dispatch("users/fetchAuthUser")
  .then(authUser => {
    if (to.matched.some(record => record.meta.requiredAuth) && !authUser) {
      // 認証済みユーザーが存在しないかつ遷移先のページが要ログインのページであればログインページに飛ばすという処理
      next({ name: "Login" });
    } else if (to.matched.some(record => record.meta.loggedIn) && authUser) {
      // ログイン済みの時にログイン、新規登録ページにリダイレクトされないようにする処理
      next({ name: "UserProfile", params: { id: authUser.id } });
    } else {
      next();
    }
  })
});



export default router;
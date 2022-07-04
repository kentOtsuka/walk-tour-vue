import Vue from "vue";
import Router from "vue-router";
import store from "./store"
import Home from "./pages/Home.vue"
import SpotResult from "./pages/SpotResult.vue"
import SpotRanking from "./pages/SpotRanking.vue"
import SpotRequest from "./pages/SpotRequest.vue"
import NewsList from "./pages/NewsList.vue"
import Login from "./pages/auth/Login.vue"
import Register from "./pages/auth/Register.vue"

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
      path: "/login", component: Login, name: "Login"
    },
    {
      path: "/register", component: Register, name: "Register",
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
  ]
})

// ページ遷移時に必ず実行される
router.beforeEach((to, from, next) => {
  // storeに認証済みのユーザが存在するかを問合せる
  store.dispatch("users/fetchAuthUser")
  .then(authUser => {
    // 認証済みユーザーが存在しないかつ遷移先のページが要ログインのページであればログインページに飛ばすという処理
    if (to.matched.some(record => record.meta.requiredAuth) && !authUser) {
      next({ name: "Login" });
    } else {
      next();
    }
  })
});

export default router;
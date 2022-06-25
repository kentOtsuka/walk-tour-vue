import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue"
import SpotResult from "./pages/SpotResult.vue"

// VueRouterの宣言
Vue.use(Router)
Vue.config.productionTip = false

// URLの設定
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/", component: Home, name: "Home",
    },
    {
      path: "/countries/:id", component: SpotResult, name: "SpotResult", props: true
    },
  ]
})


export default router;
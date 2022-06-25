import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router"
import store from "./store";

// jqvmapのモジュールを読み込み
require('./plugins/jqvmap-master/dist/jqvmap.css')
require('./plugins/jqvmap-master/dist/jquery.vmap.js')
require('./plugins/jqvmap-master/dist/maps/jquery.vmap.world.js')

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

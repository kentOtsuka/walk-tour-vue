import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueI18n from 'vue-i18n';
import VueMeta from 'vue-meta'
import router from './router';
import store from './store';

// jqvmapのモジュールを読み込み
require('./plugins/jqvmap-master/dist/jqvmap.css');
require('./plugins/jqvmap-master/dist/jquery.vmap.js');
require('./plugins/jqvmap-master/dist/maps/jquery.vmap.world.js');

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(VueMeta)
const data = require('./message.json');

const i18n = new VueI18n({
	locale: 'ja',
	messages: data
});

new Vue({
  vuetify,
  router,
  store,
  i18n,
  data: {},
  created() {},
  methods: {
    handleClick_changeLanguage(lang) {
      this.$i18n.locale = lang;
    }
  },
  render: (h) => h(App),
}).$mount('#app');

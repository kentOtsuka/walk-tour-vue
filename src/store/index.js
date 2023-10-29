import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users';
import util from './modules/snackbar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    util,
  },
});

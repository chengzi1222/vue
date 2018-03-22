import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

import common from './modules/common';
import layout from './modules/layout';
import sub from './modules/sub/index';


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    common,
    layout,
    sub,
  },
  getters
});

export default store;

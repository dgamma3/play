import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common';
import tags from './modules/tags';
import getters from './getters';

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    common,
    tags
  },
  getters,
})

export default store

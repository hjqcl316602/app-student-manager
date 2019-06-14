
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import basic from './basic'

export default new Vuex.Store({
  modules:{ basic },
  strict:false
})

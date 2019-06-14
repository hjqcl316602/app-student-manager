
import Vue from 'vue'
import App from './App'
import router from './vue.javascripts/vue.router'
import store from './vue.stores'

//************************************************ vue 通用方法 *******************************************************/
import './vue.javascripts/vue.global'
import './vue.javascripts/vue.mixins.filters'
import './vue.javascripts/vue.mixins.methods'

import './vue.javascripts/vue.prototype'


import "./vue.csses/merge.css";

Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

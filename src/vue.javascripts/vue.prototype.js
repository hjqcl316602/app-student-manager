import * as valids  from '../vue.javascript.utils/utils.valids'

Vue.use({
  install: function (Vue) {

    let utils = {
        ...valids,
    };

    Object.defineProperty( Vue.prototype,'$utils', { value : utils });
  }
})

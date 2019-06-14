
import * as configs  from './vue.configs'
import * as validates  from '../vue.javascript.utils/utils.valids'
import * as packages  from '../vue.javascript.utils/utils.package'
import * as doms  from '../vue.javascript.utils/utils.dom'
import * as numbers  from '../vue.javascript.utils/utils.numbers'
import * as dates  from '../vue.javascript.utils/utils.dates'


(function(window,document){


  window.configs = configs;
  window.validates = validates;
  window.packages = packages;
  window.doms = doms;
  window.numbers = numbers;
  window.dates = dates;

})(window,document);

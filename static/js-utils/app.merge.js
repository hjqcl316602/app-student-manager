/**
 * Created by 41587 on 2018/8/9.
 */

//import * as $cookies from './app.cookie'
import  $cookies from 'js-cookie'
import  * as $configs from '../js/vue.config'
import * as $arrays from './app.array'
import * as $doms from './app.dom'
import * as $https from './app.http'
import * as $browers from './app.brower'

export  default {
  install: function (Vue) {
    Object.defineProperty( Vue.prototype,'$configs', { value : $configs } );
    Object.defineProperty( Vue.prototype,'$cookies', { value : $cookies } );
    Object.defineProperty( Vue.prototype,'$arrays', { value : $arrays } );
    Object.defineProperty( Vue.prototype,'$doms', { value : $doms } );
    Object.defineProperty( Vue.prototype,'$https', { value : $https } );
    Object.defineProperty( Vue.prototype,'$browers', { value : $browers } );
  }
}

/**
 * Created by 41587 on 2018/9/9.
 */

import Vue from 'vue'

Vue.mixin({

  filters:{
    str_money(value){
      if(value){
        return (value / 100).toFixed(2) ;
      } else{
        return '0.00'
      }
    },
    str_sex(value){
      let sex = [ { text :'男',value:'1'},{ text:'女' ,value:'2'}];
      let index = sex.findIndex((item)=>{ return item['value']  == value  } ) ;
      return index > -1 ? sex[index]['text'] : "不详";
    },
    str_status_banner(value){
      let status_banner = [ { text :'草稿',value:'0'},{ text:'上架' ,value:'1'},{ text:'下架' ,value:'2'}];
      let index = status_banner.findIndex((item)=>{ return item['value']  == value  } ) ;
      return index > -1 ? status_banner[index]['text'] : "不详";
    }
  },

});





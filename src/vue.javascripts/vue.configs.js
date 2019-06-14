

const TYPE = 1;

const LOCAL = true ;

const HTTP_TYPE = function (){
  if(window.location.href.indexOf('dev.bstchain.com') > -1){/* http://dev.bstchain.com/sc/index.html#/Main/User*/
    return 'dev'; // 测试环境
  }
  if(window.location.href.indexOf('m.bstchain.com') > -1){
    return 'production'; // 生产环境
  }
  if(window.location.href.indexOf('192.168') > -1 || window.location.href.indexOf('localhost') > -1 ){
    return 'localhost'; //开发环境
  }
}();

// 接口请求地址 - 数据接口
const HTTP_REQUEST = function () {
  if (HTTP_TYPE === 'localhost') {
    return LOCAL ? 'http://192.168.0.109:18092/sm':'http://dev.bstchain.com/sm'
  } else {
    return '/sm';
  }
}();

const DEFAULT_PAGE = '/Main/Class';

export {
  TYPE,HTTP_TYPE,DEFAULT_PAGE,LOCAL,HTTP_REQUEST
}

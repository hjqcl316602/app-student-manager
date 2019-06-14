
// 1. 判断手机端浏览器的类型
function browserType(){
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if(isAndroid) {
    return 'android';
  }
  if(isiOS){
    return 'ios';
  }
};
function escape(str) {
  return str.replace(/[.*+?^$|[\](){}\\-]/g, '\\$&');
};
export {
  browserType,escape
}

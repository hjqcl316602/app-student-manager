export  function set(name,value,day) {
  var exp = new Date();
  exp.setTime(exp.getTime() + day*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}


export  function get(name) {
  var cookieTxt = decodeURIComponent(document.cookie);
  var arr = cookieTxt.split("; ");
  for(var i=0; i<arr.length; i++) {
    // userName=%E5%BC%A0%E4%B8%89
    var arr1 = arr[i].split("=");
    if(arr1[0]==name) {
      return arr1[1];
    }
  }
  return "";
}

export  function remove(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval =get(name);
  if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

export function clear() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if(keys) {
    for(var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}

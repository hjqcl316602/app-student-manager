
//  1. 连接的字符串，变驼峰
export function hump(str) {
  str = String(str)
  return str.replace(/-(\w)/g, function (m, c) {
    return c ? c.toUpperCase() : ''
  })
}

// 2. 随机生成指定长度的字符串
export function random(n){
  let standard = 'abcdefghijklmnopqrstuvwxyz9876543210';
  let len = standard.length;
  let result = '';
  for (let i = 0; i < n; i++) {
    result += standard.charAt(Math.floor(Math.random() * len))
  }
  return result;
}

//  3. 随机生成颜色值 16
export function random_color(){
  return `#${Math.random().toString(16).substr(2, 6)}`;
}

// 4. 转义特殊字符
export function escape(str){
  return str.replace(/[.*+?^$|[\](){}\\-]/g, '\\$&');
}

// 5. 将整个字符串转成大写字母
export function upper(str){
  return str.toUpperCase();
}

// 6. 将整个字符串转成大写字母
export function lower(str){
  return str.toLowerCase();
}

// 7. 返回字符串的一个子串，传入参数是 index -起始位置  i - 长度或结束位置 bool - 是长度还是结束位置
export function split(str,index,i,bool){
  if(!bool){
    return i ? str.substring(index || 0 ,i) : str.substring(index || 0);
  }else{
    return i ? str.substr(index || 0 ,i) : str.substr(index || 0);
  }
}

// 8.插入指定位置
export function insert_flg(str,flg,sn){
  var newstr="";
  for(var i=0;i<str.length;i+=sn){
    var tmp=str.substring(i, i+sn);
    newstr+=tmp+flg;
  }
  return newstr;
}
//
export function format(str){
  var str="?username=wang&pwd=12345&favs=running&favs=swimming&favs=basketball";
  //str=(str.replace("?",`{"`)+`"}`).replace(/&/g,`","`).replace(/=/g,`":"`)
// 拼接成JSON:{"username":"wang","pwd":"12345","favs":"running","favs":"swimming","favs":"basketball"}

  var newStr = str.slice(1);
  var strArray = newStr.split("&");
  var obj = {};
  strArray.forEach(function (item,i) {
    var newChildArr = item.split('=');
    if(obj[newChildArr[0]]){
      if (Array.isArray(obj[newChildArr[0]])){
        obj[newChildArr[0]] =[newChildArr[1]].concat(obj[newChildArr[0]]);
      }else{
        obj[newChildArr[0]] =[newChildArr[1]].concat([obj[newChildArr[0]]]);
      }
    }else{
      obj[newChildArr[0]] = newChildArr[1]
    }
  })
}

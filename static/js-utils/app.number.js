import * as valid from './app.valid.js'
// 判断是否是整数
export  function _is_integer(value){
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

//   判断是否是数字 可以是字符串隐式转化的数字
export  function  _is_number_express(o){
  var pattern = /^[0-9]+.?[0-9]*$/;  ///^[0-9]$/; // !isNaN(Number(o))
  return pattern.test(o);
}

// 移出小数部分
export  function _get_clear_decimal(val) {
  // 移出小数部分
  return isNaN(parseInt(val)) ? false :~~val;
}
// 格式化千位数
export  function _get_format_thousand(value){
  var result = "";
  //将证书部分和小数部分分开
  var valueParts = value.toString().split(".");
  var mostSignificationDigit = valueParts[0].length -1;   // 最高有效数字位，默认为个位
  var intervalOfDigit = 0;    // 逗号之间的位数（从零累计）
  var digit, countOfSignificationDigit;

  //按位取出整数部分的值
  //如果不加下面这句话，低版本浏览器可能无法处理整数部分
  var roundNum = valueParts[0].split("");

  for (var i = valueParts[0].length -1; i >= 0; i--) {
    digit = roundNum[i];
    result = digit + result;
    if (digit != "0") {
      mostSignificationDigit = i;
    }
    //每三位添加逗号
    if (3 == ++intervalOfDigit) {
      result = "," + result;
      intervalOfDigit = 0;
    }
    //alert(digit);
    //alert(result);
  }
  if (mostSignificationDigit == -1) {
    result = "0";
  }
  else {
    countOfSignificationDigit = valueParts[0].length - mostSignificationDigit;
    if (countOfSignificationDigit > 3) {
      result = result.substring(result.length - (countOfSignificationDigit%3 == 0 ? countOfSignificationDigit/3 - 1 : countOfSignificationDigit/3)  - countOfSignificationDigit);
    }
    else {
      result = result.substring(result.length - countOfSignificationDigit);
    }
  }
  if (valueParts.length == 2) {
    result += ".";
    var temp = 2 - valueParts[1].length;    // 是否需要补0
    for (var i = 0; i < temp; i++) {
      valueParts[1] += "0"
    }
    result += valueParts[1].substring(0, 2);
  }
  else {
    result += ".00";
  }
  return result;
}
// + 加法
export  function _get_add(a,b) {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), ( get_mul(a, e) +  get_mul(b, e)) / e;
}
// 减法
export  function _get_sub(a,b) {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (get_mul(a, e) -  get_mul(b, e)) / e;
}
// 乘法
export  function _get_mul(a,b){
  var c = 0,
    d = a.toString(),
    e = b.toString();
  try {
    c += d.split(".")[1].length;
  } catch (f) {}
  try {
    c += e.split(".")[1].length;
  } catch (f) {}
  return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
// 除法
export  function _get_div(a,b) {
  var c, d, e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) {}
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) {}
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")),  get_mul(c / d, Math.pow(10, f - e));
}

export  function  _get_decimal(num){
  if(!num||num==''){return ''}
  num+=''
  num = num.replace(/[^\-?\d.]/g,"");  //清除“数字”和“.”以外的字符
  num = num.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
  num = num.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
  num = num.replace(/^(\-)*(\d+)\.(\d{0,6}).*$/,'$1$2.$3');//最多输入6个小数
  if(num.indexOf(".")< 0 &&num.indexOf("-")< 0&& num !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    num= parseFloat(num);
  }
  return num;
}



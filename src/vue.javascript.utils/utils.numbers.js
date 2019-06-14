
// 1.获得千分位数据格式
function getFormatThousand(value){
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

function getStrMoney(value){
  if(value){
    return (value / 100).toFixed(2) ;
  } else{
    return '0.00'
  }
}

export {
  getFormatThousand,getStrMoney
}

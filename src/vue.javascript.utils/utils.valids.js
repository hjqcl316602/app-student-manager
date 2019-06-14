
// 1. 值类型的确定
function validTypes(x){
  let toString = Object.prototype.toString;
  if(x === null){
    return 'null';
  }

  const t= typeof x;

  if(t !== 'object'){
    return t;
  }

  let c;
  try {
    c = toString.call(x).slice(8, -1).toLowerCase();
  } catch(e) {
    return 'object';
  }

  if(c !== 'object'){
    return c;
  }

  if(x.constructor == Object){
    return c;
  }

  try {
    // Object.create(null)
    if (Object.getPrototypeOf(x) === null || x.__proto__ === null) {
      return 'object';
    }

    return 'unknown';
  } catch(e) {
    // ie下无Object.getPrototypeOf
    return 'unknown';
  }
}

// 2.判断一个值是否在一个范围内
function validInRange(x, min, max) {
  x = +x;
  min = +min;
  max = +max;

  // x 不是数字，则返回false
  if (isNaN(x)) return false;

  // min 或 max 不传，则认为不设置下限或上限
  return (!isNaN(min) ? x >= min : true) && (!isNaN(max) ? x <= max : true);
}

// 3.判断一个值是否是数字
function validNumber(x, min, max) {
  return validTypes(x) === 'number' && validInRange(x, min, max);
}

//4.判断一个值是否是一个范围内整数
function validNumberInteger(x, min, max) {
  return parseInt(x, 10) === x  && validInRange(x, min, max);
}

function validNumberInt(x) {
  // -2^31 ~ 2^31-1
  return validNumberInteger(x, -2147483648, 2147483647);
}

function validBoolean(x) {
  return validTypes(x) === 'boolean';
}

function validString(x) {
  return validTypes(x) === 'string';
}

function validEmptyString (x) {
  if (!validString(x)) return false;

  return /^\s*$/.test(x);
}

function validNull(x) {
  return validTypes(x) === 'null';
}

function validUndefined(x) {
  return validTypes(x) === 'undefined';
}

function validObject(x) {
  return validTypes(x) === 'object';
}

function validFunction(x) {
  return validTypes(x) === 'function';
}

function validArray(x) {
  return validTypes(x) === 'array';
}



export {
  validTypes,validInRange,validNumber,validNumberInteger,validNumberInt,validBoolean,
  validString,validEmptyString,validNull,validUndefined,validObject,validFunction,validArray
}


/*********************************************** tiny-cookie 拿过来的 *****************************************************/

// 1. 判断对象是否存在某个字段
export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

// 2. 特殊字符串的转义
export function escapeRe(str) {
  return str.replace(/[.*+?^$|[\](){}\\-]/g, '\\$&');
}

// Return a future date by the given string.
export function computeExpires(str) {
  const lastCh = str.charAt(str.length - 1);
  const value = parseInt(str, 10);
  let expires = new Date();

  switch (lastCh) {
    case 'Y': expires.setFullYear(expires.getFullYear() + value); break;
    case 'M': expires.setMonth(expires.getMonth() + value); break;
    case 'D': expires.setDate(expires.getDate() + value); break;
    case 'h': expires.setHours(expires.getHours() + value); break;
    case 'm': expires.setMinutes(expires.getMinutes() + value); break;
    case 's': expires.setSeconds(expires.getSeconds() + value); break;
    default: expires = new Date(str);
  }

  return expires;
}

// Convert an object to a cookie option string. 将对象转换为Cookie选项字符串。
export function convert(opts) {
  let res = '';

  // eslint-disable-next-line
  for (const key in opts) {
    if (hasOwn(opts, key)) {
      if (/^expires$/i.test(key)) {
        let expires = opts[key];

        if (typeof expires !== 'object') {
          expires += typeof expires === 'number' ? 'D' : '';
          expires = computeExpires(expires);
        }
        res += `;${key}=${expires.toUTCString()}`;
      } else if (/^secure$/.test(key)) {
        if (opts[key]) {
          res += `;${key}`;
        }
      } else {
        res += `;${key}=${opts[key]}`;
      }
    }
  }

  if (!hasOwn(opts, 'path')) {
    res += ';path=/';
  }

  return res;
}
/*********************************************** cube-ui 拿过来的 *****************************************************/



export function deepAssign(to, from) {
  for (let key in from) {
    if (!to[key] || typeof to[key] !== 'object') {
      to[key] = from[key]
    } else {
      deepAssign(to[key], from[key])
    }
  }
}

export function createAddAPI(baseObj) {
  return   function add(...args) {
    if (typeof args[0] === 'string') {
      args[0] = {
        [args[0]]: args[1]
      }
    }
    deepAssign(baseObj, args[0])
  }
}

export function toLocaleDateString(timestamp, locale) {
  const date = new Date(timestamp)

  if (locale === 'zh') {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  } else {
    return date.toDateString()
  }
}

const typesReset = {
  _set(obj, key, value) {
    obj[key] = value
  },
  string(obj, key) {
    typesReset._set(obj, key, '')
  },
  number(obj, key) {
    typesReset._set(obj, key, 0)
  },
  boolean(obj, key) {
    typesReset._set(obj, key, false)
  },
  object(obj, key, value) {
    if (Array.isArray(value)) {
      typesReset._set(obj, key, [])
    } else {
      typesReset._set(obj, key, {})
    }
  }
}

export function resetTypeValue(obj, key, defVal) {
  if (defVal !== undefined) {
    return typesReset._set(obj, key, defVal)
  }
  if (key) {
    const value = obj[key]
    const resetHandler = typesReset[typeof value]
    resetHandler && resetHandler(obj, key, value)
  } else {
    Object.keys(obj).forEach((key) => {
      resetTypeValue(obj, key)
    })
  }
}

export function parallel(tasks, cb) {
  let doneCount = 0
  let results = []
  const tasksLen = tasks.length
  if (!tasksLen) {
    return cb(results)
  }
  tasks.forEach((task, i) => {
    task((ret) => {
      doneCount += 1
      results[i] = ret
      if (doneCount === tasksLen) {
        // all tasks done
        cb(results)
      }
    })
  })
}

export function cb2PromiseWithResolve(cb) {
  let promise
  if (typeof window.Promise !== 'undefined') {
    const _cb = cb
    promise = new window.Promise((resolve) => {
      cb = (data) => {
        _cb && _cb(data)
        resolve(data)
      }
    })
    promise.resolve = cb
  }
  return promise
}

export function debounce(func, wait, immediate, initValue) {
  let timeout
  let result = initValue

  const later =  function (context, args) {
    timeout = null
    if (args) {
      result = func.apply(context, args)
    }
  }

  const debounced =  function (...args) {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(this, args)
      }
    } else {
      timeout = setTimeout(() => {
        later(this, args)
      }, wait)
    }

    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}




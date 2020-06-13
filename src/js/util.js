import store from '@/store/index'

/** 转换rem为px，取整。需要等待rem生效后方可执行 */
export function rem2px(rem) {
  return parseInt(store.state.deviceWidth / 3.75 * rem)
}

// 获取cookie、
export function getCookie(name) {
  var arr = ''
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
  arr = document.cookie.match(reg)
  if (arr)
    return (arr[2])
  else
    return null
}

// 设置cookie
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  // exdate.setTime(exdate.getTime() + expiredays * 60 * 1000);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

// 删除cookie
export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
}


// localStorage
export const saveStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}
// sessionStorage 部分
/**
 * 存储sessionStorage
 */
export const setSession = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
}
/**
 * 获取sessionStorage
 */
export const getSession = name => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
}
/**
 * 删除sessionStorage
 */
export const removeSession = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
}

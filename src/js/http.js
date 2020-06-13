/*
 * @Author: xuanpl
 * @Date: 2020-03-23 21:46:02
 * @LastEditors: xuanpl
 * @LastEditTime: 2020-06-13 18:44:31
 * @Description: file content
 * @FilePath: /happy_battle/src/js/http.js
 */
import axios from 'axios'
import { getCookie } from '@/js/util'
import weui from 'weui.js'

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://192.168.1.104:7001'; //测试环境
let Content_Type = 'application/json;charset=utf-8';

//http request 拦截器，通过这个，把token传到后台
axios.interceptors.request.use(config => {
  let token = getCookie('X-token')
  config.headers = {
    'Content-Type': Content_Type,
    'Authorization': `Bearer ${token}`
  };
  return config;
}, err => {
  return Promise.reject(err)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  const res = response.data

  // if the custom code is not 20000, it is judged as an error.
  if (parseInt(res.code / 10000) !== 2) {
    weui.alert((res.msg || '权限错误') + '，请重新登录')

    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {

    // }
    return Promise.reject(new Error(res.msg || 'Error'))
  } else {
    return res
  }
}, error => {
  console.log('err' + error) // for debug
  weui.alert((error.msg || '网络错误') + '，请重新登录')
  return Promise.reject(error)
})
/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}, dataType) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    })
  })
}
/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    })
  })
}
/**
 * delete 请求方法 (delete保留，不能使用)
 * @param url
 * @param params
 * @returns {Promise}
 */
export function _delete(url, data = {}, newUrl, dataType) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      data: data
    }).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    })
  })
}
/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    })
  })
}
/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    })
  })
}
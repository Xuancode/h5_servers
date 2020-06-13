/*
 * @Author: xuanpl
 * @Date: 2020-03-18 15:47:27
 * @LastEditors: xuanpl
 * @LastEditTime: 2020-06-13 18:41:28
 * @Description: file content
 * @FilePath: /happy_battle/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { post, get, patch, put, _delete } from '@/js/http'
import './permission'
import weui from 'weui.js'
import 'weui'
Vue.prototype.$weui = weui

Vue.config.productionTip = false

Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.prototype.$delete = _delete

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

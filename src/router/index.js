import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/bottle',
    name: 'bottle',
    component: () => import ('../views/bottle.vue'),
    meta: {title: '你的快乐源泉小瓶子'}
  },
  {
    path: '/none',
    name: 'none',
    component: () => import('../views/none/index'),
    meta: {title: '\u200E'} // 此title为空
  },
  {
    path: '/room',
    name: 'room',
    component: () => import('../views/room/index'),
    meta: {title: '房间详情'}
  }
]

const router = new VueRouter({
  mode:'history', // 此模式会存在非懒加载的路由组件无法触发路由监听的问题
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import all from './modules/all' // 一级页面、注册登录找回密码页面
import my from './modules/my' // 个人中心的子级页面

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...all,
    ...my
  ]
})

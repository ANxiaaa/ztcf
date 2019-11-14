import Vue from 'vue'
import Router from 'vue-router'
import all from './modules/all' // 一级页面、注册登录找回密码页面
import my from './modules/my' // 个人中心的子级页面
import api from '@/http/api'
import store from '@/store'

Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    ...all,
    ...my
  ]
})
router.beforeEach((to, from, next) => {
  if(localStorage.getuser){
    api.login.getMemberInfo().then(res => {
      console.log(res)
      if(res.code == 200){
        store.commit('changeUserData', res.data)
        localStorage.getuser = ''
      }
    })
  }
  next()
})
export default router
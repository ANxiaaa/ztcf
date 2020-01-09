import Vue from 'vue'
import Router from 'vue-router'
import api from '@/http/api'
import store from '@/store'
import all from './modules/all' // 一级页面、注册登录找回密码页面
import my from './modules/my' // 个人中心的子级页面
import sale from './modules/sale' // 特价车的子级页面
import insurance from './modules/insurance' // 保险的子级页面
import index from './modules/index' // 首页的子级页面

Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    ...all,
    ...my,
    ...sale,
    ...insurance,
    ...index
  ]
})
router.beforeEach((to, from, next) => {
  if(localStorage.getuser && localStorage.isLogin){
    api.login.getMemberInfo().then(res => {
      console.log(res)
      if(res.code == 200){
        store.commit('changeUserData', res.data)
        localStorage.getuser = ''
      }
    }).catch(()=>{
      localStorage.removeItem('isLogin')
    })
  }
  next()
})
export default router
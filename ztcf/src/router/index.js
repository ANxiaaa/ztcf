import Vue from 'vue'
import Router from 'vue-router'
import api from '@/http/api'
import store from '@/store'
import all from './modules/all' // 一级页面、注册登录找回密码页面
import my from './modules/my' // 个人中心的子级页面
import sale from './modules/sale' // 特价车的子级页面
import insurance from './modules/insurance' // 保险的子级页面
import index from './modules/index' // 首页的子级页面
import information from './modules/information' // 资讯的子级页面

Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    ...all,
    ...my,
    ...sale,
    ...insurance,
    ...index,
    ...information
  ]
})
router.beforeEach((to, from, next) => {
  if(localStorage.getuser && localStorage.isLogin){
    api.login.getMemberInfo().then(res => {
      if(res.code == 200){
        console.log('changeUserData')
        console.log(res)
        store.commit('changeUserData', res.data)
        api.user.findMemberCarInfoByMemberId().then(carres=>{
          if(carres.code == 200){
            console.log('changeUserCarInfo')
            store.commit('changeUserCarInfo', carres.data)
            localStorage.getuser = ''
          }
        })
      }else{
        console.log(res)
        localStorage.removeItem('isLogin')
      }
    }).catch(()=>{
      localStorage.removeItem('isLogin')
      store.commit('changeUserData', {})
      store.commit('changeUserCarInfo', [])
    })
  }
  next()
})
export default router
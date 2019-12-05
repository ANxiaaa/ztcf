import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router'
import topTitle from './components/topTitle.vue'
import store from './store'
import api from './http'
import global from '@/utils/global'
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';
// vant
import { Toast } from 'vant';
Vue.use(Vant)
Vue.use(api)
Vue.config.productionTip = false
Vue.component('topTitle', topTitle)
Vue.prototype.Toast = Toast
Vue.prototype.global = global

Vue.use(Croppa)
localStorage.getuser = '1'

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

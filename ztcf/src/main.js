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

// 调试器
import VConsole from 'vconsole'
Vue.prototype.$vconsole = VConsole;

// 弹出框
import { Dialog } from 'vant';
Vue.use(Dialog)
Vue.prototype.Dialog = Dialog

function $login(cb){
    if(localStorage.isLogin){
        cb && cb()
    }else{
        Dialog.confirm({
            title: '请登录',
            message: '您还未登录，确定要登录吗？'
        }).then(() => {
            router.push('/register')
        })
    }
}
Vue.prototype.$login = $login



/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    mounted(){
        localStorage.noback = ''
        var _this = this
        document.addEventListener('plusready', function() {
            console.log(plus)
            var webview = plus.webview.currentWebview();
            var first = true;
            plus.key.addEventListener('backbutton', function() {
                if(localStorage.noback){
                    var nowPage = _this.$route.matched[0].instances.default
                    console.log('nowPage', nowPage)
                    nowPage.noBack()
                    return
                }
                let flag = location.hash !== '#/index' && location.hash !== '#/sale' && location.hash !== '#/information' && location.hash !== '#/insurance' && location.hash !== '#/my'
                console.log('flag', flag)
                console.log('location', location)
                console.log(location.pathname)
                if(flag) {
                    webview.back();
                } else {
                    //首页返回键处理
                    //处理逻辑：1秒内，连续两次按返回键，则退出应用；
                    //首次按键，提示‘再按一次退出应用’
                    if (first) {
                        first = false;
                        Toast('再按一次退出应用')
                        setTimeout(function() {
                            first = true;
                        }, 1000);
                    } else {
                        plus.runtime.quit();
                    }
                }
            });
        });
    }
})

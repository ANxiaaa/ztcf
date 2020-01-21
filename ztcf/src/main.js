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

// 高德地图
import aMap from 'vue-amap'
Vue.use(aMap)

aMap.initAMapApiLoader({
    key:'36e3eb610e5955bf6cc2d57209b06571',
    plugin: [
        'AMap.Geolocation', // 定位，提供了获取用户当前准确位置、所在城市的方法
        'AMap.ElasticMarker', // 灵活点标记，可以随着地图级别改变样式和大小的 Marker
        'AMap.Scale', // 比例尺，显示当前地图中心的比例尺
        'AMap.LineSearch', // 公交路线服务，提供公交路线相关信息查询服务
        'AMap.StationSearch', // 公交站点查询服务，提供途经公交线路、站点位置等信息
        'AMap.Driving', // 驾车路线规划服务，提供按照起、终点进行驾车路线的功能
        'AMap.Transfer', // 公交路线规划服务，提供按照起、终点进行公交路线的功能
        'AMap.CircleEditor', // 圆编辑插件
        'AMap.ToolBar', // 工具条，控制地图的缩放、平移等
    ],
    v: '1.4.4'
})
document.addEventListener('plusready', function() {
    console.log(plus)
    var webview = plus.webview.currentWebview();
    var first = true;
    plus.key.addEventListener('backbutton', function() {
        let flag = location.pathname !== '/index' && location.pathname !== '/sale' && location.pathname !== '/information' && location.pathname !== '/insurance' && location.pathname !== '/my'
        console.log(flag)
        if(flag) {
            console.log(location.pathname)
            console.log(2)
            webview.back();
        } else {
            console.log(location.pathname)
            console.log(1)
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

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

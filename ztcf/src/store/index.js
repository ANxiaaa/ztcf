import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import app from './modules/app' // 用户信息 , app配置 , 车型大全
import indexApis from './modules/indexApis' // 首页api查询
import order from './modules/orderStore' // 订单相关
import news from './modules/news' // 资讯相关
import insurance from './modules/insurance' // 保险相关

export default new Vuex.Store({
    modules: {
        app,
        indexApis,
        order,
        news,
        insurance
    }
})
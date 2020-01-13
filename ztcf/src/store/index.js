import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import app from './modules/app' // 用户信息 , app配置 , 车型大全
import indexApis from './modules/indexApis' // 首页api查询

export default new Vuex.Store({
    modules: {
        app,
        indexApis
    }
})
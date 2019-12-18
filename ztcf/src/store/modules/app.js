export default {
    state: {
        appTitle: '郑泰科技', // app 标题
        back: false, // 标题是否显示返回
        isLogin: false, // 是否已经登录
        userData: {}, // 用户信息
        allCar: [], // 车型大全
        allIndexList: [], // 车型大全的右边索引
        allCarTwo: [], // 车型大全二级
        allCarThree: [], // 车型大全三级
    },
    getters: {
        appTitle(state){
            return state.appTitle
        },
        back(state){
            return state.back
        },
        isLogin(state){
            return state.isLogin
        },
        userData(state){
            return state.userData
        },
        allCar(state){
            return state.allCar
        },
        allIndexList(state){
            return state.allIndexList
        },
        allCarTwo(state){
            return state.allCarTwo
        },
        allCarThree(state){
            return state.allCarThree
        },
    },
    mutations: {
        changeTitle(state, data){
            state.appTitle = data
        },
        changeLogin(state, data){
            state.isLogin = data
        },
        changeUserData(state, data){
            state.userData = Object.assign({}, data)
        },
        changeAllCar(state, data){
            state.allCar = data
        },
        changeAllIndexList(state, data){
            state.allIndexList = data
        },
        changeAllCarTwo(state, data){
            state.allCarTwo = data
        },
        changeAllCarThree(state, data){
            state.allCarThree = data
        },
    },
    actions: {

    }
}
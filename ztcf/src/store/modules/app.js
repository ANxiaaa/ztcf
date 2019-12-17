export default {
    state: {
        appTitle: '郑泰科技',
        back: false,
        isLogin: false,
        userData: {},
        allCar: [],
        allIndexList: []
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
    },
    actions: {

    }
}
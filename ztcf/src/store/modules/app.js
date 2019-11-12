export default {
    state: {
        appTitle: '郑泰科技',
        back: false,
        isLogin: false,
        userData: JSON.parse(localStorage.userData)
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
            console.log(111)
            return state.userData
        },
    },
    mutations: {
        changeTitle(state, data){
            state.appTitle = data
        },
        changeLogin(state, data){
            console.log(111, data)
            state.isLogin = data
        },
    },
    actions: {

    }
}
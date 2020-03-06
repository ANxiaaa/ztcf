export default {
    state: {
        appTitle: '郑泰科技', // app 标题
        back: false, // 标题是否显示返回
        isLogin: false, // 是否已经登录
        userData: {}, // 用户信息
        userCarInfo: [], // 用户车辆信息
        allCar: [], // 车型大全
        allIndexList: [], // 车型大全的右边索引
        allCarTwo: [], // 车型大全二级
        allCarThree: [], // 车型大全三级
        keep: ['insurance', 'information', 'indexAddCar'],
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
        userCarInfo(state){
            return state.userCarInfo
        },
        keep(state){
            return state.keep
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
        changeUserCarInfo(state, data){
            state.userCarInfo = data
        },
        addKeep(state, data){
            state.keep.push(data)
        },
        removeKeep(state, data){
            console.log(state.keep)
            let keep = state.keep
            keep.forEach((i, index) => {
                console.log(i)
                console.log(data)
                if(i === data){
                    keep.splice(index, 1)
                    console.log(keep)
                    state.keep = keep
                }
            })
        },
    },
    actions: {

    }
}
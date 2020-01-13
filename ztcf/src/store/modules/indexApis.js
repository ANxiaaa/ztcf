export default {
    state: {
        wzcxData: {}, // 违章查询
    },
    getters: {
        wzcxData(state){
            return state.wzcxData
        },
    },
    mutations: {
        changeWzcxData(state, data){
            state.wzcxData = Object.assign({}, data)
        },
    },
    actions: {

    }
}
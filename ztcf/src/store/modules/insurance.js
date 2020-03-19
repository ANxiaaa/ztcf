export default {
    state: {
        insuranceData: {}, // 保险报价对象
        insuranceSubData: {}, // 请求报价对象
    },
    getters: {
        insuranceData(state){
            return state.insuranceData
        },
        insuranceSubData(state){
            return state.insuranceSubData
        },
    },
    mutations: {
        changeInsuranceData(state, data){
            state.insuranceData = Object.assign({}, data)
        },
        changeInsuranceSubData(state, data){
            state.insuranceSubData = Object.assign({}, data)
        },
    },
    actions: {

    }
}
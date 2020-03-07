export default {
    state: {
        // 特价车新建订单
        saleOrder: {},
        // 加油卡新建订单
        jiayouOrder: {},
    },
    getters: {
        // 特价车
        saleOrder(state){
            return state.saleOrder
        },
        // 加油卡
        jiayouOrder(state){
            return state.jiayouOrder
        },
    },
    mutations: {
        changeOrderAddress(state, data){
            let {id, pathFrom} = data
            state[pathFrom].logistics.receiptId = id
        },
        changeOrderBeizhu(state, data){
            let {remark, pathFrom} = data
            state[pathFrom].remark = remark
        },
        // 特价车
        changeSaleOrder(state, data){
            state.saleOrder = Object.assign({}, data)
        },
        // 加油卡
        changeJiayouOrder(state, data){
            state.jiayouOrder = Object.assign({}, data)
        },
    },
    actions: {

    }
}
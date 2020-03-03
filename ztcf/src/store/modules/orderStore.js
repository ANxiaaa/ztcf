export default {
    state: {
        // 特价车新建订单
        saleOrder: {},
    },
    getters: {
        saleOrder(state){
            return state.saleOrder
        },
    },
    mutations: {
        changeSaleOrder(state, data){
            state.saleOrder = Object.assign({}, data)
        },
        changeOrderAddress(state, data){
            let {id, pathFrom} = data
            state[pathFrom].logistics.receiptId = id
        },
        changeOrderBeizhu(state, data){
            let {remark, pathFrom} = data
            state[pathFrom].remark = remark
        }
    },
    actions: {

    }
}
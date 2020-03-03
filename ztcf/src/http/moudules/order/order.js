import axios from '../../axios'

/*
 * 订单模块模块
 */

// 下单接口
export const assemblyOrder = params => {
    return axios({
        url: 'order/assemblyOrder',
        method: 'get',
        params
    })
}

// 提交订单
export const submitOrder = data => {
    return axios({
        url: 'order/submitOrder',
        method: 'post',
        data
    })
}

// 根据id查询订单
export const order = orderId => {
    return axios({
        url: 'order/' + orderId,
        method: 'get'
    })
}

// 订单状态类型
export const getOrderStatusEnum = () => {
    return axios({
        url: 'order/getOrderStatusEnum',
        method: 'get'
    })
}

// 按订单状态查询订单
export const findOrderByStatus = statusEnum => {
    return axios({
        url: 'order/findOrderByStatus',
        method: 'get',
        params: { statusEnum }
    })
}

// 取消订单
export const deleteOrder = id => {
    return axios({
        url: 'order/deleteOrder/' + id,
        method: 'get'
    })
}
export default [
    {
        path: '/order', // 订单
        name: 'Order',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/order/order'], resolve)
    },
    {
        path: '/orderInfo', // 订单详情
        name: 'OrderInfo',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/order/orderInfo'], resolve)
    },
    {
        path: '/orderPay', // 订单支付
        name: 'OrderPay',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/order/orderPay'], resolve)
    },
]
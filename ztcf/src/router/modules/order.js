export default [
    {
        path: '/order', // 订单
        name: 'Order',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/order'], resolve)
    }
]
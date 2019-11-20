export default [
    {
        path: '/saleSearch', // 特价车搜索
        name: 'SaleSearch',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/sale/saleSearch'], resolve)
    },
    {
        path: '/carMsg', // 特价车搜索
        name: 'CarMsg',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/sale/carMsg'], resolve)
    },
]
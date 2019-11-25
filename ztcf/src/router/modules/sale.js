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
        path: '/carMsg', // 特价车车辆详情
        name: 'CarMsg',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/sale/carMsg'], resolve)
    },
    {
        path: '/carParam', // 特价车车辆详情
        name: 'CarParam',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/sale/carParam'], resolve)
    },
    {
        path: '/carParam', // 特价车车辆详细参数
        name: 'CarParam',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/sale/carParam'], resolve)
    },
    {
        path: '/saleBrand', // 特价车品牌选择车系
        name: 'SaleBrand',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/sale/saleBrand'], resolve)
    },
    {
        path: '/saleArctic', // 特价车品牌选择车型
        name: 'sSaleArctic',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/sale/saleArctic'], resolve)
    },
]
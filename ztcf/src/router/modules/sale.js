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
        name: 'SaleArctic',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/sale/saleArctic'], resolve)
    },
    {
        path: '/saleCarList', // 车型下特价车列表
        name: 'SaleCarList',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/sale/saleCarList'], resolve)
    },
    {
        path: '/addSaleOrder', // 特价车线上下单
        name: 'AddSaleOrder',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/sale/addSaleOrder'], resolve)
    },
]
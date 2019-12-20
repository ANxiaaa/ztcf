export default [
    {
        path: '/insureAddCar', // 保险添加车辆的品牌
        name: 'InsureAddCar',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/insurance/insureAddCar'], resolve)
    },
    {
        path: '/insureCarTwo', // 保险添加车辆的车系
        name: 'InsureCarTwo',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/insurance/insureCarTwo'], resolve)
    },
    {
        path: '/insureCarThree', // 保险添加车辆的车型
        name: 'InsureCarThree',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/insurance/insureCarThree'], resolve)
    },
    {
        path: '/insureCarMsg', // 保险添加车辆的车辆信息
        name: 'InsureCarMsg',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/insurance/insureCarMsg'], resolve)
    },
    {
        path: '/vague', // 模糊报价
        name: 'Vague',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/insurance/vague'], resolve)
    },
    {
        path: '/insureType', // 选择保险类型
        name: 'InsureType',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/insurance/insureType'], resolve)
    },
]
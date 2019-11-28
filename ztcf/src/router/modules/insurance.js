export default [
    {
        path: '/insureAddCar', // 保险添加车辆
        name: 'InsureAddCar',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/insurance/insureAddCar'], resolve)
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
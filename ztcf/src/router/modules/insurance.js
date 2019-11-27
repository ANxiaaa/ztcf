export default [
    {
        path: '/insureAddCar', // 保险添加车辆
        name: 'InsureAddCar',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/insurance/insureAddCar'], resolve)
    }
]
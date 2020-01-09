export default [
    {
        path: '/indexAddCar', // 首页添加车辆
        name: 'IndexAddCar',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/index/indexAddCar'], resolve)
    }
]
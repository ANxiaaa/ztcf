import indexAPI from './indexAPI' // api查询
export default [
    ...indexAPI,
    {
        path: '/indexAddCar', // 首页添加车辆
        name: 'IndexAddCar',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/index/indexAddCar'], resolve)
    },
    {
        path: '/indexOneBrand', // 首页添加一级品牌
        name: 'IndexOneBrand',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/index/indexOneBrand'], resolve)
    },
    {
        path: '/indexTwoBrand', // 首页添加二级品牌
        name: 'IndexTwoBrand',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/index/indexTwoBrand'], resolve)
    },
    {
        path: '/indexThreeBrand', // 首页添加三级品牌
        name: 'IndexThreeBrand',
        meta: {
            hideNav: true,
            back: true
        },
        beforeEnter: (to, from, next) => {
            if(from.name !== 'IndexTwoBrand'){
                next({ path: '/index' , replace: true})
            }
            next()
        },
        component: resolve => require(['@/views/index/indexThreeBrand'], resolve)
    },
]
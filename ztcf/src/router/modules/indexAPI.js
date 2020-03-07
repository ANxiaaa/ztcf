export default [
    {
        path: '/indexwzcx', // 首页违章查询
        name: 'Indexwzcx',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/index/wzcx/indexwzcx'], resolve)
    },
    {
        path: '/wzcxres', // 首页违章查询结果
        name: 'Wzcxres',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/index/wzcx/wzcxres'], resolve)
    },
    {
        path: '/indexxxcx', // 首页限行查询
        name: 'Indexxxcx',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/index/xxcx/indexxxcx'], resolve)
    },
    {
        path: '/indexkdcx', // 首页快递查询
        name: 'Indexkdcx',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/index/kdcx/indexkdcx'], resolve)
    },
    {
        path: '/indexjyzcx', // 首页加油站查询
        name: 'Indexjyzcx',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/index/jyzcx/indexjyzcx'], resolve)
    },
    {
        path: '/indextcccx', // 首页停车场查询
        name: 'Indextcccx',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/index/tcccx/indextcccx'], resolve)
    },
    {
        path: '/indexykcx', // 首页油卡充值
        name: 'Indexykcx',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/index/ykcx/indexykcx'], resolve)
    },
    {
        path: '/addJykOrder', // 首页油卡添加订单
        name: 'AddJykOrder',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/index/ykcx/addJykOrder'], resolve)
    },
    // {
    //     path: '/indextcccx', // 首页公交查询
    //     name: 'Indextcccx',
    //     meta: {
    //         hideNav: true,
    //         back: true
    //     },
    //     component: resolve => require(['@/views/index/tcccx/indextcccx'], resolve)
    // },
]
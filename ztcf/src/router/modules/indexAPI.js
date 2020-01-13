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

]
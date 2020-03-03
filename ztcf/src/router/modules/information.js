export default [
    {
        path: '/newsContent', // 新闻内容
        name: 'NewsContent',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/information/newsContent'], resolve)
    },
]
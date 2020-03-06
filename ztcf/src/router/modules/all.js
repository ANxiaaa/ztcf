export default [
    {
        path: '/index', // 首页
        name: 'Index',
        component: resolve => require(['@/views/index'], resolve)
    },
    {
        path: '/sale', // 特价车
        name: 'Sale',
        component: resolve => require(['@/views/sale'], resolve)
    },
    {
        path: '/information', // 咨讯
        name: 'Information',
        component: resolve => require(['@/views/information'], resolve)
    },
    {
        path: '/insurance', // 保险
        name: 'Insurance',
        component: resolve => require(['@/views/insurance'], resolve)
    },
    {
        path: '/my', // 个人中心
        name: 'My',
        component: resolve => require(['@/views/my'], resolve)
    },
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/login', // 登录
        name: 'Login',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/login'], resolve)
    },
    {
        path: '/register', // 注册
        name: 'Register',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/register'], resolve)
    },
    {
        path: '/findpass', // 找回密码
        name: 'Findpass',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/findpass'], resolve)
    },
    {
        path: '/newpass', // 新密码
        name: 'Newpass',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/newpass'], resolve)
    },
    {
        path: '/expect', // 敬请期待
        name: 'Expect',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/expect'], resolve)
    },
    {
        path: '/test', // 测试界面
        name: 'Test',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/test'], resolve)
    },
]
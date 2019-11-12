export default [
    {
        path: '/setting', // 设置
        name: 'Setting',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/setting'], resolve)
    },
    {
        path: '/setpass', // 设置密码, 手机号
        name: 'Setpass',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/setpass'], resolve)
    },
    {
        path: '/personal', // 个人资料
        name: 'Personal',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/personal'], resolve)
    },
    {
        path: '/nikeName', // 修改昵称
        name: 'NikeName',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/nikeName'], resolve)
    },
    {
        path: '/authentication', // 实名认证
        name: 'Authentication',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/authentication'], resolve)
    },
    {
        path: '/addressList', // 收货地址列表
        name: 'AddressList',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/addressList'], resolve)
    },
    {
        path: '/setAddress', // 第一次设置地址
        name: 'SetAddress',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/setAddress'], resolve)
    },
]
import order from './order' // 订单
import api from '@/http/api'
export default [
    ...order,
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
        path: '/nickName', // 修改昵称
        name: 'nickName',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/nickName'], resolve)
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
    {
        path: '/toadvisory', // 在线咨询
        name: 'Toadvisory',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/toadvisory'], resolve)
    },
    {
        path: '/upHead', // 更改头像
        name: 'UpHead',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/upHead'], resolve)
    },
    {
        path: '/carStore', // 车库
        name: 'CarStore',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/carStore'], resolve)
    },
    {
        path: '/collect', // 收藏
        name: 'Collect',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/collect'], resolve)
    },
    {
        path: '/invite', // 邀请
        name: 'Invite',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/invite'], resolve)
    },
    {
        path: '/notice', // 系统消息
        name: 'Notice',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/notice'], resolve)
    },
    {
        path: '/noticeMsg', // 系统消息信息
        name: 'NoticeMsg',
        meta: {
            hideNav: true,
            back: true
        },
        component: resolve => require(['@/views/my/noticeMsg'], resolve)
    },
]
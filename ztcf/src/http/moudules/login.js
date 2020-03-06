import axios from '../axios'

/*
 * 系统登录模块
 */

// 发送验证码
export const sendCode = phone => {
    return axios({
        url: 'login/sendCode',
        method: 'get',
        params: {
            phone
        }
    })
}

// 注册或登录
export const loginOrRegister = params => {
    return axios({
        url: 'login/loginOrRegister',
        method: 'post',
        params
    })
}

// 退出
export const logout = () => {
    return axios({
        url: 'login/logout',
        method: 'get'
    })
}

// 获取用户信息
export const getMemberInfo = () => {
    return axios({
        url: 'member/getMemberInfo',
        method: 'get'
    })
}
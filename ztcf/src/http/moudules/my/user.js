import axios from '../../axios'

/*
 * 用户信息操作模块
 */

// 检测手机号是否重复
export const checkPhoneExist = newPhone => {
    return axios({
        url: 'member/checkPhoneExist',
        method: 'get',
        params: { newPhone }
    })
}

// 修改昵称
export const updateNickName = newNickName => {
    return axios({
        url: 'member/updateNickName',
        method: 'put',
        params: { newNickName }
    })
}

// 修改手机号
export const updatePhone = params => {
    return axios({
        url: '/member/updatePhone',
        method: 'put',
        params
    })
}

// 修改头像
export const updateHeadPortrait = data => {
    return axios({
        url: '/member/updateHeadPortrait',
        method: 'put',
        data
    })
}

// 保存车辆
export const saveMemberCarInfo = data => {
    return axios({
        url: '/member/saveMemberCarInfo',
        method: 'post',
        data
    })
}

// 查询车辆列表
export const findMemberCarInfoByMemberId = data => {
    return axios({
        url: '/member/findMemberCarInfoByMemberId',
        method: 'get'
    })
}
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

// 查询收货列表
export const getReceipts = () => {
    return axios({
        url: '/member/getReceipts',
        method: 'get'
    })
}

// 保存收货
export const saveOrUpdateReceipt = data => {
    return axios({
        url: '/member/saveOrUpdateReceipt',
        method: 'post',
        data
    })
}

// 根据id查询收货
export const getReceiptById = id => {
    return axios({
        url: '/member/getReceiptById',
        method: 'get',
        params: { id }
    })
}

// 删除收货
export const delReceipt = id => {
    return axios({
        url: '/member/delReceipt',
        method: 'delete',
        params: { id }
    })
}

// 默认收货
export const getDefReceipt = () => {
    return axios({
        url: '/member/getDefReceipt',
        method: 'get'
    })
}
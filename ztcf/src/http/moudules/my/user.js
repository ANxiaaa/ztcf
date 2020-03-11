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

// 默认车辆
export const defaultMemberCarInfoByMemberId = id => {
    return axios({
        url: '/member/defaultMemberCarInfoByMemberId',
        method: 'post',
        params: { id }
    })
}

// 删除车辆
export const deleteMemberCarInfoByMemberId = id => {
    return axios({
        url: '/member/deleteMemberCarInfoByMemberId',
        method: 'post',
        params: { id }
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

// 系统通知
export const noticefindPage = data => {
    return axios({
        url: '/notice/findPage',
        method: 'post',
        data
    })
}

// 浏览记录
export const memberFindPage = data => {
    return axios({
        url: '/member/findPage',
        method: 'post',
        data
    })
}

// 获取消息
export const getSaveConsultation = id => {
    return axios({
        url: '/notice/getSaveConsultation',
        method: 'get',
        params: { id }
    })
}

// 咨询
export const saveConsultation = data => {
    return axios({
        url: '/notice/saveConsultation',
        method: 'post',
        data
    })
}

// 修改短信推送
export const updateSmsSend = () => {
    return axios({
        url: '/member/updateSmsSend',
        method: 'put'
    })
}

// 修改邮箱推送
export const updateMailSend = () => {
    return axios({
        url: '/member/updateMailSend',
        method: 'put'
    })
}
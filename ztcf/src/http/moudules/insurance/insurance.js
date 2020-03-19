import axios from '../../axios'

/*
 * 保险模块
 */

// 请求保险报价
export const saveMemberQueryInsurance = data => {
    return axios({
        url: '/insurance/saveMemberQueryInsurance',
        method: 'post',
        data
    })
}

// 所有保险公司
export const getCompanys = () => {
    return axios({
        url: '/insurance/getCompanys',
        method: 'get'
    })
}

// 根据保险公司id获取方案
export const findCategoryByCompanyId = companyId => {
    return axios({
        url: '/insurance/findCategoryByCompanyId',
        method: 'get',
        params: { companyId }
    })
}
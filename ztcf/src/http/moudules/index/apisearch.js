import axios from '../../axios'

/*
 * api查询模块
 */

// 违章查询
export const queryIllegal = data => {
    return axios({
        url: 'api/queryIllegal',
        method: 'post',
        data
    })
}

// 查询支持查询限行的城市
export const getCityAll = () => {
    return axios({
        url: 'api/getCityAll',
        method: 'get'
    })
}

// 查询限行
export const queryLimitRow = data => {
    return axios({
        url: 'api/queryLimitRow',
        method: 'post',
        data
    })
}

// 快递查询
export const queryExpress = data => {
    return axios({
        url: 'api/queryExpress',
        method: 'post',
        data
    })
}

// 加油站查询
export const queryNearby = data => {
    return axios({
        url: 'api/queryNearby',
        method: 'post',
        data
    })
}

// 停车场查询
export const parkingQueryNearby = data => {
    return axios({
        url: 'api/parkingQueryNearby',
        method: 'post',
        data
    })
}
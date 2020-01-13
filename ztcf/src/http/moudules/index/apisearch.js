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
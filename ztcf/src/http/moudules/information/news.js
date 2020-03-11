import axios from '../../axios'

/*
 * 新闻操作模块
 */

// 汽车新闻
export const findPage = data => {
    return axios({
        url: '/news/findPage',
        method: 'post',
        data
    })
}

// 根据id查询
export const findById = id => {
    return axios({
        url: '/news/findById?id=' + id,
        method: 'get'
    })
}

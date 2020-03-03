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

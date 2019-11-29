import axios from '../../axios'

/*
 * 车辆大全模块
 */

// 获取全部一级品牌
export const allOneCar = () => {
    return axios({
        url: '/car/getBrands',
        method: 'get'
    })
}

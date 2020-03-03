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

// 获取全部二级车系
export const allTwoCar = params => {
    return axios({
        url: '/car/findCarTwoBrandByParentId',
        method: 'get',
        params
    })
}

// 获取全部三级车型
export const allThreeCar = params => {
    return axios({
        url: '/car/findCarByParentId',
        method: 'get',
        params
    })
}

// 车辆详细参数
export const findCarParamByCarId = carId => {
    return axios({
        url: '/car/findCarParamByCarId',
        method: 'get',
        params: { carId }
    })
}
import axios from '../../axios'

/*
 * 特价车模块
 */

// 查询所有特价车的品牌及数量
export const findAllBrand = () => {
    return axios({
        url: 'car/findBrandsByCount',
        method: 'get'
    })
}

// 根据id查询二级品牌
export const findTwoBrand = parentId => {
    return axios({
        url: 'car/findTwoBrandsByParentId',
        method: 'get',
        params: { parentId }
    })
}

// 根据id查询三级品牌
export const findThreeBrand = parentId => {
    return axios({
        url: 'car/findVehicleTypesByParentId',
        method: 'get',
        params: { parentId }
    })
}

// 根据id查询四级品牌
export const findFourBrand = parentId => {
    return axios({
        url: 'car/findCarInfosByParentId',
        method: 'get',
        params: { parentId }
    })
}

// 查询首页推广特价车
export const findIndexSpecialPage = () => {
    return axios({
        url: 'car/findIndexSpecialPage',
        method: 'post',
        data: {
            "pageNum": 1,
            "pageSize": 15
        }
    })
}

// 特价车id分页查询
export const findPageByCarInfo = (carId, data) => {
    return axios({
        url: 'car/findPageByCarInfo/' + carId,
        method: 'post',
        data
    })
}

// 根据id查询
export const findById = id => {
    return axios({
        url: 'car/findById',
        method: 'get',
        params: { id }
    })
}

// 特价车分页查询
export const findPage = data => {
    return axios({
        url: 'car/findPage',
        method: 'post',
        data
    })
}
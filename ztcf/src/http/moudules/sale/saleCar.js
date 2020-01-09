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
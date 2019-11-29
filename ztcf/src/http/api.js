/*
 * 接口统一集成模块
 */
import * as login from './moudules/login'
import * as user from './moudules/my/user'
import * as carList from './moudules/carList/allCar'

// 默认全部导出
export default {
    login,
    user,
    carList
}
/*
 * 接口统一集成模块
 */
import * as login from './moudules/login' // 系统登录模块
import * as user from './moudules/my/user' // 用户信息操作模块
import * as carList from './moudules/carList/allCar' // 车型大全查询模块
import * as sale from './moudules/sale/saleCar' // 特价车模块
import * as apisearch from './moudules/index/apisearch' // api查询模块

// 默认全部导出
export default {
    login,
    user,
    carList,
    sale,
    apisearch
}
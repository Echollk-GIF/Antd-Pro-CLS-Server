const Router = require('koa-router')
const { getProvinceList, getCityList } = require('../controller/global.controller')
const router = new Router()

//获取省份数据信息
router.get('/geographic/province', getProvinceList)
//根据省份获取城市列表
router.get('/geographic/city/:province', getCityList)

module.exports = router


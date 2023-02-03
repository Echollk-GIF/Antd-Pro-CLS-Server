const Router = require('koa-router')
const { getProvinceList } = require('../controller/global.controller')
const router = new Router()

//获取省份数据信息
router.get('/geographic/province', getProvinceList)

module.exports = router


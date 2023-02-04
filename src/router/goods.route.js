const Router = require('koa-router')

const {
  tokenAuth
} = require('../middleware/auth.middleware')
const {
  getGoodsList
} = require('../controller/goods.controller')

const router = new Router({ prefix: '/goods' })

//获取物品列表
router.get('/goodsList', tokenAuth, getGoodsList)
module.exports = router

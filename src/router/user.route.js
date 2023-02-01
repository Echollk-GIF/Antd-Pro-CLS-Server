const Router = require('koa-router')

const { registerAccount, loginAccount } = require('../controller/user.controller')

const router = new Router({ prefix: '/user' })

// 账号密码注册接口
router.post('/register/account', registerAccount)

// 账号密码登录接口
router.post('/login/account', loginAccount)

module.exports = router

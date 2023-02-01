const Router = require('koa-router')
const {
  userValidator,
  verifyUserExist,
} = require('../middleware/user.middleware')
const { registerAccount, loginAccount } = require('../controller/user.controller')

const router = new Router({ prefix: '/user' })

// 账号密码注册接口
router.post('/register/account', userValidator, verifyUserExist, registerAccount)

// 账号密码登录接口
router.post('/login/account', loginAccount)

module.exports = router

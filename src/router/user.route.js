const Router = require('koa-router')
const {
  userValidator,
  verifyUserExist,
  crpytPassword,
  verifyLoginAccount
} = require('../middleware/user.middleware')
const {
  registerAccount,
  loginAccount
} = require('../controller/user.controller')

const router = new Router({ prefix: '/user' })

// 账号密码注册接口
router.post('/register/account', userValidator, verifyUserExist, crpytPassword, registerAccount)

// 账号密码登录接口
router.post('/login/account', userValidator, verifyLoginAccount, loginAccount)

module.exports = router

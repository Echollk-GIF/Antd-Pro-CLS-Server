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
const {
  tokenAuth
} = require('../middleware/auth.middleware')
const router = new Router({ prefix: '/user' })

// 账号密码注册接口
router.post('/register/account', userValidator, verifyUserExist, crpytPassword, registerAccount)

// 账号密码登录接口
router.post('/login/account', userValidator, verifyLoginAccount, loginAccount)

// 修改密码接口
router.patch('/', tokenAuth, (ctx, next) => {
  console.log(ctx.state.user)
  ctx.body = '修改密码成功'
})

module.exports = router

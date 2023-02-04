const Router = require('koa-router')
const {
  userValidator,
  verifyUserExist,
  crpytPassword,
  verifyLoginAccount
} = require('../middleware/user.middleware')
const {
  registerAccount,
  loginAccount,
  changePassword,
  currentUserInfoByToken,
  currentUserInfoById,
  outLogin
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
router.patch('/', tokenAuth, crpytPassword, changePassword)

//退出登录
router.post('/outLogin', tokenAuth, outLogin)

//根据token获取当前用户信息
router.get('/currentUserInfoByToken', tokenAuth, currentUserInfoByToken)

//根据id获取当前用户信息
router.post('/currentUserInfoById', tokenAuth, currentUserInfoById)
module.exports = router

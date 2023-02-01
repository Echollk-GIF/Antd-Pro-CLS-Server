const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  invalidPassword,
  userLoginError
} = require('../constant/err.type')

//验证账号密码是否都存在
const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body
  // 合法性
  if (!username || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}
//注册时验证是否已经存在该用户
const verifyUserExist = async (ctx, next) => {
  const { username } = ctx.request.body

  try {
    const res = await getUserInfo({ username })
    if (res) {
      console.error('用户名已经存在', { username })
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
  } catch (err) {
    console.error('获取用户信息错误', err)
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }
  await next()
}
//密码加盐
const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const salt = bcrypt.genSaltSync(10)
  // hash保存的是 密文
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}
//账号密码登录时验证用户是否存在及账号密码是否正确
const verifyLoginAccount = async (ctx, next) => {
  // 1. 判断用户是否存在(不存在:报错)
  const { username, password } = ctx.request.body

  try {
    const res = await getUserInfo({ username })

    if (!res) {
      console.error('用户名不存在', { username })
      ctx.app.emit('error', userDoesNotExist, ctx)
      return
    }

    // 2. 密码是否匹配(不匹配: 报错)
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx)
      return
    }
  } catch (err) {
    console.error(err)
    return ctx.app.emit('error', userLoginError, ctx)
  }

  await next()
}
module.exports = {
  userValidator,
  verifyUserExist,
  crpytPassword,
  verifyLoginAccount
}

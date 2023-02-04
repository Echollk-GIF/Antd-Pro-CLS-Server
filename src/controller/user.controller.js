const jwt = require('jsonwebtoken')

const {
  registerUserAccount,
  getUserInfo,
  updateById
} = require('../service/user.service')

const { userRegisterError } = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')

class UserController {
  //账号密码注册用户
  async registerAccount (ctx, next) {
    //1.获取数据
    const { username, password } = ctx.request.body
    try {
      //2.操作数据库
      const res = await registerUserAccount(username, password)
      //3.返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        data: {
          id: res.id,
          username: res.username
        }
      }
    } catch (err) {
      console.log(err)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }
  //账号密码登录账号
  async loginAccount (ctx, next) {
    const { username } = ctx.request.body
    // 1. 获取用户信息(在token的payload中, 记录id, username, access)
    try {
      const { id, access } = await getUserInfo({ username })
      const res = { id, username, access }
      ctx.body = {
        status: 'ok',
        currentAuthority: access,
        type: 'account',
        token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
      }
    } catch (err) {
      console.error('用户登录失败', err)
    }
  }
  //修改密码
  async changePassword (ctx, next) {
    // 1. 获取数据
    const id = ctx.state.user.id
    const password = ctx.request.body.password

    // 2. 操作数据库
    if (await updateById({ id, password })) {
      ctx.body = {
        code: 0,
        message: '修改密码成功',
        data: '',
      }
    } else {
      ctx.body = {
        code: '10007',
        message: '修改密码失败',
        data: '',
      }
    }
  }
  //退出登录
  async outLogin (ctx, next) {
    const id = ctx.request.body.id
    ctx.body = {
      success: true,
      message: `id为${id}的用户退出登录成功`,
      data: {},
    }
  }
  //根据token获取用户信息
  async currentUserInfoByToken (ctx, next) {
    const id = ctx.state.user.id
    try {
      const { password, ...res } = await getUserInfo({ id })
      ctx.body = {
        success: true,
        data: { ...res }
      }
    } catch (error) {
      console.error('根据token获取用户信息失败', err)
    }
  }
  //根据id获取用户信息
  async currentUserInfoById (ctx, next) {
    const id = ctx.request.body.id
    try {
      const { password, ...res } = await getUserInfo({ id })
      ctx.body = {
        success: true,
        data: { ...res }
      }
    } catch (error) {
      console.error('根据id获取用户信息失败', err)
    }
  }
}

module.exports = new UserController()

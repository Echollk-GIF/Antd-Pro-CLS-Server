const { registerUserAccount, getUserInfo } = require('../service/user.service')

class UserController {
  async registerAccount (ctx, next) {
    // 1. 获取数据
    const { username, password } = ctx.request.body

    // 合法性
    if (!username || !password) {
      console.error('用户名或密码为空', ctx.request.body)
      ctx.status = 400
      ctx.body = {
        code: '10001',
        message: '用户名或密码为空',
        result: '',
      }
      return
    }
    // 合理性
    if (getUserInfo({ username })) {
      ctx.status = 409
      ctx.body = {
        code: '10002',
        message: '用户已经存在',
        result: '',
      }
      return
    }

    // 2. 操作数据库
    const res = await registerUserAccount(username, password)
    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '用户注册成功',
      result: {
        id: res.id,
        username: res.username,
      },
    }
  }

  async loginAccount (ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()

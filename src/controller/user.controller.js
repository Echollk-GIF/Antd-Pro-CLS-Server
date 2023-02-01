const { registerUserAccount } = require('../service/user.service')

class UserController {
  async registerAccount (ctx, next) {
    // 1. 获取数据
    const { username, password } = ctx.request.body
    // 2. 操作数据库
    const res = await registerUserAccount(username, password)
    // 3. 返回结果
    ctx.body = ctx.request.body
  }

  async loginAccount (ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()

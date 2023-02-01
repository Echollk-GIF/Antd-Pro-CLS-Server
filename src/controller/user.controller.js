class UserController {
  async registerAccount (ctx, next) {
    ctx.body = '用户注册成功'
  }

  async loginAccount (ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()

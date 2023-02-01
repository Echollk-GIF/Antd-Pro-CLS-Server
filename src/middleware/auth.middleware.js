const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')

const {
  tokenExpiredError,
  invalidToken
} = require('../constant/err.type')

//验证token是否正确并得到用户信息
const tokenAuth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')

  try {
    // user中包含了payload的信息(id, user_name, is_admin)
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已过期', err)
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的token', err)
        return ctx.app.emit('error', invalidToken, ctx)
    }
  }

  await next()
}

module.exports = {
  tokenAuth
}

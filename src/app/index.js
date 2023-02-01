const Koa = require('koa')
const KoaBody = require('koa-body')
const errHandler = require('./errHandler')
const app = new Koa()

const userRouter = require('../router/user.route')

//KoaBody中间件要在所有路由之前
app.use(KoaBody())
app.use(userRouter.routes())

// 统一的错误处理
app.on('error', errHandler)

module.exports = app

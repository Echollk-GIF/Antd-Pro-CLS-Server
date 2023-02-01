const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'hello world'
})

app.listen(9000, () => {
  console.log('server is running on http://localhost:9000')
})

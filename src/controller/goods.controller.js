const {
  getGoodsList
} = require('../service/goods.service')

class goodsController {
  //获取物品列表
  async getGoodsList (ctx, next) {
    // 1. 解析pageNum和pageSize
    const { current = 1, pageSize = 20 } = ctx.request.query
    // 2. 调用数据处理的相关方法
    const res = await getGoodsList(current, pageSize)
    // 3. 返回结果
    ctx.body = {
      current: res.pageNum * 1,
      pageSize: res.pageSize * 1,
      success: true,
      data: res.list,
      total: res.total
    }
  }
}
module.exports = new goodsController()

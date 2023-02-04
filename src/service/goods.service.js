const Goods = require('../model/goods.model')

class GoodsService {
  //获取商品列表
  async getGoodsList (pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Goods.findAndCountAll({
      offset: offset,
      limit: pageSize * 1,
    })
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    }
  }
}

module.exports = new GoodsService()

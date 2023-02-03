const { provinceAcquisitionFailure, cityAcquisitionFailure } = require('../constant/err.type')
class globalController {
  //获取省份列表
  async getProvinceList (ctx, next) {
    //1.获取数据
    try {
      const res = require('../mock/geographic/province.json')
      //3.返回结果
      ctx.body = {
        code: 0,
        message: '省份数据获取成功',
        data: [...res]
      }
    } catch (err) {
      console.log(err)
      ctx.app.emit('error', provinceAcquisitionFailure, ctx)
    }
  }
  //根据省份获取城市列表
  async getCityList (ctx, next) {
    const provinceId = ctx.params.province
    //1.获取数据
    try {
      const res = require('../mock/geographic/city.json')
      //3.返回结果
      ctx.body = {
        code: 0,
        message: '城市数据获取成功',
        data: res[provinceId]
      }
    } catch (err) {
      console.log(err)
      ctx.app.emit('error', cityAcquisitionFailure, ctx)
    }
  }
}
module.exports = new globalController()

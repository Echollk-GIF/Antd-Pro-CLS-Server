const User = require('../model/user.model')

class UserService {
  //账号密码注册账号
  async registerUserAccount (username, password) {
    const res = await User.create({ username, password })
    return res.dataValues
  }
  //获取用户信息
  async getUserInfo ({ id, username, password, authority }) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    username && Object.assign(whereOpt, { username })
    password && Object.assign(whereOpt, { password })
    authority && Object.assign(whereOpt, { authority })

    const res = await User.findOne({
      attributes: ['id', 'username', 'password', 'authority'],
      where: whereOpt,
    })
    return res ? res.dataValues : null
  }
}

module.exports = new UserService()

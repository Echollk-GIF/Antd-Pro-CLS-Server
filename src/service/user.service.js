const User = require('../model/user.model')

class UserService {
  //账号密码注册账号
  async registerUserAccount (username, password) {
    const res = await User.create({ username, password })
    return res.dataValues
  }
}

module.exports = new UserService()

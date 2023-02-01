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

  //根据id更新用户信息
  async updateById ({ id, username, password, authority }) {
    const whereOpt = { id }
    const newUser = {}

    username && Object.assign(newUser, { username })
    password && Object.assign(newUser, { password })
    authority && Object.assign(newUser, { authority })

    const res = await User.update(newUser, { where: whereOpt })

    return res[0] > 0 ? true : false
  }
}

module.exports = new UserService()

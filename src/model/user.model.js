const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model user -> 表 users)
const User = seq.define('user', {
  // id 会被sequelize自动创建, 管理
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '账户, 唯一',
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码',
  },
  authority: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '0',
    comment: '是否为管理员, 0: 不是管理员(默认); 1: 普通管理员',
  },
})

// 强制同步数据库(创建数据表)
User.sync({ force: true })

module.exports = User

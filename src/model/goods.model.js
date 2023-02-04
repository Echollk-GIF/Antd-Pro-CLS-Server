const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model user -> 表 users)
const Good = seq.define('good', {
  // id 会被sequelize自动创建, 管理
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '默认名称',
    comment: '名称',
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
  },
  callNo: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '调用次数'
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  href: {
    type: DataTypes.STRING,
    defaultValue: "https://ant.design",
  },
  owner: {
    type: DataTypes.STRING,
    defaultValue: '默认owner'
  },
  desc: {
    type: DataTypes.STRING,
    defaultValue: "默认描述",
    comment: '描述',
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 5
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "1"
  }
})

// 强制同步数据库(创建数据表)
// Good.sync({ force: true })

module.exports = Good

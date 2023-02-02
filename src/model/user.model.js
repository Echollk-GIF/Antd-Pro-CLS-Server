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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '默认用户名',
    comment: '用户名',
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
    comment: '头像',
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: "841290355@qq.com",
    comment: '邮箱',
  },
  signature: {
    type: DataTypes.STRING,
    defaultValue: "海纳百川，有容乃大",
    comment: '个性签名',
  },
  title: {
    type: DataTypes.STRING,
    defaultValue: "交互专家",
    comment: '头衔',
  },
  group: {
    type: DataTypes.STRING,
    defaultValue: "某某某事业群－某某平台部－某某技术部",
    comment: '群组',
  },
  tags: {
    type: DataTypes.STRING,
    defaultValue: '[{"key":"0","label":"很有想法的"},{"key":"1","label":"有主见的"},{"key":"2","label":"湾妹"}]',
    get () {
      return this.getDataValue('tags').split(',')
    },
    set (value) {
      return this.setDataValue('tags', value.join(','))
    }
  },
  notifyCount: {
    type: DataTypes.INTEGER,
    defaultValue: 12,
    comment: '通知数量',
  },
  unreadCount: {
    type: DataTypes.INTEGER,
    defaultValue: 11,
    comment: '未读数量',
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: "China",
    comment: '国家',
  },
  access: {
    type: DataTypes.STRING,
    defaultValue: "admin",
    comment: '权限',
  },
  geographic: {
    type: DataTypes.STRING,
    defaultValue: '{"province":{"label":"浙江省","key":"330000"},"city":{"label":"杭州市","key":"330100"}}',
    get () {
      return this.getDataValue('tags').split(',')
    },
    set (value) {
      return this.setDataValue('tags', value.join(','))
    }
  },
  address: {
    type: DataTypes.STRING,
    defaultValue: "西湖区工专路 77 号",
    comment: '地址',
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: "0752-268888888",
    comment: '手机号',
  },
})

// 强制同步数据库(创建数据表)
// User.sync({ force: true })

module.exports = User

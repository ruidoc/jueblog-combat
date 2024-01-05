const mongoose = require('mongoose')
const config = require('../config.json')

const connect = (req, res, next) => {
  mongoose
    .connect(config.mongo_url, {
      user: config.mongo_username,
      pass: config.mongo_password,
    })
    .then(() => {
      next()
    })
    .catch(err => {
      console.log('数据库连接失败：', err)
      res.status(500).send({
        message: '数据库连接失败',
      })
    })
}

module.exports = connect

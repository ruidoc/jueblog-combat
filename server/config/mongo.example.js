const mongoose = require('mongoose')

const connect = (req, res, next) => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/juejin_blogs', {
      user: 'your_username',
      pass: 'your_password',
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

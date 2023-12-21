var express = require('express')
var router = express.Router()
var UsersModel = require('../model/users')
var FollowsModel = require('../model/follows')
var encrypt = require('../utils/crypto')
const { genoJwt } = require('../utils/jwt')

router.all('/', (req, res) => {
  res.send('用户管理API')
})

// 用户注册
router.post('/create', async (req, res, next) => {
  let body = req.body
  try {
    if (!body.password || body.password.length < 6) {
      return res.status(400).send({ message: '密码必传且长度不小于6位' })
    }
    body.password = encrypt(body.password)
    let result = await UsersModel.create(body)
    res.send(result)
  } catch (err) {
    next(err)
  }
})

// 获取用户信息
router.get('/info/:id', async (req, res, next) => {
  let { id } = req.params
  if (id == 'self') {
    if (!req.auth) {
      return res.status(401).send({ message: '请登录' })
    }
    id = req.auth._id
  }
  try {
    let result = await UsersModel.findById(id)
    let follows = await Promise.all([
      FollowsModel.count({ user_id: ObjectId(id) }),
      FollowsModel.count({ fans_id: ObjectId(id) }),
    ])
    result = JSON.parse(JSON.stringify(result))
    delete result.password
    res.send({
      ...result,
      fans_num: follows[0],
      follow_num: follows[1],
    })
  } catch (err) {
    next(err)
  }
})

// 用户登录
router.post('/login', async (req, res, next) => {
  let body = req.body
  try {
    if (!body.phone || !body.password) {
      return res.status(400).send({ message: '请输入手机号和密码' })
    }
    let { phone, password } = body
    password = encrypt(password)
    let result = await UsersModel.findOne({ phone, password })
    if (result) {
      let { _id, username } = result
      let token = genoJwt({ _id, username })
      res.send({
        code: 200,
        token: token,
      })
    } else {
      res.send({
        code: 20001,
        message: '用户名或密码错误',
      })
    }
  } catch (err) {
    next(err)
  }
})

// 修改用户信息
router.put('/update/:id', async (req, res, next) => {
  let body = req.body
  let { id } = req.params
  try {
    let allow_keys = ['username', 'introduc', 'avatar', 'position', 'company']
    Object.keys(body).forEach(key => {
      if (!allow_keys.includes(key)) {
        delete body[key]
      }
    })
    if (Object.keys(body).length == 0) {
      return res.status(400).send({
        message: '请传入要更新的数据',
      })
    }
    let result = await UsersModel.findByIdAndUpdate(id, body)
    if (result) {
      res.send({ message: '更新成功' })
    } else {
      res.status(400).send({ message: '更新失败，用户ID错误' })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router

var express = require('express')
var router = express.Router()
var MessModel = require('../model/messages')

// 创建消息
router.post('/create', async (req, res, next) => {
  let body = req.body
  try {
    let result = await MessModel.create(body)
    res.send(result)
  } catch (err) {
    next(err)
  }
})

// 消息统计
router.get('/preview', async (req, res, next) => {
  let user_id = req.auth._id
  try {
    let result = await MessModel.aggregate([
      { $match: { user_id: ObjectId(user_id), status: 0 } },
      {
        $group: {
          _id: '$type',
          count: {
            $sum: 1,
          },
        },
      },
    ])
    let rsinfo = Object.fromEntries(
      result.map(json => ['type' + json._id, json.count])
    )
    let resjson = {
      comment: rsinfo['type1'] || 0,
      praise: rsinfo['type2'] || 0,
      follow: rsinfo['type3'] || 0,
      total: result.reduce((a, b) => a + b.count, 0),
    }
    res.send(resjson)
  } catch (err) {
    next(err)
  }
})

module.exports = router

var express = require('express')
var router = express.Router()
var StmsgsModel = require('../model/shortmsgs')
var { groups } = require('../config/static')

router.all('/', (req, res) => {
  res.send('沸点API')
})

// 创建沸点
router.post('/create', async (req, res, next) => {
  let body = req.body
  let user_id = req.auth._id
  try {
    body.created_by = user_id
    let result = await StmsgsModel.create(body)
    res.send(result)
  } catch (err) {
    next(err)
  }
})

// 沸点列表
router.get('/lists', async (req, res, next) => {
  let { group, user_id, orderby, per_page, page } = req.query
  try {
    per_page = +per_page || 10
    page = +page || 1
    let skip = (page - 1) * per_page
    orderby = orderby || 'new'
    if (!['new', 'hot'].includes(orderby)) {
      return res.status(400).send({ message: 'orderby 参数错误' })
    }
    let where = {}
    if (group) {
      where.group = group
    }
    let total = await StmsgsModel.count(where).skip(skip)
    let result = await StmsgsModel.aggregate([
      { $match: where },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'source_id',
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'praises',
          localField: '_id',
          foreignField: 'target_id',
          as: 'praises',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'created_by',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $addFields: {
          is_praise: {
            $in: [ObjectId(user_id), '$praises.created_by'],
          },
          praises: {
            $size: '$praises',
          },
          comments: {
            $size: '$comments',
          },
          user: {
            $first: '$user',
          },
        },
      },
      {
        $unset: ['user.password', 'user.__v'],
      },
      {
        $sort:
          orderby == 'new' ? { created_at: -1 } : { comments: -1, praises: -1 },
      },
      { $skip: skip },
      {
        $limit: per_page,
      },
    ])
    res.send({
      meta: {
        total,
        page,
        per_page,
      },
      data: result,
    })
  } catch (err) {
    next(err)
  }
})

// 删除沸点
router.delete('/remove/:id', async (req, res, next) => {
  let { id } = req.params
  try {
    let result = await StmsgsModel.findByIdAndDelete(id)
    if (result) {
      res.send({ message: '删除成功' })
    } else {
      res.status(400).send({ message: '文档未找到，删除失败' })
    }
  } catch (err) {
    next(err)
  }
})

// 返回分类
router.get('/group', async (req, res, next) => {
  res.json(groups)
})

module.exports = router

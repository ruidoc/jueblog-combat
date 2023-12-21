var express = require('express')
var router = express.Router()
const { filterJson } = require('../utils/index')
var CommsModel = require('../model/comments')
var MessModel = require('../model/messages')

router.all('/', (req, res) => {
  res.send('评论API')
})

// 创建评论
router.post('/create', async (req, res, next) => {
  let body = req.body
  try {
    let { target_user, type } = body
    let result = await CommsModel.create(body)
    if (type == 'source') {
      await UsersModel.findByIdAndUpdate(target_user, {
        $inc: { jue_power: 1 },
      })
    }
    await MessModel.create({
      source_id: result._id,
      type: 1,
      user_id: target_user,
    })
    res.send(result)
  } catch (err) {
    next(err)
  }
})

// 删除评论
router.delete('/remove/:id', async (req, res, next) => {
  let { id } = req.params
  try {
    let result = await CommsModel.findByIdAndDelete(id)
    if (result) {
      res.send({ message: '删除成功' })
    } else {
      res.status(400).send({ message: '文档未找到，删除失败' })
    }
  } catch (err) {
    next(err)
  }
})

// 获取文章评论列表
router.get('/list/:source_id', async (req, res, next) => {
  let { source_id } = req.params
  try {
    let lists = await CommsModel.aggregate([
      { $match: { source_id: ObjectId(source_id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'created_by',
          foreignField: '_id',
          as: 'created_by',
        },
      },
    ])
    let handle = item => {
      let created_by =
        item.created_by.length > 0
          ? filterJson(item.created_by[0], ['_id', 'username', 'position'])
          : null
      return {
        _id: item._id,
        content: item.content,
        created_by,
      }
    }
    let result = lists
      .filter(list => list.type == 'source')
      .map(row => {
        return {
          ...handle(row),
          replies: lists
            .filter(list => list.parent_id == row._id.toString())
            .map(row => {
              return {
                ...handle(row),
                reply_id: row.reply_id,
              }
            }),
        }
      })
    res.send(result)
  } catch (err) {
    next(err)
  }
})

// 获取我的评论列表
router.get('/mylist', async (req, res, next) => {
  let user_id = req.auth._id
  let { per_page, page } = req.query
  try {
    per_page = +per_page || 10
    page = +page || 1
    let skip = (page - 1) * per_page
    let where = { target_user: ObjectId(user_id) }
    let total = await CommsModel.count(where)
    let lists = await CommsModel.aggregate([
      { $match: where },
      {
        $lookup: {
          from: 'users',
          localField: 'created_by',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'articles',
          localField: 'source_id',
          foreignField: '_id',
          as: 'article',
        },
      },
      {
        $lookup: {
          from: 'shortmsgs',
          localField: 'source_id',
          foreignField: '_id',
          as: 'shortmsg',
        },
      },
      {
        $addFields: {
          article: {
            $first: '$article',
          },
          shortmsg: {
            $first: '$shortmsg',
          },
          user: {
            $first: '$user',
          },
        },
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
      data: lists,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router

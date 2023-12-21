const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const messagesSchema = new mongoose.Schema({
  user_id: { type: ObjectId, required: true }, // 接受消息的用户 ID
  source_id: { type: ObjectId, required: true }, // 评论/收藏/关注的 ID
  type: { type: Number, enum: [1, 2, 3], required: true }, // 1: 评论，2: 收藏和赞，3: 新增粉丝
  status: { type: Number, enum: [0, 1], default: 0, required: true }, // 0: 未读，1: 已读
  created_at: { type: Date, default: Date.now },
})

const Model = mongoose.model('messages', messagesSchema)

module.exports = Model

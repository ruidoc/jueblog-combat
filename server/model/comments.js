const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const commentsSchema = new mongoose.Schema({
  source_id: { type: ObjectId, required: true }, // 文章或沸点ID
  source_type: { type: Number, enum: [1, 2], required: true }, // 1: 文章，2: 沸点
  type: {
    type: String,
    enum: ['source', 'comment', 'reply'],
    required: true,
  }, // source: 内容，comment: 评论，reply: 回复
  parent_id: {
    type: ObjectId,
    default: null,
    required() {
      return this.type != 'source'
    },
  }, // 父级评论的 ID
  reply_id: {
    type: ObjectId,
    default: null,
    required() {
      return this.type == 'reply'
    },
  }, // 回复某个评论的 ID
  target_user: { type: ObjectId, required: true }, // 评论对象创建者ID
  content: { type: String, required: true }, // 评论内容
  created_by: { type: ObjectId, required: true },
  created_at: { type: Date, default: Date.now },
})

const Model = mongoose.model('comments', commentsSchema)

module.exports = Model

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const praisesSchema = new mongoose.Schema({
  target_id: { type: ObjectId, required: true }, // 文章或沸点ID
  target_type: { type: Number, enum: [1, 2], required: true }, // 1: 文章，2: 沸点
  target_user: { type: ObjectId, required: true }, // 目标用户ID
  type: { type: Number, enum: [1, 2], default: 1, required: true }, // 1: 点赞，2: 收藏
  created_by: { type: ObjectId, required: true },
  created_at: { type: Date, default: Date.now },
})

const Model = mongoose.model('praises', praisesSchema)

module.exports = Model

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const followsSchema = new mongoose.Schema({
  user_id: { type: ObjectId, required: true }, // 用户 ID
  fans_id: { type: ObjectId, required: true }, // 粉丝 ID
  created_at: { type: Date, default: Date.now },
})

const Model = mongoose.model('follows', followsSchema)

module.exports = Model

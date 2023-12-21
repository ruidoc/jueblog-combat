const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const { groups } = require('../config/static')

const shortmsgsSchema = new mongoose.Schema({
  content: { type: String, required: true },
  images: { type: [String], default: [] },
  created_by: { type: ObjectId, required: true },
  created_at: { type: Date, default: Date.now },
  group: {
    type: String,
    enum: groups.map(group => group.key),
    required: true,
  },
})

const Model = mongoose.model('shortmsgs', shortmsgsSchema)

module.exports = Model

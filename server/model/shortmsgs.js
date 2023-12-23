const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const { groups } = require('../config/static')
const circles = groups.find(row => row.key == 'circles')?.children || []

const shortmsgsSchema = new mongoose.Schema({
  content: { type: String, required: true },
  images: { type: [String], default: [] },
  created_by: { type: ObjectId, required: true },
  created_at: { type: Date, default: Date.now },
  group: {
    type: String,
    enum: circles.map(group => group.key).concat(['all']),
    required: true,
  },
})

const Model = mongoose.model('shortmsgs', shortmsgsSchema)

module.exports = Model

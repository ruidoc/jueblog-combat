const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const { categories } = require('../config/static')

const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required() {
      return this.type == 1
    },
  },
  intro: {
    type: String,
    required() {
      return this.type == 1
    },
  },
  content: {
    type: String,
    required() {
      return this.type == 1
    },
  },
  category: {
    type: String,
    enum: categories.map(cate => cate.key),
    required() {
      return this.type == 1
    },
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  tags: [
    {
      type: ObjectId,
      required: true,
    },
  ],
  page_view: { type: Number, default: 0 },
  created_by: { type: ObjectId, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})
const Model = mongoose.model('articles', articlesSchema)

module.exports = Model

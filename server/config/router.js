const { Types } = require('mongoose')
global.ObjectId = id => new Types.ObjectId(id)

const userRouter = require('../router/users.js')
const artRouter = require('../router/articles.js')
const praisRouter = require('../router/praises.js')
const commsRouter = require('../router/comments.js')
const stmsgsRouter = require('../router/shortmsgs.js')
const messRouter = require('../router/messages.js')
const follRouter = require('../router/follows.js')

const router = app => {
  app.use('/users', userRouter)
  app.use('/arts', artRouter)
  app.use('/praises', praisRouter)
  app.use('/comments', commsRouter)
  app.use('/stmsgs', stmsgsRouter)
  app.use('/messages', messRouter)
  app.use('/follows', follRouter)
}

module.exports = router

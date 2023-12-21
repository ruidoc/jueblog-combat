const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoInit = require('./config/mongo')
const routerInit = require('./config/router')
const { verifyJwt } = require('./utils/jwt')
const app = express()
const port = 9000

app.use(bodyParser.json())
app.use(cors())

app.use(verifyJwt())

app.use(mongoInit)
routerInit(app)

app.use((req, res, next) => {
  res.status(404).send('Not Found')
})

app.use((err, req, res, next) => {
  // console.error(err.stack);
  let err400 = ['ValidationError', 'CastError', 'BSONError']
  let code = err400.includes(err.name) ? 400 : err.status || 500
  if (err.name == 'BSONError') {
    err.message = 'ID错误'
  }
  res.status(code).send({
    name: err.name,
    message: err.message,
  })
})

app.listen(port, () => {
  console.log(`函数启动并监听 ${port} 端口`)
})

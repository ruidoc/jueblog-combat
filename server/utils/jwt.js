const { expressjwt: exjwt } = require('express-jwt')
var jwt = require('jsonwebtoken')

// 密匙
const SECRET_KEY = 'alifn_jueblog_jwt_8756'

const unless = [
  '/arts/lists',
  '/arts/category',
  '/stmsgs/group',
  '/stmsgs/lists',
  /\/arts\/detail*/,
  /\/users\/info*/,
]

// 生成jwt
function genoJwt(data) {
  let token = jwt.sign(data, SECRET_KEY, { expiresIn: '7d' })
  return token
}

// 验证jwt
function verifyJwt() {
  return exjwt({
    secret: SECRET_KEY,
    algorithms: ['HS256'],
    credentialsRequired: false,
    requestProperty: 'auth',
    getToken: req => {
      let { authorization } = req.headers
      if (authorization && authorization.split(' ')[0] === 'Bearer') {
        let token = authorization.split(' ')[1]
        if (
          !token &&
          unless.some(row => (req.url.search(row) > -1 ? true : false))
        ) {
          return null
        }
        if (token) {
          return token
        } else {
          console.log(req.url, token)
          return 'token error'
        }
      } else {
        return 'token error'
      }
    },
  }).unless({
    path: ['/users/create', '/users/login'],
  })
}
module.exports = {
  genoJwt,
  verifyJwt,
}

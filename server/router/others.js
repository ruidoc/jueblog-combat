const express = require('express')
const { upload, uploadPath } = require('../utils')
const router = express.Router()

router.all('/', (req, res) => {
  res.send('其他类的接口')
})

router.post('/upload', upload.single('image'), (req, res) => {
  let file = req.file
  if (!file) {
    return res.status(400).send({
      code: 400,
      message: '文件不能为空',
    })
  }
  let { path, filename, size } = req.file
  res.send({
    code: 200,
    data: {
      path: path.replace(uploadPath, '/'),
      size,
      filename,
    },
  })
})

router.post('/uploads', upload.array('images', 4), (req, res) => {
  let files = req.files
  if (!files || files.length == 0) {
    return res.status(400).send({
      code: 400,
      message: '文件不能为空',
    })
  }
  // let { path, filename, size } = req.file
  res.send({
    code: 200,
    data: files.map(file => ({
      path: file.path.replace(uploadPath, '/'),
      size: file.size,
      filename: file.filename,
    })),
  })
})

module.exports = router

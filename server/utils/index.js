const fs = require('fs')
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const dayjs = require('dayjs')

const uploadPath = '/home/static/'

const filterJson = (json, keys) => {
  return Object.fromEntries(
    Object.entries(json).filter(row => keys.includes(row[0]))
  )
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let dirpath = uploadPath + 'uploads/' + dayjs().format('YYYY-MM-DD')
      if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath, { recursive: true })
      }
      cb(null, dirpath)
    },
    filename: (req, file, cb) => {
      let length = 12 // 文件名长度
      let random_name = crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length)
      let { fieldname, originalname } = file
      let after = path.extname(originalname)
      cb(null, random_name + after)
    },
  }),
  limits: {
    fileSize: 1024 * 1024, // 限制文件大小为1MB
  },
})

module.exports = { filterJson, upload, uploadPath }

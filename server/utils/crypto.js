// utils/crypto.js
const crypto = require("crypto");
// 密匙
const SECRET_KEY = "my_custom_8848"; // 密匙请自定义

// md5 加密
function md5(content) {
  let md5 = crypto.createHash("md5");
  return md5.update(content).digest("hex"); // 把输出编程16进制的格式
}
// 加密函数
function encrypt(password) {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
}

module.exports = encrypt;

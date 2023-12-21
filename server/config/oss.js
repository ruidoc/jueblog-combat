import OSS from 'ali-oss'

let client = new OSS({
  accessKeyId: '',
  accessKeySecret: '',
})
async function put() {
  try {
    // 'object'填写上传至OSS的object名称,即不包括Bucket名称在内的Object的完整路径。
    // 'localfile'填写上传至OSS的本地文件完整路径。
    let r1 = await client.put('object', 'localfile')
    console.log('put success: %j', r1)
    let r2 = await client.get('object')
    console.log('get success: %j', r2)
  } catch (e) {
    console.error('error: %j', e)
  }
}

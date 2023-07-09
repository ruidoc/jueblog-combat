import axios, { type AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
import { loginStore } from '@/stores'

const instance: AxiosInstance = axios.create({
  // baseURL: 'https://blog-fun-blog-server-syqqqghajr.cn-hangzhou.fcapp.run',
  baseURL: 'http://localhost:9000',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
instance.interceptors.request.use(request => {
  if (request.data instanceof FormData) {
    request.headers['Content-Type'] = 'multipart/form-data'
  }
  request.headers.Authorization = 'Bearer ' + (localStorage.token || '')
  return request
})

// 响应拦截器，全局错误处理
instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // debugger
    if (error.response) {
      let response = error.response
      if (response.status === 401) {
        // ElMessage.error('登录已过期，请重新登录')
        loginStore().showLogin()
        localStorage.removeItem('token')
        // window.location.href = '/login'
      } else {
        ElMessage.error(response.message)
      }
    } else {
      ElMessage.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default instance

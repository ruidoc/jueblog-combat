import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import request from '@/request'

const loginStore = defineStore('login', {
  state: () => ({
    need_login: false,
    user_info: null as UserInfoType | null,
  }),
  actions: {
    showLogin() {
      this.need_login = true
    },
    setUserInfo(info: UserInfoType) {
      this.user_info = info
    },
    async login(form: any, fun: (bool: boolean) => void) {
      try {
        let res: any = await request.post('/users/login', form)
        if (res.code != 200) {
          fun(false)
          return ElMessage.error(res.message)
        }
        let { data, token } = res
        localStorage.setItem('token', token)
        localStorage.setItem('user_info', JSON.stringify(data))
        this.setUserInfo(data)
        fun(true)
        // debugger
      } catch (error) {
        fun(false)
        console.log(error)
      }
    },
  },
})

export default loginStore

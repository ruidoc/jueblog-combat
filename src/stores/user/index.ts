import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import request from '@/request'

const userStore = defineStore('user', {
  state: () => ({
    need_login: false,
    user_info: null as UserType | null,
  }),
  actions: {
    showLogin() {
      this.need_login = true
    },
    setUserInfo(info: UserType) {
      this.user_info = info
      localStorage.setItem('user_info', JSON.stringify(info))
    },
    async login(form: any, fun: (bool: boolean) => void) {
      try {
        let res: any = await request.post('/users/login', form)
        if (res.code != 200) {
          fun(false)
          return ElMessage.error(res.message)
        }
        localStorage.setItem('token', res.token)
        this.getUser('self')
        fun(true)
        // debugger
      } catch (error) {
        fun(false)
        console.log(error)
      }
    },
    async getUser(id: string, fun?: (data: any) => void) {
      try {
        let res: any = await request.get('/users/info/' + id)
        if (id == 'self') {
          this.setUserInfo(res)
        }
        if (fun) fun(res)
      } catch (error) {
        console.log(error)
      }
    },
    // 关注/取消关注
    async toggleFollow(
      data: Record<string, string>,
      fun?: (data: any) => void
    ) {
      try {
        let res: any = await request.post('/follows/toggle', data)
        if (fun) fun(res)
      } catch (error) {
        console.log(error)
      }
    },
    // 检测是否关注某用户
    async checkFollow(user_id: string, fun?: (data: any) => void) {
      try {
        let res: any = await request.post('/follows/is-follow', { user_id })
        if (fun) fun(res)
      } catch (error) {
        console.log(error)
      }
    },
  },
})

export default userStore

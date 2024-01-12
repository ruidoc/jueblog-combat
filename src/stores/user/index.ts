import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import request from '@/request'

const userStore = defineStore('user', {
  state: () => ({
    show_tips: false,
    need_login: false,
    user_info: null as UserType | null,
  }),
  actions: {
    showLogin() {
      this.need_login = true
    },
    setTips(bool = true) {
      this.show_tips = bool
    },
    setUserInfo(info: UserType) {
      this.user_info = info
      localStorage.setItem('jueblog_user_info', JSON.stringify(info))
    },
    async login(form: any, fun: (code: number) => void) {
      try {
        let res: any = await request.post('/users/login', form)
        if (res.code == 20001) {
          ElMessage.error(res.message)
        }
        if (res.code == 200) {
          localStorage.setItem('jueblog_token', res.token)
          this.getUser('self')
        }
        fun(res.code)
      } catch (error) {
        fun(500)
        console.log(error)
      }
    },
    async register(form: Partial<UserType>, fun: (code: number) => void) {
      try {
        await request.post('/users/create', form)
        this.login(form, fun)
      } catch (error) {
        fun(500)
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
    // 修改用户信息
    async updateUser(
      id: string,
      data: Partial<UserType>,
      fun?: (data: any) => void
    ) {
      try {
        let res: any = await request.put('/users/update/' + id, data)
        this.getUser('self')
        if (fun) fun(res)
      } catch (error) {
        console.log(error)
      }
    },
  },
})

export default userStore

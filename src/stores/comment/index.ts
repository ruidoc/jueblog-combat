import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import request from '@/request'

const commentStore = defineStore('comment', {
  state: () => ({
    action_load: 1,
  }),
  actions: {
    // 评论列表
    async getComments(id: string, fun: (data: any) => void) {
      try {
        let res: any = await request.get('/comments/list/' + id)
        fun(res)
      } catch (error) {
        console.log(error)
      }
    },
    // 创建评论
    async createComment(data: Partial<CommentType>, fun: (data: any) => void) {
      try {
        let res: any = await request.post('/comments/create', data)
        fun(res)
      } catch (error) {
        console.log(error)
      }
    },
    // 删除评论
    async removeComment(id: string, fun: (bool: boolean) => void) {
      try {
        await request.delete('/comments/remove/' + id)
        fun(true)
      } catch (error) {
        console.log(error)
        fun(false)
      }
    },
    // 刷新请求
    reload() {
      this.action_load++
    },
  },
})

export default commentStore

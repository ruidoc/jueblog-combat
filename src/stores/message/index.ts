import { defineStore } from 'pinia'
import request from '@/request'

const mesgStore = defineStore('message', {
  state: () => ({
    msgInfo: {
      comment: 0,
      praise: 0,
      follow: 0,
      total: 0,
    } as MessageType,
  }),
  actions: {
    async getMessage() {
      try {
        let res: any = await request.get('/messages/preview')
        if (res) {
          this.msgInfo = res
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getComment(fun: (res: any) => void, page = 1) {
      try {
        let params = { page }
        let res = await request.get('/comments/mylist', { params })
        fun(res)
      } catch (error) {
        fun(null)
        console.log(error)
      }
    },
    async getPraises(fun: (res: any) => void, page = 1) {
      try {
        let params = { page }
        let res = await request.get('/praises/mylist', { params })
        fun(res)
      } catch (error) {
        fun(null)
        console.log(error)
      }
    },
    async getFollows(fun: (res: any) => void, page = 1) {
      try {
        let params = { page }
        let res = await request.get('/follows/lists', { params })
        fun(res)
      } catch (error) {
        fun(null)
        console.log(error)
      }
    },
  },
})

export default mesgStore

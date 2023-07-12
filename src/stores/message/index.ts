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
    async getComment(fun: (res: any) => void) {
      try {
        let res: any = await request.get('/comments/mylist')
        if (res) {
          fun(res)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getPraises(fun: (res: any) => void) {
      try {
        let res: any = await request.get('/praises/mylist')
        if (res) {
          fun(res)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getFollows(fun: (res: any) => void) {
      try {
        let res: any = await request.get('/follows/lists')
        if (res) {
          fun(res)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
})

export default mesgStore

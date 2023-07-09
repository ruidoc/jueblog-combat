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
        let res: any = await request.get('/messages/lists')
        if (res) {
          this.msgInfo = res
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
})

export default mesgStore

import { defineStore } from 'pinia'
import request from '@/request'

const bookStore = defineStore('book', {
  state: () => ({
    m: '',
  }),
  actions: {
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

export default bookStore

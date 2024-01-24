<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import CusHeader from '@/components/cus-header/index.vue'
import CusLogin from '@/components/cus-login/index.vue'
import { RouterView } from 'vue-router'
import { userStore } from '@/stores'
import { isToBottom, listener } from './utils'

const ustore = userStore()
const L = ref(null)
const curpath = location.pathname
watch(
  () => ustore.need_login,
  val => {
    if (val) {
      L.value.visible = true
    }
  }
)
const onScroll = () => {
  isToBottom(() => {
    console.log('滚动到底部')
    listener.emit('scroll-end')
  })
}
onMounted(() => {
  if (window.outerWidth < 1000 && !curpath.includes('mobile')) {
    return location.replace('/mobile')
  }
  let uinfo = localStorage.jueblog_user_info
  if (uinfo) {
    ustore.setUserInfo(JSON.parse(uinfo))
  }
  if (['/', '/shortmsg'].includes(location.pathname)) {
    ustore.setTips()
  }
  window.addEventListener('scroll', onScroll)
})
</script>

<template>
  <div id="root-layout">
    <div v-if="!/operate|mobile/.test(curpath)" id="header-layout">
      <!-- 头部组件区域 -->
      <CusHeader />
    </div>
    <div id="main-layout" :class="{ 'show-tips': ustore.show_tips }">
      <!-- 路由区域 -->
      <RouterView />
      <CusLogin ref="L" />
    </div>
  </div>
</template>

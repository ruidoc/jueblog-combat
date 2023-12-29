<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import CusHeader from '@/components/cus-header/index.vue'
import CusLogin from '@/components/cus-login/index.vue'
import { RouterView, useRoute } from 'vue-router'
import { userStore } from '@/stores'
import { isToBottom, listener } from './utils'

const route = useRoute()
const ustore = userStore()
const L = ref(null)
const need_login = computed(() => ustore.need_login)
watch(need_login, val => {
  if (val) {
    L.value.visible = true
  }
})
const onScroll = () => {
  isToBottom(() => {
    console.log('滚动到底部')
    listener.emit('scroll-end')
  })
}
onMounted(() => {
  let uinfo = localStorage.jueblog_user_info
  if (uinfo) {
    ustore.setUserInfo(JSON.parse(uinfo))
  }
  window.addEventListener('scroll', onScroll)
})
</script>

<template>
  <div id="root-layout">
    <div v-if="route.name != 'operate'" id="header-layout">
      <!-- 头部组件区域 -->
      <CusHeader />
    </div>
    <div id="main-layout">
      <!-- 路由区域 -->
      <RouterView />
      <CusLogin ref="L" />
    </div>
  </div>
</template>

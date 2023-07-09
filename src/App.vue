<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import CusHeader from '@/components/cus-header/index.vue'
import CusLogin from '@/components/cus-login/index.vue'
import { RouterView, useRoute } from 'vue-router'
import { loginStore } from '@/stores'

const route = useRoute()
const lostore = loginStore()
const L = ref(null)
const need_login = computed(() => lostore.need_login)
watch(need_login, val => {
  if (val) {
    L.value.visible = true
  }
})
onMounted(() => {
  let uinfo = localStorage.user_info
  if (uinfo) {
    lostore.setUserInfo(JSON.parse(uinfo))
  }
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

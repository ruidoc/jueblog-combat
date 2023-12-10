<template>
  <header>
    <div class="inner-row">
      <img class="logo" src="@/assets/logo.svg" @click="toHome" />
      <Menus></Menus>
    </div>
    <div class="inner-row">
      <Search style="margin-right: 26px"></Search>
      <el-popover
        placement="bottom-end"
        :width="100"
        :show-arrow="false"
        trigger="hover"
        transition="none"
        :hide-after="50"
        ref="popover"
        popper-class="header-message-popover"
      >
        <template #reference>
          <el-button type="primary" :icon="Plus">开始创作</el-button>
        </template>
        <div class="btn-wrap">
          <el-button text @click="toRoute('/operate/create')">写文章</el-button>
          <el-button text @click="toRoute('/shortmsg')">发沸点</el-button>
          <el-button text @click="toRoute('/setting/drafts')">草稿箱</el-button>
        </div>
      </el-popover>
      <template v-if="ustore.user_info">
        <Message></Message>
        <UserAva></UserAva>
      </template>
      <template v-else>
        <el-button @click="ustore.showLogin">登录/注册</el-button>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Menus from './menus.vue'
import Search from './search.vue'
import Message from './message.vue'
import UserAva from './user.vue'
import { Plus } from '@element-plus/icons-vue'
import { userStore } from '@/stores'
const ustore = userStore()
const router = useRouter()
const popover = ref()
const toHome = () => {
  location.href = '/'
}
const toRoute = (url: string) => {
  popover.value.hide()
  router.push(url)
}
// login()
</script>

<style lang="less">
header {
  height: 100%;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .inner-row {
    display: flex;
    align-items: center;
    .logo {
      height: 22px;
      margin-right: 12px;
      cursor: pointer;
    }
  }
}
</style>

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
        popper-class="header-message-popover"
      >
        <template #reference>
          <el-button type="primary">
            <span>开始创作</span> &nbsp;
            <el-icon><CaretBottom /></el-icon>
          </el-button>
        </template>
        <div class="btn-wrap">
          <el-button text @click="toWrite">写文章</el-button>
          <el-button text>发沸点</el-button>
          <el-button text>草稿箱</el-button>
        </div>
      </el-popover>
      <template v-if="ustore.user_info">
        <Message></Message>
        <UserAva></UserAva>
      </template>
      <template v-else>
        <el-button @click="showLogin">登录/注册</el-button>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import Menus from './menus.vue'
import Search from './search.vue'
import Message from './message.vue'
import UserAva from './user.vue'
import { CaretBottom } from '@element-plus/icons-vue'
import { userStore } from '@/stores'
const ustore = userStore()
const showLogin = () => {
  ustore.showLogin()
}
const toHome = () => {
  location.href = '/'
}
const toWrite = () => {
  window.open('/operate/create')
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

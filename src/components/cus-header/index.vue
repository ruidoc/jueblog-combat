<template>
  <header>
    <div class="inner-row fx">
      <span class="fx-c title-wrap" @click="toHome">
        <img class="logo" src="/logo.png" />
        <span class="title">仿稀土掘金</span>
      </span>
      <Menus></Menus>
    </div>
    <div class="inner-row fx">
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
          <el-button type="primary" :icon="EditPen">开始创作</el-button>
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
        <el-button class="hover" @click="ustore.showLogin">登录/注册</el-button>
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
import { EditPen } from '@element-plus/icons-vue'
import { userStore } from '@/stores'
const ustore = userStore()
const router = useRouter()
const popover = ref()
const toHome = () => {
  location.href = '/'
}
const toRoute = (url: string) => {
  popover.value.hide()
  if (!ustore.user_info) {
    return ustore.showLogin()
  }
  if (url.includes('create')) {
    window.open(url)
  } else {
    router.push(url)
  }
}
// login()
</script>

<style lang="less">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 24px;
  .inner-row {
    .title-wrap {
      cursor: pointer;
    }
    .title {
      font-size: 21px;
      font-weight: 300;
      margin-right: 20px;
    }
    .logo {
      height: 26px;
      margin-right: 6px;
      cursor: pointer;
    }
  }
}
</style>

<template>
  <div class="header-userava">
    <el-popover
      placement="bottom-end"
      :width="230"
      :show-arrow="false"
      trigger="click"
      transition="none"
      :hide-after="50"
      :offset="9"
      popper-style="z-index:3000"
      popper-class="header-user-popover"
    >
      <template #reference>
        <el-avatar :src="user_info.avatar">
          <img src="@/assets/avatar.png" />
        </el-avatar>
      </template>
      <div class="user-wrap fx">
        <el-avatar :size="48" :src="user_info.avatar">
          <img src="@/assets/avatar.png" />
        </el-avatar>
        <router-link :to="'/user/' + user_info._id">
          <div class="rcolum">
            <div class="name">{{ user_info.username }}</div>
            <div class="jue fx">
              掘力值：<span>{{ user_info.jue_power }}</span>
            </div>
          </div>
        </router-link>
      </div>
      <el-divider />
      <div class="preview fx">
        <div class="item">
          <b>{{ user_info.follow_num }}</b>
          <div class="label">关注</div>
        </div>
        <div class="item">
          <b>{{ user_info.good_num }}</b>
          <div class="label">赞过</div>
        </div>
        <div class="item">
          <b>{{ user_info.fans_num }}</b>
          <div class="label">粉丝</div>
        </div>
      </div>
      <el-divider />
      <div class="btn-wrap">
        <el-button text @click="toRoute('/user/' + user_info._id)"
          >个人主页</el-button
        >
        <el-button text @click="toRoute('/setting/user')">用户设置</el-button>
      </div>
      <el-divider />
      <el-button text style="width: 100%" @click="toLogout">退出登录</el-button>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { userStore } from '@/stores'
import router from '@/router'
import { cusConfirm } from '@/utils'
const { user_info } = userStore()
const toRoute = (path: string) => {
  router.push(path)
}
const toLogout = () => {
  cusConfirm('确认退出登录？', () => {
    localStorage.removeItem('jueblog_token')
    localStorage.removeItem('jueblog_user_info')
    location.href = '/'
  })
}
</script>

<style lang="less">
.header-userava {
  .el-avatar {
    cursor: pointer;
  }
}
.header-user-popover {
  .user-wrap {
    .rcolum {
      color: #444;
      margin-left: 12px;
      .name {
        font-size: 16px;
        margin-top: 2px;
      }
      .jue {
        font-size: 13px;
        span {
          font-weight: bold;
          color: #000;
          font-size: 15px;
        }
      }
    }
  }
  .el-divider {
    border-color: #f0f0f0;
    margin: 10px 0;
  }
  .preview {
    .item {
      flex: 1;
      text-align: center;
      b {
        color: #252933;
        font-size: 16px;
      }
      .label {
        font-size: 12px;
        color: #8a919f;
      }
    }
  }
  .btn-wrap {
    display: flex;
    flex-direction: column;
    button {
      margin-left: 0;
      justify-content: flex-start;
    }
  }
}
</style>

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
        <el-avatar>
          <img src="@/assets/avatar.png" />
        </el-avatar>
      </template>
      <div class="user-wrap">
        <el-avatar :size="48">
          <img src="@/assets/avatar.png" />
        </el-avatar>
        <router-link to="/user">
          <div class="rcolum">
            <div class="name">{{ user_info.username }}</div>
            <div class="jue">
              掘力值：<span>{{ user_info.jue_power }}</span>
            </div>
          </div>
        </router-link>
      </div>
      <el-divider />
      <div class="preview">
        <div class="item">
          <b>4</b>
          <div class="label">关注</div>
        </div>
        <div class="item">
          <b>4</b>
          <div class="label">赞过</div>
        </div>
        <div class="item">
          <b>4</b>
          <div class="label">收藏</div>
        </div>
      </div>
      <el-divider />
      <div class="btn-wrap">
        <el-button text>个人主页</el-button>
        <el-button text>用户设置</el-button>
      </div>
      <el-divider />
      <el-button text style="width: 100%">退出登录</el-button>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { messageStore, loginStore } from '@/stores'
const { user_info } = loginStore()
</script>

<style lang="less">
.header-userava {
  .el-avatar {
    cursor: pointer;
  }
}
.header-user-popover {
  .user-wrap {
    display: flex;
    align-items: center;
    .rcolum {
      color: #444;
      margin-left: 12px;
      .name {
        font-size: 16px;
        margin-top: 2px;
      }
      .jue {
        font-size: 13px;
        display: flex;
        align-items: center;
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
    display: flex;
    align-items: center;
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

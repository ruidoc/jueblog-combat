<template>
  <div class="header-message">
    <el-popover
      placement="bottom-end"
      :width="144"
      :show-arrow="false"
      trigger="hover"
      transition="none"
      :hide-after="50"
      :offset="14"
      popper-class="header-message-popover"
    >
      <template #reference>
        <el-badge
          :value="msgInfo.total"
          :hidden="msgInfo.total == 0"
          class="total-badge"
        >
          <router-link class="icon-wrap" to="/messages">
            <span class="iconfont icon-notify"></span>
            <!-- <el-icon :size="22"><BellFilled /></el-icon> -->
          </router-link>
        </el-badge>
      </template>
      <div class="btn-wrap">
        <el-button text>
          <span>评论</span>
          <el-badge :value="msgInfo.comment" :hidden="msgInfo.comment == 0" />
        </el-button>
        <el-button text>
          <span>赞和收藏</span>
          <el-badge :value="msgInfo.praise" :hidden="msgInfo.praise == 0" />
        </el-button>
        <el-button text>
          <span>新增粉丝</span>
          <el-badge :value="msgInfo.follow" :hidden="msgInfo.follow == 0" />
        </el-button>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { messageStore } from '@/stores'
import { ElPopover } from 'element-plus'
import { BellFilled } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
const msgstore = messageStore()
let { msgInfo } = storeToRefs(msgstore)
onMounted(() => {
  msgstore.getMessage()
  console.log(msgInfo)
})
</script>

<style lang="less">
.header-message {
  margin: 0 10px;
  .icon-wrap {
    color: #909090;
    padding: 4px 13px;
    .iconfont {
      font-size: 22px;
    }
  }
  .total-badge {
    &[aria-describedby] .icon-wrap {
      color: #515767;
    }
    sup {
      transform: translateY(-50%) translateX(55%) scale(0.8);
    }
  }
}
.header-message-popover {
  padding: 8px;
  .btn-wrap {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .el-button > span {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    button {
      margin: 0;
      padding: 20px 12px;
    }
  }
}
</style>

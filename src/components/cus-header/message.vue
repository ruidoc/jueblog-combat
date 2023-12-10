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
          <span class="icon-wrap" @click="toMessage('1')">
            <span class="iconfont icon-notify"></span>
          </span>
        </el-badge>
      </template>
      <div class="btn-wrap">
        <el-button text @click="toMessage('1')">
          <span>评论</span>
          <el-badge :value="msgInfo.comment" :hidden="msgInfo.comment == 0" />
        </el-button>
        <el-button text @click="toMessage('2')">
          <span>赞和收藏</span>
          <el-badge :value="msgInfo.praise" :hidden="msgInfo.praise == 0" />
        </el-button>
        <el-button text @click="toMessage('3')">
          <span>新增粉丝</span>
          <el-badge :value="msgInfo.follow" :hidden="msgInfo.follow == 0" />
        </el-button>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { messageStore } from '@/stores'
import { ElPopover } from 'element-plus'
import { storeToRefs } from 'pinia'
const msgstore = messageStore()
let { msgInfo } = storeToRefs(msgstore)
const router = useRouter()
const toMessage = (type: string) => {
  let url = '/messages'
  if (type != '1') {
    url += `?type=${type}`
  }
  router.push(url)
}
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
    cursor: pointer;
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

<script setup lang="ts">
import { shortmsgStore } from '@/stores'
import { onMounted } from 'vue'
const store = shortmsgStore()

onMounted(() => {})
</script>

<template>
  <div class="main-writer">
    <div class="hello-dv box-wrap">
      <div class="item">
        <h4>早上好</h4>
        <p>这里是仿掘金实战项目</p>
      </div>
      <el-button>看详情</el-button>
    </div>
  </div>
</template>

<style lang="less">
.main-writer {
  width: 260px;
  margin-left: 20px;
  .box-wrap {
    background: #fff;
    border-radius: 4px;
    padding: 20px;
  }
  .hello-dv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 3px;
    }
  }
}
</style>

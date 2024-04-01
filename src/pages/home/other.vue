<script setup lang="ts">
import { onMounted } from 'vue'
const toGithub = () => {
  window.open('https://github.com/ruidoc/jueblog-combat')
}
onMounted(() => {})
</script>

<template>
  <div class="main-writer">
    <div class="box-wrap fx-b">
      <div>
        <h4>项目已开源</h4>
        <p>前端、接口完整源码</p>
      </div>
      <el-button @click="toGithub">去Star</el-button>
    </div>
    <div class="box-wrap">
      <h4>进源码实战群</h4>
      <p>扫码加作者微信，进群学习讨论</p>
      <img src="/wechat.jpeg" style="width: 80%" />
    </div>
    <div class="book-dv box-wrap">
      <h4>5折购买纸质书</h4>
      <p>本项目基础+实战详细介绍全在下方书中，点击去购买</p>
      <a class="link" target="_blank" href="https://item.jd.com/14337084.html">
        <img src="/book.png" />
      </a>
    </div>
  </div>
</template>

<style lang="less">
.main-writer {
  width: 260px;
  margin-left: 20px;
  position: sticky;
  top: 80px;
  .box-wrap {
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 16px;
    h4 {
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 4px;
    }
    img {
      display: block;
      max-width: 100%;
      margin: 0 auto;
    }
  }
  .book-dv {
    .link {
      display: flex;
      margin: 13px 0 5px 0px;
      img {
        width: 84%;
      }
    }
  }
}
</style>

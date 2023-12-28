<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {})
</script>

<template>
  <div class="main-writer">
    <!-- <div class="box-wrap">
      <h4>你好，我是杨成功</h4>
      <p>仿稀土掘金实战，JavaScript 全栈开发</p>
    </div> -->
    <div class="box-wrap">
      <h4>本项目已开源</h4>
      <p>关注下方公众号，回复「实战派源码」获取项目源码地址</p>
      <img src="/wechat.jpeg" style="width: 80%" />
    </div>
    <div class="book-dv box-wrap">
      <h4>购买纸质书</h4>
      <p>零基础全栈开发本项目？基础+实战详细介绍全在这本书里，点击购买</p>
      <a class="link" href="#">
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
      line-height: 24px;
      margin-bottom: 6px;
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
      margin-top: 10px;
      img {
        width: 90%;
      }
    }
  }
}
</style>

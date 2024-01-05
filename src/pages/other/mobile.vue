<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {
  if (window.outerWidth > 1200) {
    location.replace('/')
  }
})
</script>

<template>
  <section class="mobile-page fx-c">
    <div class="t">请在电脑端访问</div>
    <div class="t d">https://jueblog.ruidoc.cn</div>
  </section>
</template>

<style lang="less">
.mobile-page {
  position: fixed;
  flex-direction: column;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .t {
    position: relative;
    bottom: 11vh;
    font-size: 21px;
    font-weight: 300;
  }
  .d {
    bottom: 8vh;
    font-size: 24px;
  }
}
</style>

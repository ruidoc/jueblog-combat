<template>
  <div class="header-menu">
    <RouterLink to="/">首页</RouterLink>
    <RouterLink to="/shortmsg">沸点</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const data = ref(0)
</script>

<style lang="less">
.header-menu {
  height: var(--header-height);
  line-height: var(--header-height);
  display: flex;
  align-items: stretch;
  a {
    color: var(--font-color2);
    padding: 0 1rem;
    text-decoration: unset;
    font-size: 1.167rem;
    position: relative;
    &:hover {
      font-weight: 500;
      &::after {
        position: absolute;
        content: '';
        left: 0.5rem;
        right: 0.5rem;
        bottom: 0;
        height: 2px;
        background: var(--el-color-primary);
      }
    }
    &.router-link-active {
      color: #1e80ff;
      font-weight: 500;
    }
  }
}
</style>

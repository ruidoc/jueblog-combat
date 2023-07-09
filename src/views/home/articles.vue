<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Articles from '@/views/article/lists.vue'
const route = useRoute()

const emit = defineEmits<{
  (e: 'onFilter', json: Record<string, string>): void
}>()

const orderby = ref('hot')
const onFilter = (e: MouseEvent) => {
  let dom: any = e.target
  orderby.value = dom.dataset.val
  emit('onFilter', { orderby: orderby.value })
}

onMounted(() => {
  orderby.value = (route.query['orderby'] as string) || 'hot'
})
</script>

<template>
  <div class="main-articles">
    <div class="arts-header">
      <ul @click="onFilter">
        <li data-val="hot" :class="{ active: orderby == 'hot' }">最热</li>
        <li data-val="new" :class="{ active: orderby == 'new' }">最新</li>
      </ul>
    </div>
    <Articles />
  </div>
</template>

<style lang="less">
.main-articles {
  background: #fff;
  border-radius: 4px;
  flex: 1;
  .arts-header {
    border-bottom: 1px solid #eee;
    padding: 12px 12px;
    ul {
      display: flex;
      align-items: center;
      li {
        font-size: 16px;
        padding: 0 20px;
        cursor: pointer;
        color: var(--font-color3);
        position: relative;
        &.active {
          color: var(--font-color1);
          font-weight: 500;
          &::after {
            content: '';
            position: absolute;
            left: 38%;
            right: 38%;
            bottom: -12px;
            height: 3px;
            background: var(--el-color-primary);
            border-radius: 2px;
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const props = defineProps<{
  category: any[]
}>()
const emit = defineEmits<{
  (e: 'onFilter', json: Record<string, string>): void
}>()
const route = useRoute()
const active = ref('all')
const onClick = (item: any) => {
  active.value = item.key
  emit('onFilter', { category: item.key })
}
onMounted(() => {
  active.value = (route.query['category'] as string) || 'all'
})
</script>

<template>
  <div class="main-nav">
    <div
      :class="['cato-item fx', { active: active == item.key }]"
      v-for="item in props.category"
      @click="onClick(item)"
    >
      <el-icon :size="18">
        <component :is="item.icon" />
      </el-icon>
      <span class="text">{{ item.label }}</span>
    </div>
  </div>
</template>

<style lang="less">
.main-nav {
  background: #fff;
  width: 180px;
  box-sizing: border-box;
  position: sticky;
  top: 80px;
  margin-right: 20px;
  height: fit-content;
  border-radius: 4px;
  padding: 8px;
  .cato-item {
    position: relative;
    padding: 10px 17px;
    line-height: 24px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    color: var(--font-color2);
    .el-icon {
      color: #8a919f;
    }
    &:hover {
      background: var(--bg-color1);
      color: var(--el-color-primary);
      .el-icon {
        color: var(--el-color-primary);
      }
    }
    &.active {
      color: var(--el-color-primary);
      font-weight: 500;
      background: #eaf2ff;
      .el-icon {
        color: var(--el-color-primary);
      }
    }
    .text {
      padding-left: 17px;
    }
  }
}
</style>

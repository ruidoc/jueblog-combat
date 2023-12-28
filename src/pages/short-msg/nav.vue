<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const props = defineProps<{
  groups: any[]
}>()
const emit = defineEmits<{
  (e: 'onFilter', json: Record<string, string>): void
}>()
const route = useRoute()
const active = ref('all')
const onClick = (item: any) => {
  let key = item.children && item.children[0] ? item.children[0].key : item.key
  active.value = key
  emit('onFilter', { group: key })
}
onMounted(() => {
  active.value = (route.query['group'] as string) || 'all'
})
</script>

<template>
  <div class="main-nav">
    <div v-for="item in props.groups" class="cato-item-wrap">
      <div
        :class="['cato-item fx', { active: active == item.key }]"
        @click="onClick(item)"
      >
        <el-icon :size="18">
          <component :is="item.icon" />
        </el-icon>
        <span class="text">{{ item.label }}</span>
      </div>
      <div v-if="item.children" class="childs-wrap">
        <div
          :class="['cato-item sub fx', { active: active == subitem.key }]"
          v-for="subitem in item.children"
          @click="onClick(subitem)"
        >
          {{ subitem.label }}
        </div>
      </div>
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
    &.sub {
      font-size: 14px;
      padding-left: 48px;
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
      padding-left: 13px;
    }
  }
}
</style>

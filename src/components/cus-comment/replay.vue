<template>
  <div class="comment-replay">
    <div class="handle">
      <span>{{ getTimer(time) }}</span>
      <span :class="['repbtn', { active: props.active }]" @click="onActive">{{
        props.active ? '取消回复' : '回复'
      }}</span>
    </div>
    <div class="interact" v-if="active">
      <el-input
        v-model="intro"
        type="textarea"
        ref="input"
        placeholder="请输入回复内容"
        maxlength="80"
        show-word-limit
        :rows="2"
        resize="none"
        @blur="onBlur"
      />
      <el-button type="primary" size="small" :loading="loading" @click="toReply"
        >回复</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getTimer } from '@/utils'
import { ElMessage } from 'element-plus'
import { computed, nextTick, ref, watch } from 'vue'
const intro = ref('')
const loading = ref()
const input = ref()
const props = defineProps<{
  active: boolean
  time: string
}>()
const emit = defineEmits<{
  (e: 'onActive', is_act: boolean): void
  (e: 'onReply', msg: string): void
}>()
const toReply = () => {
  if (!intro.value) {
    return ElMessage.error('回复内容不可为空')
  }
  loading.value = true
  emit('onReply', intro.value)
}
const onBlur = (e: MouseEvent) => {
  if (!e.relatedTarget && !intro.value) {
    emit('onActive', false)
  }
}
const onActive = () => {
  emit('onActive', !props.active)
}

const is_active = computed(() => props.active)
watch(is_active, async val => {
  if (val) {
    loading.value = false
    intro.value = ''
    await nextTick()
    input.value?.focus()
  }
})
</script>

<style lang="less">
.comment-replay {
  .handle {
    font-size: 13px;
    color: var(--font-color3);
    .repbtn {
      margin-left: 12px;
      cursor: pointer;
      &:hover {
        color: var(--el-color-primary);
      }
      &.active {
        color: var(--el-color-primary);
      }
    }
  }
  .interact {
    margin-top: 10px;
    padding: 2px;
    border-radius: 3px;
    box-shadow: 0 0 0 1px var(--el-color-primary) inset;
    display: flex;
    align-items: flex-end;
    .el-textarea {
      flex: 1;
      margin-bottom: 6px;
      textarea {
        box-shadow: none;
      }
    }
    button {
      margin: 0 7px 5px 0;
      height: 26px;
    }
  }
}
</style>

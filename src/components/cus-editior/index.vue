<script lang="ts" setup>
import { Editor } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import 'bytemd/dist/index.min.css'
const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', ctx: string): void
}>()
const plugins = [gfm()]
const handleChange = (ctx: string) => {
  emit('update:modelValue', ctx)
}
</script>

<template>
  <div class="cus-editor-comp">
    <Editor
      :value="props.modelValue"
      :plugins="plugins"
      @change="handleChange"
    />
  </div>
</template>

<style lang="less">
.cus-editor-comp {
}
</style>

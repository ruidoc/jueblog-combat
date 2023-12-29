<script lang="ts" setup>
import { Editor } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import hig from '@bytemd/plugin-highlight'
import zoom from '@bytemd/plugin-medium-zoom'
import zhHans from 'bytemd/locales/zh_Hans.json'
import ig from '@bytemd/plugin-mermaid'
import 'bytemd/dist/index.min.css'
import 'highlight.js/styles/vs.css'
// import 'katex/dist/katex.css'
const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', ctx: string): void
}>()
const plugins = [gfm(), hig(), zoom(), ig()]
const handleChange = (ctx: string) => {
  emit('update:modelValue', ctx)
}
</script>

<template>
  <div class="cus-editor-comp">
    <Editor
      :value="props.modelValue"
      :plugins="plugins"
      :locale="zhHans"
      @change="handleChange"
    />
  </div>
</template>

<style lang="less">
@import './index.less';
.cus-editor-comp {
  .cus-markdown-style();
}
</style>

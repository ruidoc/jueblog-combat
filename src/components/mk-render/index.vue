<script lang="ts" setup>
import showdown from 'showdown'
import showdownHighlight from 'showdown-highlight'
import 'highlight.js/lib/languages/yaml'
import { onMounted, ref } from 'vue'

showdown.setOption('tables', true)
showdown.setOption('tasklists', true)
showdown.setFlavor('github')

const props = defineProps<{
  content: string
}>()

const content = ref('')

onMounted(() => {
  let converter = new showdown.Converter({
    extensions: [
      showdownHighlight({
        pre: true,
      }),
    ],
  })
  content.value = converter.makeHtml(props.content)
})
</script>

<template>
  <article className="cus-mk-render" v-html="content"></article>
</template>

<style lang="less">
// @import '~highlight.js/styles/github.css';
.cus-mk-render {
  padding: 0 30px;
  word-break: break-word;
  line-height: 1.75;
  font-weight: 400;
  font-size: 15px;
  overflow-x: hidden;
  color: #333;
  h1 {
    font-size: 30px;
    margin-top: 35px;
    margin-bottom: 5px;
    line-height: 1.5;
    padding-bottom: 5px;
    font-weight: 700;
  }
  h2 {
    margin-top: 30px;
    padding-bottom: 12px;
    font-size: 24px;
    border-bottom: 1px solid #ececec;
  }
  h3 {
    margin-top: 35px;
    margin-bottom: 10px;
  }
  ul,
  ol {
    padding-left: 28px;
  }
  code {
    word-break: break-word;
    border-radius: 2px;
    overflow-x: auto;
    background-color: #fff5f5;
    color: #ff502c;
    font-size: 0.87em;
    padding: 0.065em 0.4em;
    font-family: Menlo, Monaco, Consolas, Courier New, monospace;
  }
  p {
    line-height: inherit;
    margin-top: 22px;
    margin-bottom: 22px;
    color: #252933;
    font-size: 16px;
  }
  pre {
    position: relative;
    font-size: 85%;
    line-height: 1.75;
    background: #f8f8f8;
    code.hljs {
      padding: 15px 12px;
      color: #333;
      margin: 0;
      word-break: normal;
      display: block;
      overflow-x: auto;
      background: transparent;
      font-size: 13px;
      font-family: Menlo, Monaco, Consolas, Courier New, monospace;
    }
  }
  img {
    max-width: 80%;
  }
}
</style>

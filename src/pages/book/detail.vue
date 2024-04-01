<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tab = ref('intro')
const props = defineProps<{
  bookinfo?: BookType
  loading?: boolean
}>()
const emit = defineEmits<{
  (e: 'onFilter', json: Record<string, string>): void
}>()

const onChange = (e: MouseEvent) => {
  let dom: any = e.target
  tab.value = dom.dataset.val
}

onMounted(() => {
  console.log('999')
})
</script>

<template>
  <div class="book-info-detail">
    <div class="cus-tabs-header">
      <ul @click="onChange">
        <li data-val="intro" :class="{ active: tab == 'intro' }">介绍</li>
        <li data-val="cata" :class="{ active: tab == 'cata' }">目录</li>
        <li data-val="common" :class="{ active: tab == 'common' }">评论</li>
      </ul>
    </div>
    <div class="info-detail">
      <div class="intro" v-if="tab == 'intro'"></div>
      <div class="catas" v-if="tab == 'cata'"></div>
      <div class="commons" v-if="tab == 'common'"></div>
    </div>
  </div>
</template>

<style lang="less">
.book-info-detail {
  background: #fff;
  border-radius: 4px;
  flex: 1;
  margin-top: 20px;
}
</style>

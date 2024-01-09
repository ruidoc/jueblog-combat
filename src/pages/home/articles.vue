<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Articles from '../article/lists.vue'

const route = useRoute()
const orderby = ref('hot')
const props = defineProps<{
  articles: ArticleType[]
  loading: boolean
}>()
const emit = defineEmits<{
  (e: 'onFilter', json: Record<string, string>): void
}>()

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
    <div class="cus-tabs-header">
      <ul @click="onFilter">
        <li data-val="hot" :class="{ active: orderby == 'hot' }">最热</li>
        <li data-val="new" :class="{ active: orderby == 'new' }">最新</li>
      </ul>
    </div>
    <Articles v-if="!loading" :articles="props.articles" />
    <div v-show="loading" style="padding: 20px">
      <el-skeleton animated />
    </div>
  </div>
</template>

<style lang="less">
.main-articles {
  background: #fff;
  border-radius: 4px;
  flex: 1;
}
</style>

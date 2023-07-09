<script setup lang="ts">
import { articleStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavComp from './nav.vue'
import Articles from './articles.vue'
import Writer from './writer.vue'
const store = articleStore()
const router = useRouter()
const route = useRoute()
const filter = ref({})
const onFilter = (json: Record<string, string>) => {
  filter.value = {
    ...filter.value,
    ...json,
  }
  router.push({
    query: filter.value,
  })
  store.getArticles(filter.value)
}
onMounted(() => {
  filter.value = route.query
  store.getCategory()
  store.getArticles(filter.value)
})
</script>

<template>
  <main class="main-box">
    <NavComp :category="store.categories" @on-filter="onFilter" />
    <div class="main-ctx">
      <Articles @on-filter="onFilter" />
      <Writer />
    </div>
  </main>
</template>

<style lang="less">
.main-box {
  display: flex;
  align-items: flex-start;
  .main-ctx {
    flex: 1;
    display: flex;
    align-items: flex-start;
  }
}
</style>

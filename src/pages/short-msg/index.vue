<script setup lang="ts">
import { shortmsgStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavComp from './nav.vue'
import ShortMsgs from './lists.vue'
import Other from './other.vue'
import { ElMessage } from 'element-plus'
const store = shortmsgStore()
const router = useRouter()
const route = useRoute()
const filter = ref({})
const loading = ref(false)
const form = ref({
  content: '',
  group: 'all',
})
const orderby = ref('hot')
const onFilter = (json: Record<string, string>) => {
  filter.value = {
    ...filter.value,
    ...json,
  }
  router.push({
    query: filter.value,
  })
  store.getShortmsgs(filter.value)
}
const tagChange = (e: MouseEvent) => {
  let dom: any = e.target
  orderby.value = dom.dataset.val
  onFilter({ orderby: orderby.value })
}
const toCreate = () => {
  loading.value = true
  store.createMsg(form.value, res => {
    loading.value = false
    if (res) {
      ElMessage.success('发布成功！')
      form.value = { content: '', group: 'all' }
      store.getShortmsgs(filter.value)
    }
  })
}
onMounted(() => {
  filter.value = route.query
  store.getGroups()
  store.getShortmsgs(filter.value)
})
</script>

<template>
  <main class="main-box">
    <NavComp :groups="store.groups" @on-filter="onFilter" />
    <div class="main-ctx">
      <div class="content-wrap">
        <div class="editor-area">
          <el-input
            v-model="form.content"
            type="textarea"
            placeholder="快来和掘友一起分享新鲜事！"
            maxlength="100"
            show-word-limit
            :rows="4"
          ></el-input>
          <div class="actions fx-b">
            <el-popover
              placement="bottom-start"
              :width="200"
              trigger="click"
              transition="none"
              :hide-after="50"
            >
              <template #reference>
                <div class="topic fx">
                  {{
                    form.group == 'all'
                      ? '请选择圈子'
                      : store.getGpLabel(form.group)
                  }}
                </div>
              </template>
              <div class="groups-pop">
                <el-radio-group v-model="form.group">
                  <el-radio label="all">--不选择圈子--</el-radio>
                  <el-radio
                    v-for="item in store.groups.slice(1)"
                    :label="item.key"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
              </div>
            </el-popover>
            <el-button
              type="primary"
              :disabled="form.content.length == 0"
              @click="toCreate"
              >发布</el-button
            >
          </div>
        </div>
        <div class="cus-tabs-header">
          <ul @click="tagChange">
            <li data-val="hot" :class="{ active: orderby == 'hot' }">最热</li>
            <li data-val="new" :class="{ active: orderby == 'new' }">最新</li>
          </ul>
        </div>
        <ShortMsgs :shortmsgs="store.shortmsgs" @on-filter="onFilter" />
      </div>
      <Other />
    </div>
  </main>
</template>

<style lang="less">
.main-box {
  display: flex;
  align-items: flex-start;
  .content-wrap {
    flex: 1;
    .cus-tabs-header {
      background: #fff;
    }
    .editor-area {
      background: #fff;
      padding: 20px;
      margin-bottom: 12px;
      border-radius: 4px;
      textarea {
        background: #f5f5f5;
        box-shadow: none;
        font-size: 15px;
        padding: 7px 12px;
        &:focus {
          box-shadow: 0 0 0 1px var(--el-color-primary) inset;
          background: #fff;
        }
      }
      .el-input__count {
        background: transparent;
        font-size: 14px;
      }
      .actions {
        margin-top: 12px;
        .topic {
          color: var(--el-color-primary);
          background: var(--bg-color2);
          padding: 4px 12px;
          border-radius: 13px;
          cursor: pointer;
        }
        button {
          width: 100px;
        }
      }
    }
  }
  .main-ctx {
    flex: 1;
    display: flex;
    align-items: flex-start;
  }
}
</style>
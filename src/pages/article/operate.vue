<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CusEditor from '@/components/cus-editior/index.vue'
import { articleStore, userStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { debounce } from '@/utils'
const ustore = userStore()
const artstore = articleStore()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const popover = ref()
const form = ref<Partial<ArticleType>>({
  title: '',
  content: '',
  category: 'all',
  intro: '',
})
const mode = ref('create')
const toPublish = () => {
  let { title, content, category, intro } = form.value
  if (!title) {
    return ElMessage.error('标题不能为空')
  }
  if (!content) {
    return ElMessage.error('文章内容不能为空')
  }
  if (!category) {
    return ElMessage.error('文章分类必选')
  }
  if (!intro) {
    return ElMessage.error('文章摘要必填')
  }
  loading.value = true
  if (form.value.status && form.value.status == 1) {
    artstore.updateArt(mode.value, form.value, () => {
      loading.value = false
      location.href = '/article/' + mode.value
    })
  } else {
    artstore.publishArt(mode.value, () => {
      loading.value = false
      location.href = '/article/' + mode.value
    })
  }
}
const ctxChange = debounce((key: 'title' | 'content') => {
  if (form.value.status && form.value.status == 1) return
  if (loading.value) return
  if (mode.value == 'create' && form.value[key]) {
    loading.value = true
    artstore.createArt(form.value, res => {
      mode.value = res._id
      router.push({ params: { tag: res._id } })
      loading.value = false
    })
  }
  if (mode.value != 'create') {
    loading.value = true
    artstore.updateArt(mode.value, form.value, () => {
      loading.value = false
    })
  }
}, 3000)
onMounted(() => {
  let tag = route.params.tag as string
  mode.value = tag
  artstore.getCategory()
  if (tag != 'create') {
    artstore.getArtDetail(tag, data => {
      // article.value = data
      form.value = data
    })
  }
})
</script>

<template>
  <div className="article-editor-page">
    <div className="top-bar fx-b">
      <input
        className="title"
        v-model="form.title"
        @input="ctxChange('title')"
        placeholder="请输入文章标题"
      />
      <div className="right-box fx">
        <span class="tip">文章将自动保存至草稿箱</span>
        <el-button class="actmo">草稿箱</el-button>
        <el-popover
          placement="bottom-end"
          :width="500"
          trigger="click"
          transition="none"
          :hide-after="50"
          ref="popover"
          popper-class="art-publish-popover"
        >
          <template #reference>
            <el-button class="actmo" type="primary">
              {{ mode == 'create' ? '发布' : '修改' }}
            </el-button>
          </template>
          <div class="p-title">
            {{ mode == 'create' ? '发布' : '修改' }}文章
          </div>
          <el-form label-width="85px">
            <el-form-item required label="分类：">
              <div
                :class="['cate-item', { active: item.key == form.category }]"
                v-for="item in artstore.categories"
                @click="form.category = item.key"
              >
                {{ item.label }}
              </div>
            </el-form-item>
            <el-form-item required label="摘要：">
              <el-input
                v-model="form.intro"
                type="textarea"
                placeholder="请输入内容摘要"
                maxlength="100"
                show-word-limit
                :rows="3"
              />
            </el-form-item>
          </el-form>
          <div class="p-footer">
            <el-button class="actmo" @click="popover.hide()">取消</el-button>
            <el-button
              class="actmo"
              :loading="loading"
              type="primary"
              @click="toPublish"
            >
              {{ mode == 'create' ? '确认发布' : '确认修改' }}
            </el-button>
          </div>
        </el-popover>
        <div class="user-wrap">
          <el-tooltip effect="dark" content="返回用户中心">
            <el-avatar :size="32">
              <img src="@/assets/avatar.png" />
            </el-avatar>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div className="main">
      <CusEditor
        v-model="form.content"
        @update:modelValue="ctxChange('content')"
      />
    </div>
  </div>
</template>

<style lang="less">
.article-editor-page {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .top-bar {
    background: #fff;
    padding: 0 27px;
    .right-box {
      margin-right: 20px;
      .tip {
        color: var(--font-color3);
        font-size: 14px;
        opacity: 0.6;
        margin-right: 16px;
      }
      .user-wrap {
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
  .title {
    height: 60px;
    margin-left: 10px;
    color: #000;
    font-weight: 500;
    font-size: 24px;
    border: none;
    outline: none;
    width: 50%;
    &:focus {
      box-shadow: none !important;
    }
  }
  .main {
    background: #fff;
    .bytemd {
      height: calc(100vh - 60px);
    }
  }
  .bytemd-editor {
    .CodeMirror {
      background: #fafbfc;
    }
  }
}
.art-publish-popover {
  padding: 0px !important;
  .p-title {
    font-size: 17px;
    padding: 16px 20px;
    font-weight: 600;
    color: var(--font-color1);
    border-bottom: 1px solid #eee;
  }
  .el-form {
    padding: 20px 20px 0 0;
    .cate-item {
      width: 88px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      cursor: pointer;
      background: var(--bg-color1);
      margin: 0 8px 10px 0;
      &.active {
        color: var(--el-color-primary);
        background: var(--bg-color2);
      }
    }
    textarea {
      border-radius: 2px;
    }
  }
  .p-footer {
    padding: 16px 20px;
    text-align: right;
    border-top: 1px solid #eee;
  }
}
</style>

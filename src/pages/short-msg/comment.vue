<template>
  <div class="msgs-comments">
    <div class="title">评论</div>
    <div class="comment-create-box fxt">
      <div class="avatar">
        <el-avatar :src="user_info?.avatar">
          <img src="@/assets/avatar.png" />
        </el-avatar>
      </div>
      <div class="editor-wrap">
        <el-input
          v-model="form.content"
          type="textarea"
          placeholder="输入评论内容！"
          maxlength="200"
          :rows="2"
        ></el-input>
        <div class="actions fx-b">
          <div class="desc">良言一句三冬暖，诚恳交流、不带情绪</div>
          <el-button
            type="primary"
            size="small"
            class="actmo"
            :disabled="form.content.length == 0"
            :loading="loading"
            @click="() => toCreate()"
            >发表评论</el-button
          >
        </div>
      </div>
    </div>
    <div class="cuscom-wrap" v-if="comments[0]">
      <div class="title sub">全部评论</div>
      <cus-comments
        :comments="comments"
        :small-size="true"
        @on-reply="toCreate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { commentStore, userStore } from '@/stores'
import { ElMessage } from 'element-plus'
import CusComments from '@/components/cus-comment/index.vue'
const { user_info } = userStore()
const loading = ref(false)
const store = commentStore()
const props = defineProps<{
  msg_id: string
  user_id: string
}>()
const form = ref<Partial<CommentType>>({
  content: '',
})
const comments = ref([])
const toCreate = (data = {}) => {
  let form_data = { ...form.value, ...data }
  if (!form_data.content) {
    return ElMessage.error('评论内容不可为空')
  }
  loading.value = true
  form_data.created_by = user_info?._id
  store.createComment(form_data, res => {
    loading.value = false
    form.value.content = ''
    getComments()
  })
}
const getComments = () => {
  store.getComments(props.msg_id, res => {
    comments.value = res
  })
}
const action_load = computed(() => store.action_load)
watch(action_load, () => {
  getComments()
})
onMounted(() => {
  form.value = {
    source_id: props.msg_id,
    source_type: 2,
    type: 'source',
    content: '',
    target_user: props.user_id,
  }
  getComments()
})
</script>

<style lang="less">
.msgs-comments {
  .title {
    font-size: 16px;
    font-weight: 600;
    margin: 15px 3px 15px;
    &.sub {
      margin: 0px 3px 17px;
    }
  }
  .avatar {
    margin-right: 16px;
  }
  .editor-wrap {
    flex: 1;
    textarea {
      background: #f5f5f5;
      box-shadow: none;
      font-size: 14px;
      padding: 7px 12px;
      &:focus {
        box-shadow: 0 0 0 1px var(--el-color-primary) inset;
        background: #fff;
      }
    }
    .actions {
      margin: 10px 0;
      .desc {
        font-size: 13px;
        color: var(--font-color3);
      }
    }
  }
  .cuscom-wrap {
    transform: scale(0.99);
    padding-top: 2px;
  }
}
</style>

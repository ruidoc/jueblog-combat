<template>
  <div class="arts-comments">
    <div class="title">评论</div>
    <div class="comment-create-box fxt">
      <div class="avatar">
        <el-avatar :src="user_info.avatar">
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
          <div class="desc">可按回车键发表评论</div>
          <el-button
            type="primary"
            :disabled="form.content.length == 0"
            @click="toCreate"
            >发表评论</el-button
          >
        </div>
      </div>
    </div>
    <div class="title">全部评论 {{ comments.length }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { commentStore, userStore } from '@/stores'
const { user_info } = userStore()
const { getComments } = commentStore()
const props = defineProps<{
  art_id: string
}>()
const form = ref({
  content: '',
  group: 'all',
})
const comments = ref([])
const toCreate = () => {
  console.log(1)
}
onMounted(() => {
  getComments(props.art_id, res => {
    comments.value = res
  })
})
</script>

<style lang="less">
.arts-comments {
  .title {
    font-size: 18px;
    line-height: 30px;
    font-weight: 600;
    margin: 12px 0 18px;
  }
  .avatar {
    margin-right: 16px;
  }
  .editor-wrap {
    flex: 1;
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
    .actions {
      margin: 10px 0;
      .desc {
        font-size: 13px;
        color: var(--font-color3);
      }
    }
  }
}
</style>

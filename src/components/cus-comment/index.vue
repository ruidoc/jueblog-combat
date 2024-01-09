<template>
  <section :class="['comment-component', { active: props.smallSize }]">
    <div
      v-for="comment in props.comments"
      :key="comment._id"
      class="par-comment fxt"
    >
      <el-avatar :size="36" :src="comment.created_by?.avatar">
        <img src="@/assets/avatar.png" />
      </el-avatar>
      <div class="ctx-wrap">
        <div class="uinfo fx">
          <span class="u">{{ comment.created_by.username }}</span>
          <span class="p">{{ comment.created_by.position }}</span>
        </div>
        <div class="content">{{ comment.content }}</div>
        <Replay
          :item="comment"
          :active="act_id"
          @on-active="b => setActive(b, comment._id)"
          @on-reply="c => toReply(c, 'comment', comment)"
        />
        <div
          v-for="item in comment.replies"
          :key="item._id"
          class="repliy-item fxt"
        >
          <el-avatar :size="28" :src="item.created_by.avatar">
            <img src="@/assets/avatar.png" />
          </el-avatar>
          <div class="ctx-wrap">
            <div class="uinfo fx">
              <span class="u">{{ item.created_by.username }}</span>
              <span v-if="item.reply_id">
                <span class="content">&nbsp;回复&nbsp;</span>
                <span class="u">{{
                  whoReoly(item.reply_id, comment.replies)
                }}</span>
              </span>
              <span class="content">：{{ item.content }}</span>
            </div>
            <Replay
              :item="item"
              :active="act_id"
              @on-active="b => setActive(b, item._id)"
              @on-reply="c => toReply(c, 'reply', item, comment._id)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Replay from './replay.vue'
const act_id = ref('')
const props = defineProps<{
  comments: CommentResultType[]
  smallSize?: boolean
}>()
const emit = defineEmits<{
  (e: 'onReply', json: Partial<CommentType>): void
}>()
const toReply = (
  content: string,
  type: string,
  item: CommentRepliyType,
  parent_id?: string
) => {
  console.log(content)
  let form: any = {
    type,
    content,
    parent_id: parent_id || item._id,
    target_user: item.created_by._id,
  }
  if (type == 'reply') {
    form.reply_id = item._id
  }
  emit('onReply', form)
  setTimeout(() => {
    act_id.value = ''
  }, 600)
}
const setActive = (bool: boolean, id: string) => {
  act_id.value = bool ? id : ''
}
const whoReoly = (rid: string, replies: any[]) => {
  let one = replies.find(row => row._id == rid)
  return one ? one.created_by.username : '未知'
}
</script>

<style lang="less">
.comment-component {
  .par-comment {
    margin-bottom: 23px;
    .ctx-wrap {
      flex: 1;
      margin-left: 16px;
    }
    .uinfo {
      .u {
        font-size: 16px;
        line-height: 24px;
        color: var(--font-color2);
        cursor: pointer;
      }
      .p {
        font-size: 14px;
        line-height: 22px;
        color: var(--font-color3);
        margin-left: 12px;
      }
    }
    .content {
      font-size: 16px;
      line-height: 32px;
      margin: 4px 0;
    }
    .repliy-item {
      margin-top: 7px;
      .ctx-wrap {
        margin-left: 12px;
      }
      .el-avatar {
        margin-top: 5px;
      }
    }
  }
  &.active .par-comment {
    .uinfo {
      .u {
        font-size: 14px;
        line-height: 22px;
      }
      .p {
        font-size: 12px;
      }
    }
    .content {
      font-size: 14px;
      line-height: 26px;
    }
  }
}
</style>

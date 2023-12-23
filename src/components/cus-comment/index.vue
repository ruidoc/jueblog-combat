<template>
  <section class="comment-component">
    <div v-for="comment in props.comments" class="par-comment">
      <el-avatar :size="36">
        <img src="@/assets/avatar.png" />
      </el-avatar>
      <div class="ctx-wrap">
        <div class="uinfo">
          <span class="u">{{ comment.created_by.username }}</span>
          <span class="p">{{ comment.created_by.position }}</span>
        </div>
        <div class="content">{{ comment.content }}</div>
        <div class="handle">
          <span>{{ getTimer(comment.created_at) }}</span>
          <span
            :class="['repbtn', { active: act_id == comment._id }]"
            @click="toReply(comment._id)"
            >{{ act_id == comment._id ? '取消回复' : '回复' }}</span
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { getTimer } from '@/utils'
import { ref } from 'vue'
const act_id = ref('')
const props = defineProps<{
  comments: CommentResultType[]
}>()
const toReply = (_id: string) => {
  if (act_id.value == _id) {
    act_id.value = ''
  } else {
    act_id.value = _id
  }
}
</script>

<style lang="less">
.comment-component {
  .par-comment {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
    .ctx-wrap {
      flex: 1;
      margin-left: 16px;
    }
    .uinfo {
      display: flex;
      align-items: center;
      .u {
        font-size: 16px;
        line-height: 24px;
        color: var(--font-color2);
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
      line-height: 28px;
      margin: 4px 0;
    }
    .handle {
      font-size: 13px;
      color: var(--font-color3);
      .repbtn {
        margin-left: 12px;
        cursor: pointer;
        &:hover {
          color: var(--el-color-primary);
        }
        &.active {
          color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>

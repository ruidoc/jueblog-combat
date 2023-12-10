<script setup lang="ts">
import { messageStore, userStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTimer } from '@/utils'
const route = useRoute()
const router = useRouter()
const store = messageStore()
const { toggleFollow } = userStore()

const type = ref('1')
const comments = ref([])
const praises = ref([])
const follows = ref([])
const onChange = (e: MouseEvent) => {
  let dom: any = e.target
  if (dom.tagName != 'LI') return
  type.value = dom.dataset.val
  if (type.value != '1') {
    router.push({
      query: { type: type.value },
    })
  } else {
    router.push('/messages')
  }
  getMessage()
}
const toLink = (id: string, tar: 1 | 2) => {
  let prex = tar == 1 ? '/user/' : '/article/'
  window.open(prex + id)
}
const toFollow = (row: any) => {
  let { fans_id } = row
  toggleFollow({ user_id: fans_id }, res => {
    row.is_follow = !row.is_follow
  })
}
const getMessage = () => {
  if (type.value == '1') {
    store.getComment(res => {
      comments.value = res.data
    })
  }
  if (type.value == '2') {
    store.getPraises(res => {
      praises.value = res.data
    })
  }
  if (type.value == '3') {
    store.getFollows(res => {
      follows.value = res.data
    })
  }
}

onMounted(() => {
  let rtype = route.query.type as string
  if (!rtype) {
    type.value = '1'
  } else {
    type.value = rtype
  }
  getMessage()
})
</script>

<template>
  <div class="message-page">
    <div class="banner-box">
      <ul class="fx" @click="onChange">
        <li data-val="1" :class="['hover', { active: type == '1' }]">
          评论
          <el-badge
            :value="store.msgInfo.comment"
            :hidden="store.msgInfo.comment == 0"
          />
        </li>
        <li data-val="2" :class="['hover', { active: type == '2' }]">
          赞和收藏
          <el-badge
            :value="store.msgInfo.praise"
            :hidden="store.msgInfo.praise == 0"
          />
        </li>
        <li data-val="3" :class="['hover', { active: type == '3' }]">
          新增粉丝
          <el-badge
            :value="store.msgInfo.follow"
            :hidden="store.msgInfo.follow == 0"
          />
        </li>
      </ul>
    </div>
    <div class="msgs-box">
      <div class="msgs-list" v-if="type == '1'">
        <div v-for="item in comments" class="msg-item fxt">
          <el-avatar :size="45">
            <img src="@/assets/avatar.png" />
          </el-avatar>
          <div class="msg-infos">
            <div class="udesc">
              <span class="u" @click="toLink(item.created_by, 1)">{{
                item.user.username
              }}</span>
              <span
                >{{ item.type == 'source' ? '评论了你的' : '回复了你在'
                }}{{ item.source_type == 1 ? '文章' : '沸点' }}</span
              >
              <span
                v-if="item.source_type == 1"
                class="source"
                @click="toLink(item.source_id, 2)"
              >
                {{ item.article.title }}
              </span>
              <span v-else>沸点</span>
              <span v-if="item.type != 'source'">下的评论</span>
            </div>
            <div class="content">{{ item.content }}</div>
            <div class="time">{{ getTimer(item.created_at) }}</div>
          </div>
        </div>
      </div>
      <div class="msgs-list" v-if="type == '2'">
        <div v-for="item in praises" class="msg-item border fxt">
          <el-avatar :size="45">
            <img src="@/assets/avatar.png" />
          </el-avatar>
          <div class="msg-infos">
            <div class="udesc">
              <span class="u" @click="toLink(item.created_by, 1)">{{
                item.user.username
              }}</span>
              <span
                >{{ item.type == 1 ? '赞' : '收藏' }}了你的{{
                  item.target_type == 1 ? '文章' : '沸点'
                }}</span
              >
              <span
                v-if="item.target_type == 1"
                class="source"
                @click="toLink(item.target_id, 2)"
              >
                {{ item.article.title }}
              </span>
              <span v-else>沸点</span>
            </div>
            <div class="time">{{ getTimer(item.created_at) }}</div>
          </div>
        </div>
      </div>
      <div class="msgs-list" v-if="type == '3'">
        <div v-for="item in follows" class="msg-item border fxt">
          <el-avatar :size="45">
            <img src="@/assets/avatar.png" />
          </el-avatar>
          <div class="msg-infos">
            <div class="udesc">
              <span class="u" @click="toLink(item.fans_id, 1)">{{
                item.fans_info.username
              }}</span>
              <span>关注了你</span>
            </div>
            <div class="time">{{ getTimer(item.created_at) }}</div>
          </div>
          <el-button
            :type="item.is_follow ? 'default' : 'primary'"
            plain
            @click="toFollow(item)"
            >{{ item.is_follow ? '已关注' : '关注' }}</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.message-page {
  margin-top: 46px;
  .banner-box {
    height: 46px;
    background: #fff;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    ul {
      width: 1200px;
      margin: auto;
      li {
        line-height: 46px;
        margin-right: 36px;
        font-size: 14px;
        .el-badge {
          transform: translateY(2px) scale(0.8);
        }
      }
    }
  }
  .msgs-box {
    width: 960px;
    margin: auto;
  }
  .msgs-list {
    .msg-item {
      background: #fff;
      margin-bottom: 10px;
      padding: 20px;
      position: relative;
      .msg-infos {
        flex: 1;
        margin-left: 22px;
        font-size: 15px;
        color: var(--font-color3);
        .udesc {
          margin-bottom: 10px;
          .u {
            font-weight: 600;
            color: #000;
            cursor: pointer;
            margin-right: 6px;
          }
          .source {
            color: var(--el-color-primary);
            cursor: pointer;
            padding: 0 6px;
          }
        }
        .content {
          padding: 10px;
          background: #f2f3f5;
          border: 1px solid #ddd;
          margin: 0 20px 10px 0;
        }
      }
      &.border {
        margin-bottom: 0;
        &::after {
          content: '';
          position: absolute;
          left: 25px;
          right: 25px;
          bottom: 0;
          height: 1px;
          background: var(--border-color);
        }
      }
      .el-button {
        width: 100px;
        &--none {
          background: #f2f3f5;
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { userStore, articleStore, shortmsgStore } from '@/stores'
import { Ticket, UserFilled } from '@element-plus/icons-vue'
import Articles from '@/pages/article/lists.vue'
import ShortMsgs from '@/pages/short-msg/lists.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const { user_info, getUser, toggleFollow, checkFollow } = userStore()
const { getArticles } = articleStore()
const { getShortmsgs } = shortmsgStore()
const route = useRoute()
const curuser = ref<UserType | null>(null)
const tab = ref('article')
const is_follow = ref(false)
const articles = ref({
  meta: null,
  data: [],
})
const short_msgs = ref({
  meta: null,
  data: [],
})
const uid = ref(null)
const onChange = (e: MouseEvent) => {
  let dom: any = e.target
  tab.value = dom.dataset.val
  getData()
}
const toFollow = () => {
  toggleFollow({ user_id: uid.value }, res => {
    is_follow.value = !is_follow.value
  })
}
const getData = () => {
  if (tab.value == 'article') {
    getArticles({ created_by: uid.value }, res => {
      articles.value = res
    })
  }
  if (tab.value == 'shortmsg') {
    getShortmsgs({ created_by: uid.value }, res => {
      short_msgs.value = res
    })
  }
}
onMounted(() => {
  let { id } = route.params
  uid.value = id as string
  getUser(uid.value, res => {
    curuser.value = res
    getData()
    if (user_info) {
      checkFollow(uid.value, res => {
        is_follow.value = res
      })
    }
  })
})
</script>

<template>
  <section class="user-page fx">
    <div class="content-panel">
      <div class="basic fx panel" v-if="curuser">
        <el-avatar :size="90" :src="curuser.avatar">
          <img src="@/assets/avatar.png" />
        </el-avatar>
        <div class="uinfo-wrap">
          <div class="row-name">
            <h2>{{ curuser.username }}</h2>
          </div>
          <div class="row-intro">
            <span class="fx">
              <el-icon :size="18"><UserFilled /></el-icon>
              <span>
                {{ curuser.position || '程序员' }} |
                {{ curuser.company || '某厂' }}
              </span>
            </span>
          </div>
          <div class="row-intro fx-b">
            <span class="fxt">
              <el-icon :size="18"><Ticket /></el-icon>
              <span class="intro">{{ curuser.introduc }}</span>
            </span>
            <router-link
              to="/setting/user"
              v-if="user_info?._id == uid"
              class="edit-btn"
              >设置</router-link
            >
            <el-button
              v-else
              @click="toFollow"
              type="primary"
              :plain="is_follow"
              >{{ is_follow ? '已关注' : '关注' }}</el-button
            >
          </div>
        </div>
      </div>
      <div class="datainfo panel">
        <div class="cus-tabs-header">
          <ul @click="onChange">
            <li data-val="article" :class="{ active: tab == 'article' }">
              文章
            </li>
            <li data-val="shortmsg" :class="{ active: tab == 'shortmsg' }">
              沸点
            </li>
          </ul>
        </div>
        <Articles v-if="tab == 'article'" :articles="articles.data" />
        <ShortMsgs v-if="tab == 'shortmsg'" :shortmsgs="short_msgs.data" />
      </div>
    </div>
    <div class="other-panel" v-if="curuser">
      <div class="achieve panel">
        <h3 class="achi-title">个人成就</h3>
        <div class="achi-body">
          <div class="row fx">
            <span class="icarea">
              <span class="iconfont icon-zan2 izan" />
            </span>
            <span
              >文章被点赞<span class="n">{{ curuser.good_num }}</span></span
            >
          </div>
          <div class="row fx">
            <span class="icarea">
              <span class="iconfont icon-view2" />
            </span>
            <span
              >文章被阅读<span class="n">{{ curuser.read_num }}</span></span
            >
          </div>
          <div class="row fx">
            <span class="icarea">
              <span class="iconfont icon-zan2 izan" />
            </span>
            <span
              >掘力值<span class="n">{{ curuser.jue_power }}</span></span
            >
          </div>
        </div>
      </div>
      <div class="follow fx panel">
        <div class="text-wrap">
          <div>关注了</div>
          <span>{{ curuser.follow_num }}</span>
        </div>
        <div class="text-wrap">
          <div>关注者</div>
          <span>{{ curuser.fans_num }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="less">
.user-page {
  width: 960px;
  margin: auto;
  align-items: flex-start;
  .content-panel {
    flex: 1;
    .basic {
      padding: 30px;
      align-items: self-start;
    }
    .uinfo-wrap {
      margin-left: 28px;
      flex: 1;
      .row-name {
        margin-bottom: 12px;
        h2 {
          font-size: 20px;
        }
      }
      .row-intro {
        margin-bottom: 8px;
        color: #72777b;
        font-size: 14px;
        .el-icon {
          margin: 3px 10px 0 0;
        }
        .intro {
          line-height: 23px;
        }
        .fxt {
          max-width: 72%;
        }
        .edit-btn {
          width: 100px;
          color: #007fff;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          border: 1px solid #007fff;
          border-radius: 4px;
          padding: 4px 0;
          cursor: pointer;
          margin-left: 15px;
          &:hover {
            opacity: 0.8;
          }
        }
        button {
          width: 100px;
        }
      }
    }
  }
  .other-panel {
    width: 240px;
    margin-left: 14px;
    .achieve {
      .achi-title {
        padding: 14px 16px;
        border-bottom: 1px solid #f0f0f0;
        font-size: 16px;
        color: #31445b;
      }
      .achi-body {
        padding: 11px 16px;
        .row {
          line-height: 35px;
          .n {
            color: #000;
            padding-left: 10px;
            font-weight: 500;
          }
        }
        span {
          font-size: 15px;
          color: var(--font-color1);
        }
        .icarea {
          background: rgba(30, 128, 255, 0.1);
          width: 25px;
          height: 25px;
          border-radius: 50%;
          text-align: center;
          line-height: 25px;
          margin-right: 1rem;
          .iconfont {
            color: rgba(30, 128, 255, 0.5);
            font-size: 18px;
            &.izan {
              font-size: 15px;
            }
          }
        }
      }
    }
    .follow {
      .text-wrap {
        flex: 1;
        text-align: center;
        margin: 16px 0;
        font-size: 16px;
        font-weight: 500;
        color: #31445b;
        &:first-child {
          border-right: 1px solid #f0f0f0;
        }
        span {
          display: inline-flex;
          font-size: 15px;
          margin-top: 4px;
        }
      }
    }
  }
  .panel {
    background: #fff;
    margin-bottom: 14px;
  }
}
</style>

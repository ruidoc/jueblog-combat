<script setup lang="ts">
import { articleStore, userStore } from '@/stores'
import { useRoute } from 'vue-router'
import { nextTick, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import MkRender from '@/components/mk-render/index.vue'
import Comment from './comment.vue'
import { debounce } from '@/utils'
const route = useRoute()
const store = articleStore()
const ustore = userStore()
const article = ref<ArticleType | null>(null)
const directs = ref([])
const actd = ref('')
const is_follow = ref(false)

const toEdit = () => {
  window.open('/operate/' + article.value._id)
}
const toUser = () => {
  window.open('/user/' + article.value.user._id)
}
const toFollow = () => {
  let user_id = article.value.created_by
  ustore.toggleFollow({ user_id }, res => {
    is_follow.value = !is_follow.value
  })
}
const toPraiseOrStart = (type: 1 | 2) => {
  let { _id, created_by } = article.value
  let form = {
    target_id: _id,
    target_user: created_by,
    type,
  }
  store.togglePraise(form, bool => {
    if (type == 1) {
      article.value.is_praise = bool
      article.value.praises += bool ? 1 : -1
    } else {
      article.value.is_start = bool
      article.value.stars += bool ? 1 : -1
    }
  })
}
const scrollView = (name: string, idclass = true) => {
  name = name.replace(/\./g, '-').replace(/ /g, '')
  let dom: Element
  if (idclass) {
    dom = document.querySelector(`.${name}`)
  } else {
    dom = document.getElementById(name)
  }
  dom.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const onScroll = (e: Event) => {
  let res = directs.value.find(d => d.top > window.scrollY)
  if (res) {
    actd.value = res.key
  } else {
    actd.value = directs.value[0]
      ? directs.value[directs.value.length - 1].key
      : ''
  }
  // console.log('滚动：', res)
}

onMounted(() => {
  let { id } = route.params
  store.getArtDetail(id as string, data => {
    article.value = data
    let dirs = data.content.match(/#{1,}.*/g) || []
    let index = 0
    if (dirs.every(d => d.includes('##'))) {
      index++
    }
    if (dirs.every(d => d.includes('###'))) {
      index++
    }
    if (dirs.every(d => d.includes('####'))) {
      index++
    }
    let rdirs: any[] = []
    nextTick(() => {
      rdirs = dirs.map(d => ({
        key: d.replace(/#{1,}/g, '').trim(),
        tab: d.search(/#(?!#)/) - index,
        top: document
          .getElementById(
            `${d
              .replace(/#{1,}/g, '')
              .replace(/ /g, '')
              .replace(/\./g, '-')
              .trim()}`
          )
          ?.getBoundingClientRect().top,
      }))
      console.log('目录：', rdirs)
      actd.value = rdirs[0]?.key || ''
      directs.value = rdirs
    })
    if (ustore.user_info) {
      ustore.checkFollow(data.created_by, res => {
        is_follow.value = res
      })
    }
  })
  window.addEventListener('scroll', onScroll)
  return () => {
    window.removeEventListener('scroll', onScroll)
  }
})
</script>

<template>
  <div class="article-detail-page">
    <div class="handle-box" v-if="article">
      <div
        :class="['icon-act fx-c', { active: article && article.is_praise }]"
        @click="toPraiseOrStart(1)"
      >
        <el-badge :value="article.praises" :hidden="article.praises == 0">
          <span class="iconfont icon-zan2 izan"></span>
        </el-badge>
      </div>
      <div class="icon-act fx-c" @click="scrollView('comment-wrap')">
        <el-badge :value="article.comments" :hidden="article.comments == 0">
          <span class="iconfont icon-wenda2"></span>
        </el-badge>
      </div>
      <div
        :class="['icon-act fx-c', { active: article && article.is_start }]"
        @click="toPraiseOrStart(2)"
      >
        <el-badge :value="article.stars" :hidden="article.stars == 0">
          <span class="iconfont icon-xing"></span>
        </el-badge>
      </div>
    </div>
    <div class="main-box fx">
      <div class="content-panel">
        <div class="content" v-if="article">
          <h1 className="art-title">{{ article.title }}</h1>
          <div className="options fx">
            <span className="uname hover" @click="toUser">{{
              article.user.username
            }}</span>
            <span className="time">
              {{ dayjs(article.created_at).format('YYYY-MM-DD HH:mm') }}
            </span>
            <span class="fx">
              <span class="iconfont icon-liulan"></span>
              &nbsp;{{ article.page_view }}
            </span>
            <a
              className="edit"
              v-if="ustore.user_info?._id == article.user._id"
              @click="toEdit"
              >编辑</a
            >
          </div>
          <MkRender :content="article.content" />
        </div>
        <div class="content comment-wrap" v-if="article">
          <Comment
            :art_id="article._id"
            :user_id="article.user._id"
            :count="article.comments"
          />
        </div>
      </div>
      <div class="other-panel">
        <div class="user-pan pan" v-if="article">
          <div class="user fx" @click="toUser">
            <el-avatar :size="48" :src="article.user.avatar">
              <img src="@/assets/avatar.png" />
            </el-avatar>
            <div class="rcolum">
              <div class="name">{{ article.user.username }}</div>
              <div class="oinfo">
                <span>{{ article.user.position }}</span>
              </div>
            </div>
          </div>
          <div
            class="btn-wrap fx-b"
            v-if="article.created_by != ustore.user_info?._id"
          >
            <el-button type="primary" @click="toFollow" plain>{{
              is_follow ? '已关注' : '关注'
            }}</el-button>
          </div>
          <div class="count-info">
            <div class="row fx">
              <span class="icarea">
                <span class="iconfont icon-zan2 izan" />
              </span>
              <span>获得点赞 &nbsp;{{ article.user.good_num }}</span>
            </div>
            <div class="row fx">
              <span class="icarea">
                <span class="iconfont icon-view2" />
              </span>
              <span>文章被阅读 &nbsp;{{ article.user.read_num }}</span>
            </div>
          </div>
        </div>
        <div class="direct-pan pan">
          <div class="title">目录</div>
          <ul>
            <template v-for="item in directs" :key="item">
              <li
                :class="{ active: actd == item.key }"
                @click="scrollView(item.key, false)"
              >
                {{ item.key }}
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.article-detail-page {
  position: relative;
  .handle-box {
    position: fixed;
    top: 140px;
    left: calc(50vw - 654px);
    .icon-act {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.04);
      color: var(--font-color3);
      cursor: pointer;
      margin-bottom: 20px;
      .iconfont {
        font-size: 20px;
        padding: 0 12px;
      }
      .el-badge__content {
        border: none;
        height: 16px;
        top: -5px;
        background: #c2c8d1;
      }
      &:hover {
        color: var(--font-color2);
      }
      &.active {
        color: var(--el-color-primary);
        .el-badge__content {
          background: var(--el-color-primary);
        }
      }
    }
  }
  .main-box {
    position: relative;
    width: 1140px;
    margin: 0 auto 80px auto;
    box-sizing: border-box;
    align-items: flex-start;
    .content-panel {
      flex: 1;
      .content {
        background: #fff;
        overflow: hidden;
        border-radius: 4px;
        .art-title {
          font-size: 32px;
          margin: 30px 30px 20px 30px;
          font-weight: 700;
        }
        .options {
          margin: 0 30px;
          font-size: 14px;
          color: var(--font-color3);
          .uname {
            font-weight: 500;
          }
          .time {
            margin: 0 16px;
          }
          .edit {
            cursor: pointer;
            margin-left: 16px;
          }
        }
      }
      .comment-wrap {
        margin-top: 20px;
        padding: 8px 32px;
      }
    }
    .other-panel {
      margin-left: 20px;
      width: 300px;
      position: sticky;
      top: 80px;
      .pan {
        background: #fff;
        border-radius: 4px;
        padding: 16px 20px;
        margin-bottom: 20px;
      }
      .user-pan {
        .user {
          cursor: pointer;
        }
        .rcolum {
          margin-left: 16px;
        }
        .name {
          font-size: 16px;
          font-weight: 500;
        }
        .oinfo {
          font-size: 14px;
          color: var(--font-color2);
          margin-top: 4px;
        }
        .btn-wrap {
          margin-top: 20px;
          button {
            width: 100%;
          }
        }
      }
      .count-info {
        margin-top: 20px;
        .row {
          margin-top: 8px;
        }
        span {
          font-size: 14px;
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
      .direct-pan {
        .title {
          font-size: 16px;
          font-weight: 500;
          padding-bottom: 12px;
          border-bottom: 1px solid #e4e6eb;
        }
        ul {
          margin-top: 12px;
          li {
            font-size: 14px;
            padding: 6px 0px;
            cursor: pointer;
            position: relative;
            &::after {
              content: '';
              position: absolute;
              top: 28%;
              bottom: 28%;
              left: -20px;
              width: 3px;
              border-radius: 2px;
            }
            &.active {
              color: var(--el-color-primary);
              &::after {
                background: var(--el-color-primary);
              }
            }
            &:hover {
              color: var(--el-color-primary);
              // &::after {
              //   background: var(--el-color-primary);
              // }
            }
          }
        }
      }
    }
  }
}
</style>

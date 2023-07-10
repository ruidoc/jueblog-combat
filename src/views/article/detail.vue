<script setup lang="ts">
import { articleStore, userStore } from '@/stores'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import MkRender from '@/components/mk-render/index.vue'
const route = useRoute()
const store = articleStore()
const ustore = userStore()
const article = ref<ArticleType | null>(null)
const directs = ref([])

const toEdit = () => {
  window.open('/operate/' + article.value._id)
}
const toUser = () => {
  window.open('/user/' + article.value.user._id)
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

onMounted(() => {
  let { id } = route.params
  store.getArtDetail(id as string, data => {
    article.value = data
    directs.value = data.content.match(/#{1,2}.*/g)
  })
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
      <div class="icon-act fx-c">
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
          <div className="options">
            <span className="uname">{{ article.user.username }}</span>
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
      </div>
      <div class="other-panel">
        <div class="user-pan pan" v-if="article">
          <div class="fx" @click="toUser">
            <el-avatar :size="48">
              <img src="@/assets/avatar.png" />
            </el-avatar>
            <div class="rcolum">
              <div class="name">{{ article.user.username }}</div>
              <div class="oinfo">
                <span>{{ article.user.position }}</span>
              </div>
            </div>
          </div>
          <div class="btn-wrap fx-b">
            <el-button type="primary" plain>关注</el-button>
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
            <template v-for="item in directs">
              <li v-if="item.includes('##')">
                &nbsp;{{ item.trim().slice(2) }}
              </li>
              <li v-else>{{ item.trim().slice(1) }}</li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.article-detail-page {
  .handle-box {
    position: fixed;
    top: 140px;
    left: 5.5rem;
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
    margin: 0 auto;
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
          display: flex;
          align-items: center;
          margin: 0 30px;
          font-size: 14px;
          color: var(--font-color3);
          .uname {
            font-weight: 500;
            cursor: pointer;
            color: var(--font-color2);
            &:hover {
              color: var(--el-color-primary);
            }
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
    }
    .other-panel {
      margin-left: 20px;
      width: 300px;
      .pan {
        background: #fff;
        border-radius: 4px;
        padding: 16px 20px;
        margin-bottom: 20px;
      }
      .user-pan {
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
            &:hover {
              color: var(--el-color-primary);
              &::after {
                background: var(--el-color-primary);
              }
            }
          }
        }
      }
    }
  }
}
</style>

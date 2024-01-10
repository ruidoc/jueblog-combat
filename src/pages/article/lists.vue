<script setup lang="ts">
import { articleStore, userStore } from '@/stores'
import { cusConfirm, getTimer } from '@/utils'
import { ElMessage } from 'element-plus'
const store = articleStore()
const ustore = userStore()
const props = defineProps<{
  articles: ArticleType[]
}>()
const toDetail = (item: ArticleType) => {
  window.open('/article/' + item._id)
}
const toDelete = (id: string) => {
  cusConfirm('确认删除文章？删除后不可恢复', () => {
    store.deleteArt(id, () => {
      let index = props.articles.findIndex(r => r._id == id)
      if (index >= 0) {
        props.articles.splice(index, 1)
      }
      ElMessage.success('已删除')
    })
  })
}
</script>

<template>
  <div class="article-lists">
    <div
      class="arts-item"
      v-for="item in props.articles"
      @click="toDetail(item)"
    >
      <div class="art-meta fx">
        {{ item.user.username }} <i /> {{ getTimer(item.created_at) }}<i />{{
          store.getCateLabel(item.category)
        }}
      </div>
      <div class="artctx-wrapper">
        <div class="info-wrap">
          <h3>{{ item.title }}</h3>
          <p>{{ item.intro }}</p>
          <div class="handle fx">
            <span class="row">
              <span class="iconfont icon-liulan"></span>
              {{ item.page_view }}
            </span>
            <span class="row zan">
              <span class="iconfont icon-zan"></span>
              {{ item.praises || '点赞' }}
            </span>
            <span class="row">
              <span class="iconfont icon-wenda"></span>
              {{ item.comments || '评论' }}
            </span>
            <el-dropdown
              v-if="item.user?._id == ustore.user_info?._id"
              trigger="hover"
              @command="toDelete(item._id)"
            >
              <span class="icon-wrap">
                <el-icon :size="14"><MoreFilled /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="img-wrap"></div>
      </div>
    </div>
    <el-empty
      v-if="props.articles.length == 0"
      :image-size="100"
      description="暂无内容"
    ></el-empty>
  </div>
</template>

<style lang="less">
.article-lists {
  .arts-item {
    padding: 12px 20px 0;
    cursor: pointer;
    &:hover {
      background: var(--bg-color1);
    }
    .art-meta {
      color: var(--font-color3);
      font-size: 13px;
      line-height: 22px;
      i {
        display: inline-flex;
        height: 12px;
        width: 1px;
        background: #e4e6eb;
        margin: 0 12px;
      }
    }
    .artctx-wrapper {
      padding: 10px 0 12px 0;
      border-bottom: 1px solid var(--border-color);
      h3 {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 8px;
      }
      p {
        font-size: 13px;
        margin: 8px 0;
        line-height: 22px;
        color: var(--font-color3);
      }
      .handle {
        .row {
          display: inline-flex;
          align-items: center;
          margin-right: 20px;
          color: var(--font-color3);
          font-size: 13px;
          line-height: 20px;
          .iconfont {
            font-size: 17px;
            margin-right: 2px;
          }
          &:hover {
            color: var(--el-color-primary);
          }
          &.zan {
            .iconfont {
              font-size: 15px;
            }
          }
        }
        .icon-wrap {
          color: #8a919f;
          outline: none !important;
          margin-left: 10px;
          &:hover {
            color: var(--el-color-primary);
          }
        }
      }
    }
  }
}
</style>

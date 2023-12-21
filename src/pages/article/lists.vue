<script setup lang="ts">
import { articleStore } from '@/stores'
import { getTimer } from '@/utils'
const store = articleStore()
const props = defineProps<{
  articles: any[]
}>()
const toDetail = (item: any) => {
  window.open('/article/' + item._id)
}
</script>

<template>
  <div class="article-lists">
    <div
      class="arts-item"
      v-for="item in props.articles"
      @click="toDetail(item)"
    >
      <div class="art-meta">
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
      display: flex;
      align-items: center;
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
      }
    }
  }
}
</style>

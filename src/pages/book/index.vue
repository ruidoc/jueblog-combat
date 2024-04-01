<script setup lang="ts">
import { bookStore, userStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Detail from './detail.vue'
const store = bookStore()
const { user_info } = userStore()
const toUser = () => {
  window.open('/user/' + user_info?._id)
}
onMounted(() => {
  console.log('初始化')
})
</script>

<template>
  <section class="books-page">
    <div class="fx brief">
      <div class="img-wrap fx">
        <img src="/book.png" class="fill" />
      </div>
      <div class="ctx-wrap">
        <h3>前端开发实战派</h3>
        <div class="desc">
          配套视频教学！由浅入深从根上理解可视化搭建这回事，紧贴业务设计符合业务需要的搭建体系。
        </div>
        <div class="uinfo fx">
          <div class="fx ubase" @click="toUser">
            <el-avatar :size="26" :src="user_info?.avatar">
              <img src="@/assets/avatar.png" />
            </el-avatar>
            <span>{{ user_info?.username }}</span>
          </div>
          <span class="usesc">{{ user_info?.position }}</span>
        </div>
        <div class="actions fx-b">
          <div class="ac-btns">
            <el-button type="primary" size="large">继续阅读</el-button>
          </div>
          <div class="ac-info">
            <span>1234 人已购买</span> /<span>12 小节</span>/
            <span>约 5 个小时</span>
          </div>
        </div>
      </div>
    </div>
    <Detail />
  </section>
</template>

<style lang="less">
.books-page {
  width: 800px;
  margin: 2px auto;
  .brief {
    padding: 20px;
    border-radius: 4px;
    align-items: stretch;
    .box-wrap();
    .img-wrap {
      width: 120px;
      height: 182px;
      padding: 0 6px;
      margin-right: 20px;
      background: #eee;
      border-radius: 3px;
    }
    .ctx-wrap {
      flex: 1;
      h3 {
        font-size: 24px;
        font-weight: 700;
        color: var(--font-color1);
        cursor: pointer;
        &:hover {
          color: var(--el-color-primary);
        }
      }
      .desc {
        font-size: 14px;
        margin-top: 10px;
        min-height: 35px;
        line-height: 20px;
        color: var(--font-color3);
      }
      .uinfo {
        color: var(--font-color2);
        font-size: 14px;
        .ubase {
          margin-right: 13px;
          cursor: pointer;
          span {
            margin: 0 3px;
          }
        }
      }
      .actions {
        margin-top: 37px;
        .ac-btns {
          button {
            height: 40px;
            width: 110px;
          }
        }
        .ac-info {
          font-size: 14px;
          color: var(--font-color2);
          span {
            margin: 0 6px;
          }
        }
      }
    }
  }

  // 公共样式
  .fill {
    max-width: 100%;
    max-height: 100%;
  }
  .box-wrap {
    background: #fff;
    border-radius: 4px;
    padding: 20px;
  }
}
</style>

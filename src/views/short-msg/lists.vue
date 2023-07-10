<script setup lang="ts">
import { shortmsgStore } from '@/stores'
import { MoreFilled } from '@element-plus/icons-vue'
import { getTimer } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus'
const store = shortmsgStore()
const toUser = (id: string) => {
  window.open('/user/' + id)
}
const props = defineProps<{
  shortmsgs: ShortMsgType[]
}>()
const emit = defineEmits<{
  (e: 'onFilter', json: Record<string, string>): void
}>()
const toDelete = (id: string) => {
  ElMessageBox.confirm('确认删除沸点？', '操作提醒', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    store.removeMsg(id, () => {
      ElMessage.success('已删除')
      emit('onFilter', {})
    })
  })
}
</script>

<template>
  <div class="shortmsg-lists">
    <div class="msgs-item" v-for="item in props.shortmsgs">
      <div class="pad-wrap">
        <div class="user-meta fx">
          <el-avatar :size="48">
            <img src="@/assets/avatar.png" />
          </el-avatar>
          <div class="desc-area">
            <h3 @click="toUser(item.user._id)">{{ item.user.username }}</h3>
            <span class="desc fx">
              {{ item.user.position || '程序员' }} <i />
              {{ getTimer(item.created_at) }}</span
            >
          </div>
          <div class="action">
            <el-dropdown trigger="click" @command="toDelete(item._id)">
              <span class="icon-wrap">
                <el-icon><MoreFilled /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="content-box">
          <p>{{ item.content }}</p>
        </div>
      </div>
      <div class="artion-wrap fx">
        <span class="row fx-c">
          <span class="iconfont icon-liulan"></span>
          <span>分享</span>
        </span>
        <span class="row fx-c">
          <span class="iconfont icon-wenda"></span>
          <span>{{ item.comments || '评论' }}</span>
        </span>
        <span class="row fx-c zan">
          <span class="iconfont icon-zan"></span>
          <span>{{ item.praises || '点赞' }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.shortmsg-lists {
  flex: 1;
  background: #f5f5f5;
  .msgs-item {
    background: #fff;
    border-radius: 4px;
    margin-bottom: 8px;
    .pad-wrap {
      padding: 20px 20px 12px;
    }
    .user-meta {
      color: var(--font-color3);
      font-size: 14px;
      line-height: 24px;
      .desc-area {
        flex: 1;
        margin-left: 12px;
        h3 {
          line-height: 28px;
          font-size: 16px;
          cursor: pointer;
        }
        i {
          display: inline-flex;
          height: 2px;
          width: 2px;
          background: var(--font-color3);
          margin: 0 5px;
        }
      }
      .action {
        .icon-wrap {
          cursor: pointer;
          .el-icon {
            transform: rotate(90deg);
            color: #888;
          }
        }
      }
    }
    .content-box {
      margin: 8px 0 0 60px;
      p {
        font-size: 14px;
        color: var(--font-color1);
      }
    }
    .artion-wrap {
      padding: 10px 0 12px 0;
      border-top: 1px solid var(--bg-color2);
      .row {
        flex: 1;
        color: var(--font-color3);
        font-size: 13px;
        line-height: 20px;
        span:hover {
          cursor: pointer;
        }
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
</style>

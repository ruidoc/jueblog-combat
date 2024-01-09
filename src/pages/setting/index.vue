<script setup lang="ts">
import { userStore } from '@/stores'
import { compressImg } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const store = userStore()
const route = useRoute()
const router = useRouter()
const curtag = ref('')
const loading = ref(false)
const form = ref<UserType>()
const headers = {
  Authorization: `Bearer ${localStorage.jueblog_token}`,
}
const toChange = (tag: string) => {
  curtag.value = tag
  router.push({
    params: { tag },
  })
}
const setAvatar = (url: string) => {
  ElMessageBox.prompt('输入一个在线的头像地址', '修改头像', {
    inputValue: url,
    confirmButtonText: '修改',
    cancelButtonText: '取消',
  }).then(({ value }) => {
    form.value.avatar = value
  })
}
const toUpdate = () => {
  loading.value = true
  let { avatar, username, company, position, introduc } = form.value
  store.updateUser(
    form.value._id,
    { avatar, username, company, position, introduc },
    res => {
      loading.value = false
      ElMessage.success(res.message)
    }
  )
}
// 上传成功
const uploadSuccess = (file: any) => {
  if (file.code == 200) {
    form.value.avatar = 'https://static.ruidoc.cn' + file.data.path
    ElMessage.success('上传成功')
  } else {
    ElMessage.success('上传失败')
  }
}

onMounted(() => {
  let tag = route.params.tag as string
  if (!store.user_info) {
    return (location.href = '/')
  }
  form.value = store.user_info
  curtag.value = tag
})
</script>

<template>
  <section class="setting-page fxt">
    <div class="smenu panel">
      <div
        :class="['cato-item fx', { active: curtag == 'user' }]"
        @click="toChange('user')"
      >
        个人资料
      </div>
      <div
        :class="['cato-item fx', { active: curtag == 'drafts' }]"
        @click="toChange('drafts')"
      >
        草稿箱
      </div>
    </div>
    <div class="sother panel fxt">
      <div v-if="curtag == 'user'" class="form-wrap">
        <div class="form-item fxt">
          <span class="label">用户名</span>
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </div>
        <div class="form-item fxt">
          <span class="label">职位</span>
          <el-input v-model="form.position" placeholder="请输入职位" />
        </div>
        <div class="form-item fxt">
          <span class="label">公司</span>
          <el-input v-model="form.company" placeholder="请输入公司" />
        </div>
        <div class="form-item fxt">
          <span class="label">个人介绍</span>
          <el-input
            type="textarea"
            :rows="4"
            v-model="form.introduc"
            placeholder="请输入个人介绍"
          />
        </div>
        <div class="form-item button">
          <el-button type="primary" :loading="loading" @click="toUpdate"
            >保存修改</el-button
          >
        </div>
      </div>
      <div v-if="curtag == 'user'" class="avatar-wrap">
        <div class="imgbox">
          <el-avatar :size="90" :src="form.avatar">
            <img src="@/assets/avatar.png" />
          </el-avatar>
          <div style="margin-bottom: 12px">我的头像</div>
          <el-upload
            action="https://api.ruidoc.cn/others/upload"
            class="avatar-uploader"
            name="image"
            :headers="headers"
            :show-file-list="false"
            :multiple="false"
            :on-success="uploadSuccess"
            :before-upload="compressImg"
          >
            <el-button class="actmo" plain>上传</el-button>
          </el-upload>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="less">
.setting-page {
  width: 1200px;
  margin: auto;
  align-items: flex-start;
  .smenu {
    width: 230px;
    height: 500px;
    padding: 10px;
    .cato-item {
      position: relative;
      padding: 10px 17px;
      line-height: 24px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 4px;
      color: var(--font-color2);
      .el-icon {
        color: #8a919f;
      }
      &:hover {
        background: var(--bg-color1);
        color: var(--el-color-primary);
        .el-icon {
          color: var(--el-color-primary);
        }
      }
      &.active {
        color: var(--el-color-primary);
        font-weight: 500;
        background: #eaf2ff;
        .el-icon {
          color: var(--el-color-primary);
        }
      }
      .text {
        padding-left: 17px;
      }
    }
  }
  .sother {
    flex: 1;
    margin-left: 20px;
    padding: 30px 40px;
    .form-wrap {
      width: 65%;
      .form-item {
        margin-bottom: 25px;
        .label {
          display: inline-flex;
          width: 100px;
          font-size: 14px;
          font-weight: 500;
          line-height: 38px;
        }
        .el-input__wrapper {
          background: #f2f3f5;
          box-shadow: none;
          &.is-focus {
            background: #fff;
            box-shadow: 0 0 0 1px var(--el-color-primary) inset;
          }
        }
        textarea {
          background: #f2f3f5;
          box-shadow: none;
          padding: 10px 12px;
          &:focus {
            background: #fff;
            box-shadow: 0 0 0 1px var(--el-color-primary) inset;
          }
        }
        input {
          height: 38px;
        }
        &.button {
          margin: 30px 0;
          padding-left: 85px;
        }
      }
    }
    .avatar-wrap {
      margin: 10px;
      flex: 1;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      .el-avatar {
        cursor: pointer;
        margin-bottom: 15px;
      }
    }
  }
  .panel {
    background: #fff;
    margin-bottom: 14px;
  }
}
</style>

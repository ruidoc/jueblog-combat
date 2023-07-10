<template>
  <section class="login-modal">
    <el-dialog v-model="visible" :show-close="false" width="350px">
      <template #header="{ close }">
        <h4 class="title">登录掘金畅享更多权益</h4>
        <el-button link circle @click="toClose(close)">
          <el-icon :size="20" color="#888"><Close /></el-icon>
        </el-button>
      </template>
      <div class="form-wrap">
        <div class="form-item">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </div>
        <div class="form-item">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          />
        </div>
        <div class="form-item button">
          <el-button type="primary" :loading="loading" @click="toLogin"
            >登录 / 注册</el-button
          >
        </div>
        <div class="footer">表示同意 <a>用户协议</a> 和 <a>隐私政策</a></div>
      </div>
    </el-dialog>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { ElMessage, ElDialog } from 'element-plus'
import { userStore } from '@/stores'
// 禁用点击遮罩层关闭弹框
ElDialog.props.closeOnClickModal.default = false
const ustore = userStore()
const visible = ref(false)
const loading = ref(false)
const form = ref({
  phone: '',
  password: '',
})
const toLogin = () => {
  let { phone, password } = form.value
  if (!phone && !password) {
    return ElMessage.error('帐号密码不为空')
  }
  loading.value = true
  ustore.login(form.value, bool => {
    loading.value = false
    visible.value = false
    console.log(bool)
  })
}
const toClose = (close: Function) => {
  ustore.need_login = false
  close()
}
defineExpose({
  visible,
})
</script>

<style lang="less">
.login-modal {
  .title {
    font-size: 20px;
  }
  h4 {
    color: #252933;
  }
  .el-dialog__body {
    padding: 25px 27px;
  }
  .el-dialog__header {
    margin-right: 0;
    border-bottom: 1px solid #eee;
    padding: 19px 27px;
  }
  .form-wrap {
    .form-item {
      margin-bottom: 20px;
      .el-input__wrapper {
        background: #f2f3f5;
        box-shadow: none;
        &.is-focus {
          background: #fff;
          box-shadow: 0 0 0 1px var(--el-color-primary) inset;
        }
      }
      input {
        height: 38px;
      }
      &.button {
        margin: 30px 0 30px 0;
        button {
          width: 100%;
          height: 40px;
        }
      }
    }
  }
  .footer {
    text-align: center;
  }
}
</style>

<template>
  <section class="login-modal">
    <el-dialog v-model="visible" :show-close="false" width="350px">
      <template #header="{ close }">
        <h4 class="title">{{ need_register ? '请注册账号' : '登录后继续' }}</h4>
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
          <div class="tips fx-b" v-if="need_register">
            <span>用户不存在，请注册</span>
            <a @click="need_register = !need_register">重新登录</a>
          </div>
          <el-button type="primary" :loading="loading" @click="toLogin">{{
            need_register ? '注册' : '登录'
          }}</el-button>
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
import { useRouter } from 'vue-router'
// 禁用点击遮罩层关闭弹框
ElDialog.props.closeOnClickModal.default = false
const ustore = userStore()
const visible = ref(false)
const loading = ref(false)
const need_register = ref(false)
const form = ref({
  phone: '',
  password: '',
})
const router = useRouter()
const toLogin = () => {
  let { phone, password } = form.value
  if (!phone && !password) {
    return ElMessage.error('帐号密码不为空')
  }
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    return ElMessage.error('手机号格式不正确')
  }
  if (password.length < 6) {
    return ElMessage.error('密码至少6位')
  }
  loading.value = true
  if (need_register.value) {
    let rform: Partial<UserType> = form.value
    rform.username = '游客' + Math.floor(Math.random() * 99999)
    rform.introduc = '我是一个萌新'
    ustore.register(form.value, code => {
      loading.value = false
      if (code == 200) {
        visible.value = false
        ElMessage.success('注册成功，请补全个人信息')
        setTimeout(() => {
          router.push('/setting/user')
        }, 300)
      }
    })
  } else {
    ustore.login(form.value, code => {
      loading.value = false
      if (code == 200) {
        visible.value = false
      }
      if (code == 20002) {
        need_register.value = true
      }
    })
  }
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
        .tips {
          font-size: 14px;
          margin-bottom: 8px;
          span {
            color: #f56c6c;
          }
          a {
            cursor: pointer;
          }
        }
      }
    }
  }
  .footer {
    text-align: center;
  }
}
</style>

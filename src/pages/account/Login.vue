<script lang="ts" setup>
import {computed, reactive, ref} from 'vue'
import type {ElForm} from 'element-plus'
import {accountVerify, uidUni} from '../../configs/services.js'
import {onBeforeRouteLeave, useRouter} from 'vue-router'
import aMessageBox from '../../components/box/tipBox.ts'
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import './multiplexed.css'

const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const router = useRouter();
const store = useStore();
const {t} = useI18n();

(async () => {
  const isLogin = computed(() => store.state.currentUser.value)
  if (isLogin.value) {
    router.go(-1)
  }
})()

const validateId = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the id'))
  }
  setTimeout(() => {
    callback()
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  password: '',
  username: '',
})

const rules = reactive({
  password: [{validator: validatePass, trigger: 'blur'}],
  username: [{validator: validateId, trigger: 'blur'}],
})

const submitForm = async (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  const isValid = await formEl.validate()
  if (isValid) {
    try {
      const res = await accountVerify(ruleForm)
      if (res.success) {
        await store.dispatch('loadCurrentUser')
        router.go(-1)
      } else {
        await aMessageBox(t(`tip.tip`),t(`tip.loginE`),t(`config.confirm`))
      }
    } catch (e) {
      await aMessageBox(t(`tip.tip`),t(`tip.passE`),t(`config.confirm`))
      console.error(e)
    }
  }
}

const resetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const router2Register = () => {
  router.push('/register')
}

onBeforeRouteLeave((to, from) => {
  if (to.path == '/register/finish' && from.path == '/account') {
    return false
  }
  if (to.path == '/register/improve' && from.path == '/account') {
    return false
  }
})
</script>

<template>
  <video id="video" autoplay loop muted playsinline>
    <source src="../../assets/video/login.mp4" type="video/mp4">
  </video>

  <el-container class="container">
    <div class="box login page">
      <p class="font global size title">登录</p>
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          status-icon
      >
        <el-form-item prop="id">
          <el-input v-model.number="ruleForm.username" :placeholder="$t(`placeholder.uid`)"></el-input>
        </el-form-item>
        <p>{{ ruleForm.password }}</p>
        <el-form-item prop="password">
          <el-input
              v-model="ruleForm.password"
              :placeholder="$t(`placeholder.password`)"
              autocomplete="off"
              type="password"
          ></el-input>
        </el-form-item>
        <div class="box button-arrange">
          <el-button class="font global" type="primary" @click="router2Register">{{ $t(`config.register`) }}</el-button>
          <el-button class="font global" @click="resetForm(ruleFormRef)">{{ $t(`config.reset`) }}</el-button>
          <el-button class="font global" type="primary" @click="submitForm(ruleFormRef)">{{
              $t(`config.login`)
            }}
          </el-button>
        </div>
      </el-form>
    </div>
  </el-container>
</template>

<style scoped>

</style>
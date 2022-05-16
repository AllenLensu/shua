<script lang="ts" setup>
import {computed, reactive, ref} from 'vue'
import type {ElForm} from 'element-plus'
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {uidUni} from '../../../../configs/services.js'
import '../../multiplexed.css'
import aMessageBox from "../../../../components/box/tipBox";
import {useI18n} from "vue-i18n";

const router = useRouter()
const store = useStore()
const {t} = useI18n()
store.dispatch('stepObliterate')
const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const router2Login = () => {
  router.push('/account')
}

(async () => {
  const isLogin = computed(() => store.state.currentUser.value)
  if (isLogin.value) {
    router.go(-1)
  }
})()

const validateId = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the id'))
  } else {
    callback()
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  username: localStorage.getItem("register-username") ?? '',
  password: localStorage.getItem("register-password") ?? '',
})

const rules = reactive({
  username: [
    {validator: validateId, trigger: 'blur'}
  ],
  password: [
    {validator: validatePass, trigger: 'blur'}
  ],
})

const submitForm = async (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  const isValid = await formEl.validate()
  if (isValid) {
    const {data} = await uidUni(ruleForm.username)
    if (data) {
      try {
        localStorage.setItem('register-username', ruleForm.username)
        localStorage.setItem('register-password', ruleForm.password)
        await store.dispatch('stepIncrement')
        router.push('/register/improve')
      } catch (e) {
        console.error(e)
      }
    } else {
      await aMessageBox(t(`tip.tip`), t(`tip.dumpun`), t(`config.confirm`))
    }
  } else {
    console.log('error submit!')
    return false
  }
}

const resetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const usernameChangeHandler = () => {
  localStorage.setItem('register-username', ruleForm.username)
}
</script>

<template>
  <div class="box register content">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-position="right"
        label-width="auto"
        status-icon
    >
      <el-form-item :label="$t(`accountAttr.username`)" prop="username">
        <el-input
            v-model="ruleForm.username"
            @change="usernameChangeHandler"
        ></el-input>
      </el-form-item>
      <p>{{ ruleForm.password }}</p>
      <el-form-item :label="$t(`accountAttr.password`)" prop="password">
        <el-input
            v-model="ruleForm.password"
            autocomplete="off"
            type="password"
        ></el-input>
      </el-form-item>
      <div class="box button arrange">
        <el-button type="primary" @click="router2Login">{{ $t(`config.login`) }}</el-button>
        <el-button @click="resetForm(ruleFormRef)">{{ $t(`config.reset`) }}</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">{{ $t(`config.next`) }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
</style>
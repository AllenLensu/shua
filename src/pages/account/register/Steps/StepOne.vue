<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {ElForm} from 'element-plus'
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import '../../multiplexed.css'

const router = useRouter()
const store = useStore()
store.dispatch('stepObliterate')
const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const router2Login = () => {
  router.push('/account')
}

const checkId = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the id'))
  }
  setTimeout(() => {
    if (value === "") {
      callback(new Error('Please input the id'))
    } else {
      callback()
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    //TODO IMPLEMENT
    callback()
  }
}

const ruleForm = reactive({
  password: localStorage.getItem("register-password") ?? '',
  username: localStorage.getItem("register-username") ?? '',
})

const rules = reactive({
  password: [{validator: validatePass, trigger: 'blur'}],
  username: [{validator: checkId, trigger: 'blur'}],
})

const submitForm = async (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  const isValid = await formEl.validate()
  if (isValid) {
    try {
      localStorage.setItem('register-username', ruleForm.username)
      localStorage.setItem('register-password', ruleForm.password)
      await store.dispatch('stepIncrement')

      router.push('/register/improve')
    } catch (e) {
      console.error(e)
    }
  }
}

const resetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const saveUname = () => {
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
      <el-form-item :label="$t(`register.username`)" prop="id">
        <el-input
            v-model="ruleForm.username"
            @change="saveUname"
        ></el-input>
      </el-form-item>
      <p>{{ ruleForm.password }}</p>
      <el-form-item :label="$t(`register.password`)" prop="password">
        <el-input
            v-model="ruleForm.password"
            autocomplete="off"
            type="password"
        ></el-input>
      </el-form-item>
      <div class="box button arrange">
        <el-button type="primary" @click="router2Login">{{ $t(`navigation.account.login`) }}</el-button>
        <el-button @click="resetForm(ruleFormRef)">{{ $t(`config.reset`) }}</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">{{ $t(`config.next`) }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
</style>
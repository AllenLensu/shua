<script lang="ts" setup>
import {computed, reactive, ref} from 'vue'
import type {ElForm} from 'element-plus'
import {accountVerify} from '../../configs/services.js'
import {useRouter} from 'vue-router'
import {useStore} from "vuex";
import './multiplexed.css'

const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const router = useRouter();
const store = useStore();

(async () => {
  const isLogin = computed(() => store.state.currentUser.value)
  if (isLogin.value) {
    router.push('/zone')
  }
})()

const validateId = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the id'))
  }
  setTimeout(() => {
    //TODO IMPLEMENT
    callback()
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
      await accountVerify(ruleForm)
      await store.dispatch('loadCurrentUser')
      router.push('/zone')
    } catch (e) {
      alert("用户名或密码错误")
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
              $t(`config.submit`)
            }}
          </el-button>
        </div>
      </el-form>
    </div>
  </el-container>
</template>

<style scoped>

</style>
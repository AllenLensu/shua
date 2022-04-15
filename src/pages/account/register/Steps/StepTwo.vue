<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {ElForm} from 'element-plus'
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import '../../multiplexed.css'

const router = useRouter()
const store = useStore()
const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const prevPage = async () => {
  await store.dispatch('stepDecrement')
  router.push('/register')
}

const storedBirthday = localStorage.getItem("register-birthday")

const ruleForm = reactive({
  gender: localStorage.getItem("register-gender") ?? '',
  lastname: localStorage.getItem("register-lastname") ?? '',
  firstname: localStorage.getItem("register-firstname") ?? '',
  birthday: storedBirthday ? new Date(storedBirthday) : new Date(),
  age: localStorage.getItem("register-age") ?? 0,
  residentProvince: localStorage.getItem("register-resident-province") ?? '',
})

const rules = reactive({
  gender: [{trigger: 'blur'}],
  lastname: [{trigger: 'blur'}],
  firstname: [{trigger: 'blur'}],
  age: [{trigger: 'blur'}],
})

const genderOptions = [
  {
    value: '1',
    label: '男',
  },
  {
    value: '0',
    label: '女',
  },
]

const submitForm = async (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  const isValid = await formEl.validate()
  if (isValid) {
    try {
      await store.dispatch('stepIncrement')
      router.push('/register/finish')
    } catch (e) {
      console.error(e)
    }
  }
}

const resetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const saveLastName = () => {
  localStorage.setItem('register-lastname', ruleForm.lastname)
}

const saveFirstName = () => {
  localStorage.setItem('register-firstname', ruleForm.firstname)
}

const saveGender = () => {
  localStorage.setItem('register-gender', ruleForm.gender)
}

const ageCalc = () => {
  ruleForm.age = new Date().getFullYear() - ruleForm.birthday.getFullYear()
  localStorage.setItem('register-birthday', ruleForm.birthday.toISOString())
  localStorage.setItem('register-age', String(ruleForm.age))
}
</script>

<template>
  <div class="box register content">
    <el-scrollbar height="300px">
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-position="right"
          label-width="auto"
          status-icon
      >
        <el-form-item :label="$t(`register.lastname`)" prop="lastname">
          <el-input
              v-model="ruleForm.lastname"
              @change="saveLastName"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`register.firstname`)" prop="firstname">
          <el-input
              v-model="ruleForm.firstname"
              @change="saveFirstName"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`register.gender`)" prop="firstname">
          <el-select
              v-model="ruleForm.gender"
              :clearable="true"
              :placeholder="$t(`config.select`)"
              class="m-2"
              @visible-change="saveGender">
            <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t(`register.birthday`)" prop="birthday">
          <el-date-picker
              v-model="ruleForm.birthday"
              :placeholder="$t(`config.select`)"
              type="date"
              @visible-change="ageCalc"
          />
        </el-form-item>
        <el-form-item :label="$t(`register.age`)" prop="age">
          <span>{{ ruleForm.age }}</span>
        </el-form-item>
        <div class="box button arrange">
          <el-button type="primary" @click="prevPage">{{ $t(`config.prev`) }}</el-button>
          <el-button @click="resetForm(ruleFormRef)">{{ $t(`config.reset`) }}</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">{{ $t(`config.next`) }}</el-button>
        </div>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<style scoped>
</style>

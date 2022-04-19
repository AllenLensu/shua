<script lang="ts" setup>
import {reactive} from "vue";
import {findUserInfo} from "../../../configs/services.js";

const userInfoForm = reactive({
  username: '',
  gender: '',
  birthday: '',
  age: 0,
  resident: '',
  household: '',
  signature: '',
  introduction: ''
});

(async () => {
  const response = await findUserInfo()
  console.log(response.data)
  // userInfo.value = response.data
  userInfoForm.username = response.data.username;
  userInfoForm.gender = response.data.gender ? 'MALE' : 'FEMALE';
  userInfoForm.birthday = new Date(response.data.birthday).toLocaleDateString();
  userInfoForm.age = response.data.age;
  userInfoForm.resident = response.data.resident;
  userInfoForm.household = response.data.household;
  userInfoForm.signature = response.data.signature;
  userInfoForm.introduction = response.data.introduction;
})()
</script>

<template>
  <el-form ref="formRef" :model="userInfoForm" label-position="left" label-width="8vw">
    <el-form-item :label='$t(`accountAttr.username`)'>
      <el-input v-model="userInfoForm.username" disabled style="width: 25vw"></el-input>
    </el-form-item>
    <el-form-item :label='$t(`accountAttr.gender`)'>
      <el-select
          v-model="userInfoForm.gender"
          disabled
          placeholder="please select your gender"
          style="width: 25vw"
      >
        <el-option label="男" value="MALE"></el-option>
        <el-option label="女" value="FEMALE"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label='$t(`accountAttr.birthday`)'>
      <el-date-picker
          v-model="userInfoForm.birthday"
          disabled
          placeholder="Pick a date"
          style="width: 25vw"
          type="date"
      ></el-date-picker>
    </el-form-item>
    <el-form-item :label='$t(`accountAttr.age`)'>
      <el-input-number
          v-model="userInfoForm.age"
          :max="199"
          :min="1"
          controls-position="right"
          disabled
          style="width: 25vw"
      />
    </el-form-item>
    <el-form-item :label='$t(`accountAttr.resident`)'>
      <el-input v-model="userInfoForm.resident" disabled style="width: 25vw"></el-input>
    </el-form-item>
    <el-form-item :label='$t(`accountAttr.household`)'>
      <el-input v-model="userInfoForm.household" disabled style="width: 25vw"></el-input>
    </el-form-item>
    <el-form-item :label='$t(`accountAttr.signature`)'>
      <el-input v-model="userInfoForm.signature" disabled style="width: 25vw" type="text"></el-input>
    </el-form-item>
    <el-form-item :label='$t(`accountAttr.introduction`)'>
      <el-input v-model="userInfoForm.introduction" disabled resize="none" rows="5" style="width: 25vw"
                type="textarea"></el-input>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.el-input-number :deep .el-input__inner :deep {
  text-align: left;
}
</style>
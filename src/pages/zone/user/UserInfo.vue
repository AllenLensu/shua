<script lang="ts" setup>
import {reactive, ref} from "vue";
import {changeProfile, findUserInfo} from "../../../configs/services.js";
import aMessageBox from "../../../components/box/tipBox";
import {useI18n} from "vue-i18n";
import pca from "../../../assets/json/pca-code.json"
import moment from "moment";

const {t} = useI18n();
const userInfoForm = reactive({
  username: '',
  name: '',
  uuid: '',
  gender: '',
  birthday: new Date().toLocaleDateString(),
  age: 0,
  resident: '',
  household: '',
  signature: '',
  introduction: ''
});

(async () => {
  const response = await findUserInfo()
  userInfoForm.name = response.data.name
  userInfoForm.uuid = response.data.id
  userInfoForm.username = response.data.username;
  userInfoForm.gender = response.data.gender ? 'MALE' : 'FEMALE';
  userInfoForm.birthday = new Date(response.data.birthday).toLocaleDateString();
  userInfoForm.age = response.data.age;
  userInfoForm.resident = response.data.resident.split(',');
  userInfoForm.household = response.data.household.split(',');
  userInfoForm.signature = response.data.signature;
  userInfoForm.introduction = response.data.introduction;
})();

const infoChangeHandle = async () => {
  let requestData = new FormData();
  let gender
  if (userInfoForm.gender == "MALE") {
    gender = 1
  } else if (userInfoForm.gender == "FEMALE") {
    gender = 0
  }
  requestData.append("age", userInfoForm.age.toString())
  requestData.append("birthday", userInfoForm.birthday.toString())
  requestData.append("gender", gender.toString())
  requestData.append("household", userInfoForm.household)
  requestData.append("introduction", userInfoForm.introduction)
  if (!userInfoForm.name) {
    await aMessageBox(t(`tip.tip`), t(`tip.requireInput`), t(`config.confirm`))
  }
  requestData.append("name", userInfoForm.name)
  requestData.append("resident", userInfoForm.resident)
  requestData.append("signature", userInfoForm.signature)
  requestData.append("uuid", userInfoForm.uuid)
  const {success} = await changeProfile(requestData)
  if (success) {
    await aMessageBox(t(`tip.tip`), t(`tip.success`), t(`config.confirm`))
  } else {
    await aMessageBox(t(`tip.tip`), t(`tip.error`), t(`config.confirm`))
  }
}

const ageCalc = () => {
  userInfoForm.age = new Date().getFullYear() - userInfoForm.birthday.getFullYear();
  localStorage.setItem("register-birthday", moment(userInfoForm.birthday).format("YYYY-MM-DD"));
  localStorage.setItem("register-age", String(userInfoForm.age));
};
</script>

<template>
  <el-form ref="formRef" :model="userInfoForm" label-position="left" label-width="8vw">
    <el-form-item :label='$t(`accountAttr.username`)'>
      <el-input v-model="userInfoForm.username" disabled style="width: 25vw"></el-input>
    </el-form-item>
    <el-form-item :label='$t(`accountAttr.name`)'>
      <el-input v-model="userInfoForm.name" style="width: 25vw"></el-input>
    </el-form-item>
    <el-form-item :label='$t(`accountAttr.gender`)'>
      <el-select
          v-model="userInfoForm.gender"
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
          placeholder="Pick a date"
          style="width: 25vw"
          type="date"
          @visible-change="ageCalc"
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
      <el-cascader
          v-model="userInfoForm.resident"
          :multiple="false"
          :options="pca"
          :placeholder="t(`placeholder.place`)"
          expandTrigger="hover"
          filterable
          separator=" > "
          style="width: 25vw"
      />
    </el-form-item>
    <el-form-item :label='$t(`accountAttr.household`)'>
      <el-cascader
          v-model="userInfoForm.household"
          :multiple="false"
          :options="pca"
          :placeholder="t(`placeholder.place`)"
          expandTrigger="hover"
          filterable
          separator=" > "
          style="width: 25vw"
      />
    </el-form-item>
    <el-form-item :label='$t(`accountAttr.signature`)'>
      <el-input v-model="userInfoForm.signature" style="width: 25vw" type="text"></el-input>
    </el-form-item>
    <el-form-item :label='$t(`accountAttr.introduction`)'>
      <el-input v-model="userInfoForm.introduction" resize="none" rows="5" style="width: 25vw"
                type="textarea"></el-input>
    </el-form-item>
  </el-form>
  <el-button type="primary" class="main-button" @click="infoChangeHandle">{{ $t(`config.change`) }}</el-button>
</template>

<style scoped>
:deep(.el-input-number.el-input__inner) {
  text-align: left;
}

.main-button {
  position: relative;
  font-family: YKH55, sans-serif;
  display: inline-block;
  background-color: #409EFF;
  border: 2px solid transparent;
  border-radius: 5px;
  color: #FFF;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}

.main-button:hover,
.main-button:focus {
  background-color: #fff;
  border: 2px solid #409EFF;
  color: #409EFF;
}
</style>
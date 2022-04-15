<script lang="ts" setup>
import {ref} from 'vue'
import type {UploadFile, UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
import {ElMessage, genFileId} from 'element-plus'
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import '../../multiplexed.css'
import aMessageBox from "../../../../components/box/requireImplement";
import {useI18n} from "vue-i18n";
import {register} from "../../../../configs/services.js"

const router = useRouter()
const store = useStore()
const {t} = useI18n()
const imageUrl = ref('')
const uploadRef = ref<UploadInstance>()
const uploadRawFile = ref<UploadRawFile>()

const router2Login = () => {
  router.push('/account')
}

const prevPage = async () => {
  await store.dispatch('stepDecrement')
  router.push('/register/improve')
}

const handleAvatarChange = (uploadFile: UploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  uploadRawFile.value = uploadFile.raw!
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg, image/png') {
    ElMessage.error('Avatar picture must be JPG or PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  uploadRawFile.value = rawFile
  return true
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}

const submitUpload = async () => {
  await register(uploadRawFile.value)
  await aMessageBox(t(`tip.tip`), t(`language.more`), 'OK')
}
</script>

<template>
  <div class="box register content">
    <el-space direction="vertical">
      {{ $t('register.uploadAvatar') }} 
      <el-upload
          :ref="uploadRef"
          :auto-upload="false"
          :before-upload="beforeAvatarUpload"
          :limit="1"
          :on-change="handleAvatarChange"
          :on-exceed="handleExceed"
          :show-file-list="false"
          accept="image/png, image/jpeg"
          action="/api/reg/avatar"
          class="avatar-uploader"
      >
        <img v-if="imageUrl" :alt="t(`register.avatar`)" :src="imageUrl" class="avatar"/>
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
      <div class="box button arrange">
        <el-button type="primary" @click="router2Login">{{ $t(`navigation.account.login`) }}</el-button>
        <el-button type="primary" @click="prevPage">{{ $t(`config.prev`) }}</el-button>
        <el-button type="primary" @click="submitUpload">{{ $t(`config.submit`) }}</el-button>
      </div>
    </el-space>
  </div>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

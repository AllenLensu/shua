<script lang="ts" setup>
import {ref} from "vue";
import type {UploadFile, UploadInstance, UploadProps, UploadRawFile,} from "element-plus";
import {ElMessage, genFileId} from "element-plus";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import "../../multiplexed.css";
import aMessageBox from "../../../../components/box/requireImplement";
import {useI18n} from "vue-i18n";
import {register} from "../../../../configs/services.js";

const router = useRouter();
const store = useStore();
const {t} = useI18n();
const imageUrl = ref("");
const uploadRef = ref<UploadInstance>();
const uploadRawFile = ref<UploadRawFile>();

const router2Login = () => {
  router.push("/account");
};

const prevPage = async () => {
  await store.dispatch("stepDecrement");
  router.push("/register/improve");
};

const handleAvatarChange = (uploadFile: UploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  uploadRawFile.value = uploadFile.raw!
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg, image/png") {
    ElMessage.error(t(`tip.avatarFormat`))
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error(t(`tip.avatarSize`))
    return false
  }
  uploadRawFile.value = rawFile
  return true
};

const handleExceed: UploadProps["onExceed"] = (files) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
};

const submitUpload = async () => {
  let requestBody = new FormData();
  requestBody.append("file", uploadRawFile.value);
  requestBody.append("uid", localStorage.getItem("register-username"));
  requestBody.append("password", localStorage.getItem("register-password"));
  requestBody.append("gender", localStorage.getItem("register-gender"));
  requestBody.append("lastname", localStorage.getItem("register-lastname"));
  requestBody.append("firstname", localStorage.getItem("register-firstname"));
  requestBody.append("birthday", localStorage.getItem("register-birthday"));
  requestBody.append("age", localStorage.getItem("register-age"));
  let response = await register(requestBody);
  if (response.success) {
    router.push("/account")
    localStorage.removeItem("register-username")
    localStorage.removeItem("register-password")
    localStorage.removeItem("register-gender")
    localStorage.removeItem("register-lastname")
    localStorage.removeItem("register-firstname")
    localStorage.removeItem("register-birthday")
    localStorage.removeItem("register-age")
    await aMessageBox(t(`tip.welcome`), t(`tip.congratulation`) + response.data + t(`config.register`) + t(`tip.success`), t(`config.confirm`))
  } else {
    router.push("/error")
  }
};
</script>

<template>
  <div class="box register content">
    <el-space :size="'large'" direction="vertical">
      {{ $t("hint.uploadAvatar") }}
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
        <img
            v-if="imageUrl"
            :alt="t(`accountAttr.avatar`)"
            :src="imageUrl"
            class="avatar"
        />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
      <div class="box button arrange">
        <el-button type="primary" @click="router2Login">{{
            $t(`config.login`)
          }}
        </el-button>
        <el-button type="primary" @click="prevPage">{{
            $t(`config.prev`)
          }}
        </el-button>
        <el-button type="primary" @click="submitUpload">{{
            $t(`config.submit`)
          }}
        </el-button>
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

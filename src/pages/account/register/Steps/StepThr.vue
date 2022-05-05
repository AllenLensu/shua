<script lang="ts" setup>
import {computed, ref} from "vue";
import type {UploadFile, UploadInstance, UploadProps, UploadRawFile,} from "element-plus";
import {ElForm, ElMessage, genFileId} from "element-plus";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import "../../multiplexed.css";
import aMessageBox from "../../../../components/box/tipBox.ts";
import {useI18n} from "vue-i18n";
import {register, registerDirectVerify} from "../../../../configs/services.js";

const router = useRouter();
const store = useStore();
const {t} = useI18n();
const imageUrl = ref("");
const uploadRef = ref<UploadInstance>();
const uploadRawFile = ref<UploadRawFile>();

(async () => {
  const isLogin = computed(() => store.state.currentUser.value)
  if (isLogin.value) {
    router.go(-1)
  }
})()

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
  if (rawFile.type !== "image/jpeg" || rawFile.type !== "image/png") {
    ElMessage.error(t(`tip.formatError`))
  }
  if (rawFile.size > 1048576) {
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
  if (uploadRawFile.value === undefined) {
    return aMessageBox(t(`tip.tip`), t(`tip.requireAvatar`), t(`config.confirm`))
  }
  let requestBody = new FormData();
  requestBody.append("file", uploadRawFile.value);
  requestBody.append("uid", localStorage.getItem("register-username"));
  requestBody.append("password", localStorage.getItem("register-password"));
  requestBody.append("gender", localStorage.getItem("register-gender") ?? "1");
  requestBody.append("lastname", localStorage.getItem("register-lastname"));
  requestBody.append("firstname", localStorage.getItem("register-firstname"));
  requestBody.append("birthday", localStorage.getItem("register-birthday"));
  requestBody.append("age", localStorage.getItem("register-age"));
  let response = await register(requestBody);
  if (response.success) {
    await registerDirectVerify(localStorage.getItem("register-username"), localStorage.getItem("register-password"))
    window.location.href = '/'
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
<!--        <el-button type="primary" @click="router2Login">{{-->
<!--            $t(`config.login`)-->
<!--          }}-->
<!--        </el-button>-->
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

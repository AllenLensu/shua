<script lang="ts" setup>
import {UserFilled} from "@element-plus/icons-vue";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import {ElMessage, genFileId, UploadFile, UploadInstance, UploadProps, UploadRawFile} from "element-plus/es";
import {useI18n} from "vue-i18n";
import aMessageBox from "../../../components/box/tipBox";
import {logout, updatePass} from "../../../configs/services.js";
import {ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";

const avatarRef = ref();
const store = useStore();
const router = useRouter();
const imageUrl = ref("");
const {t} = useI18n();
const uploadRef = ref<UploadInstance>();
const uploadRawFile = ref<UploadRawFile>();

(async () => {
  const info = computed(() => store.state.currentUser.value)
  avatarRef.value = "/assets/avatar/" + info.value?.avatar
})()

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

const handleAvatarSuccess: UploadProps["onSuccess"] = (response: any, uploadFile: UploadFile) => {
  aMessageBox(t(`tip.tip`), t(`tip.success`), t(`config.confirm`))
  window.location.reload()
}

const changePassword = async () => {
  ElMessageBox.prompt(t(`placeholder.passwordex`), t(`tip.tip`), {
    confirmButtonText: t(`config.confirm`),
    cancelButtonText: t(`config.cancel`),
  })
      .then(({value}) => {
        localStorage.setItem("pAsSwOrD", value)
        ElMessageBox.prompt(t(`placeholder.passwordn`), t(`tip.tip`), {
          confirmButtonText: t(`config.confirm`),
          cancelButtonText: t(`config.cancel`),
        })
            .then(async ({value}) => {
              let req = new FormData()
              req.append("before", localStorage.getItem("pAsSwOrD"))
              req.append("now", value)
              const {success} = await updatePass(req)
              if (success) {
                logout()
                store.dispatch('clearCurrentUser')
                router.push('/account')
                ElMessage({
                  type: 'info',
                  message: t(`tip.success`),
                })
                ElMessage({
                  type: 'info',
                  message: t(`tip.loginAgain`),
                })
              } else {
                ElMessage({
                  type: 'info',
                  message: t(`tip.failure`),
                })
              }
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: t(`tip.incancel`),
              })
            })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: t(`tip.incancel`),
        })
      })
}

</script>

<template>
  <div class="position-fix">
    <el-popover
        :content="$t(`hint.changeAvatar`)"
        placement="right"
        trigger="hover"
    >
      <template #reference>
        <el-upload
            :ref="uploadRef"
            :auto-upload="true"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            :on-change="handleAvatarChange"
            :on-exceed="handleExceed"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            accept="image/png, image/jpeg"
            action="/api/zone/avatar"
            class="avatar-uploader"
        >
          <img
              v-if="imageUrl"
              :alt="t(`accountAttr.avatar`)"
              :src="imageUrl"
              class="avatar"
          />

          <el-avatar v-else :fit="`fill`" :icon="UserFilled" :size="120"
                     :src="avatarRef"></el-avatar>
        </el-upload>
      </template>
    </el-popover>
    <h6/>
    <el-button class="main-button" type="primary" @click="changePassword">{{ t(`hint.changePass`) }}</el-button>
  </div>
</template>

<style scoped>
.position-fix {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
}

.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
  border-radius: 1000px;
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
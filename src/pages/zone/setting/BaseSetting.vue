<script lang="ts" setup>
import {useRouter} from "vue-router";
import {deleteUser} from "../../../configs/services.js";
import {useI18n} from "vue-i18n";
import {Action, ElMessage, ElMessageBox} from "element-plus";
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()
const {t} = useI18n()
const handleDel = async () => {
  await ElMessageBox({
    title: t(`tip.tip`),
    message: t(`tip.delinf`),
    confirmButtonText: t(`config.confirm`),
    callback: async (action: Action) => {
      if (action == 'confirm') {
        const {success} = await deleteUser();
        if (success) {
          ElMessage({
            type: 'warning',
            message: t(`tip.success`),
          })
          store.dispatch('clearCurrentUser')
          router.push('/')
        } else {
          ElMessage({
            type: 'error',
            message: t(`tip.error`),
          })
        }
      }
    },
  });
}
</script>

<template>
  <div class="setting-box">
    <RouterLink to="/zone/star">
      <el-card shadow="hover">
        <el-space direction="vertical" fill>
          <div class="large-card-icon">
            <font-awesome-icon :icon="['fas', 'star-half-alt']" :mask="['far', 'circle']" size="2x"/>
          </div>
          <div style="padding: 14px">
            <span>{{ $t(`hint.starSetting`) }}</span>
          </div>
        </el-space>
      </el-card>
    </RouterLink>
    <el-card shadow="hover" @click="handleDel">
      <el-space direction="vertical" fill>
        <div class="large-card-icon">
          <font-awesome-icon :icon="['fas', 'trash']" :mask="['far', 'circle']" size="2x"/>
        </div>
        <div style="padding: 14px">
          <span>{{ $t(`hint.deleteAccount`) }}</span>
        </div>
      </el-space>
    </el-card>
  </div>
</template>

<style scoped>
.setting-box {
  display: grid;
  justify-items: center;
  grid-gap: 5px 5px;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: center;
}

.large-card-icon {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-bottom: 5%;
}

:deep(a:-webkit-any-link) {
  color: unset;
  cursor: pointer;
  text-decoration: unset;
}
</style>
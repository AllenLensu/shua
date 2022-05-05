<script lang="ts" setup>
import {defineProps, ref} from "vue";
import {UserFilled} from "@element-plus/icons-vue";
import {findAvatar} from "../../configs/services.js";

const props = defineProps<{
  username: any,
  msg: any
}>()
const avatarRef = ref();

(async () => {
  const {data} = await findAvatar(props.username)
  avatarRef.value = "/assets/avatar/" + data
})()
</script>

<template>
  <el-space style="margin-bottom: 15px">
    <el-space direction="vertical">
      <el-avatar :alt="props.username" :fit="`fill`" :icon="UserFilled" :size="32"
                 :src="avatarRef"
                 shape="circle"></el-avatar>
      <div style="font-size: small">{{ props.username }}</div>
    </el-space>
    <el-card class="card-style">
      {{ props.msg }}
    </el-card>
  </el-space>
</template>

<style scoped>
.card-style {
  width: 100%;
}

:deep(.el-card__body) {
  padding: 12px
}
</style>
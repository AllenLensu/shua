<script lang="ts" setup>
import {defineProps, ref} from "vue";
import {useI18n} from 'vue-i18n'
import moment from "moment";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {UserFilled} from "@element-plus/icons-vue";
import {findAvatar} from "../../configs/services.js";

const props = defineProps<{
  comment: any
}>()
const {t} = useI18n()
const store = useStore()
const avatarRef = ref()
const router = useRouter();

(async () => {
  const {data} = await findAvatar(props.comment.uid)
  avatarRef.value = "/assets/avatar/" + data
})()

</script>

<template>
  <el-card shadow="none">
    <el-space direction="horizontal">
      <div class="card-header">
        <div class="card-header-plus">
          <el-avatar :fit="`fill`" :icon="UserFilled" :alt="props.comment.uid" :size="32"
                     :src="avatarRef"
                     shape="circle"></el-avatar>
          <div style="margin-left: 12px;">
            {{ props.comment.uid }}
            <div class="text timePosition">
              {{ moment(props.comment.time).toNow() }}
            </div>
          </div>
        </div>
      </div>
      <el-divider direction="vertical"/>
      <el-space direction="vertical">
        {{ props.comment.comment }}
      </el-space>
    </el-space>
  </el-card>
</template>

<style scoped>
.card-header-plus {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.card-header {
  font-family: YKH65, vivoR, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-family: YKH55, vivoL, sans-serif;
  font-size: 14px;
}

.timePosition {
  text-align: left;
  white-space: nowrap;
}

</style>
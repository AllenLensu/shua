<script lang="ts" setup>
import {computed, defineProps, ref} from "vue";
import {useI18n} from 'vue-i18n'
import moment from "moment";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import SubCommentCard from "./SubCommentCard.vue";
import {UserFilled} from "@element-plus/icons-vue";
import {addComment, findAvatar, getShortUrl} from "../../configs/services.js";
import {ElMessage, ElMessageBox} from "element-plus";
import aMessageBox from "../box/tipBox.ts";

const props = defineProps<{
  comment: any
}>()
const {t} = useI18n()
const store = useStore()
const router = useRouter()
const avatarRef = ref()

const commentHandler = () => {
  const verifyInfo = computed(() => store.state.currentUser.value)
  if (!verifyInfo.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), t(`config.confirm`))
    router.push('/account')
  } else {
    ElMessageBox.prompt(t(`placeholder.postContent`), t(`hint.floorinfloor`), {
      confirmButtonText: t(`config.confirm`),
      cancelButtonText: t(`config.cancel`),
    }).then(async ({value}) => {
      let requestBody = new FormData();
      requestBody.append("post_id", props.comment.contentId)
      requestBody.append("comment", value)
      requestBody.append("comment_id_ex", props.comment.id)
      try {
        await addComment(requestBody)
        window.location.reload()
      } catch (e) {
        ElMessage({
          type: 'error',
          message: `Your comment is:${value}`,
        })
      }
    })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Input canceled',
          })
        })
  }
};

(async () => {
  const {data} = await findAvatar(props.comment.uid)
  avatarRef.value = "/assets/avatar/" + data
})()

</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <div class="card-header-plus">
          <router-link :to="`/user/` + props.comment.uid + `/` + props.comment.contentId">
          <el-avatar :alt="props.comment.uid" :fit="`fill`" :icon="UserFilled" :size="32"
                     :src="avatarRef"
                     shape="circle"></el-avatar>
          </router-link>
          <div style="margin-left: 12px;">
            {{ props.comment.uid }}
            <div class="text timePosition">
              {{ moment(props.comment.time).toNow() }}
            </div>
          </div>
        </div>
        <el-button class="button" @click="commentHandler">
          <el-space>
            <font-awesome-icon :icon="['fas', 'comments']"/>
            {{ $t(`config.comment`) }}
          </el-space>
        </el-button>
      </div>
    </template>
    <el-space direction="vertical" fill style="width: 100%;">
      {{ props.comment.comment }}
      <p style="margin-top: -10px"/>
      <div v-if="props.comment.subComments">
        <el-space direction="vertical" fill style="width: 100%;">
          <div v-for="subcomment in props.comment.subComments" :key="subcomment.floor">
            <SubCommentCard :comment="subcomment"/>
          </div>
        </el-space>
      </div>
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
}

h8 {
  margin-bottom: 1%;
}
</style>
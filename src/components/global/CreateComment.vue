<script lang="ts" setup>
import {addComment} from '../../configs/services.js'
import {useRouter} from "vue-router";
import {computed, onUnmounted, ref} from 'vue';
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import aMessageBox from "../box/tipBox.ts";
import aMessage from "../box/tipMes.ts";

const props = defineProps<{
  postId: any,
  commentNum: any,
  ex?: any
}>()
const store = useStore();
const router = useRouter();
const {t} = useI18n();
const textAreaRef = ref(localStorage.getItem('temComment') ?? '')

const sendButton = async () => {
  if (textAreaRef.value !== '') {
    const verifyInfo = computed(() => store.state.currentUser.value)
    if (!verifyInfo.value) {
      router.push('/account')
    } else {
      let requestBody = new FormData()
      requestBody.append("post_id", props.postId)
      requestBody.append("comment", textAreaRef.value)
      if (props.ex) {
        requestBody.append("comment_id_ex", props.ex)
      } else {
        requestBody.append("comment_id_ex", "0")
      }
      const response = await addComment(requestBody)
      if (response.success) {
        localStorage.removeItem('temComment')
        await aMessage(t(`tip.sendSuccess`))
        window.location.reload()
      }
    }
  } else {
    return await aMessageBox(t(`tip.error`), t(`placeholder.postContent`), t(`config.confirm`))
  }

}

onUnmounted(async () => {
  localStorage.setItem('temComment', textAreaRef.value)
})
</script>

<template>
  <div style="margin-bottom: 20px;">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div>{{ t(`config.comment`) }} {{props.commentNum}}</div>
          <el-button class="main-button icon-button" type="primary" @click="sendButton">
            {{ $t(`config.send`) }}
          </el-button>
        </div>
      </template>
      <el-input
          v-model="textAreaRef"
          :autosize="{ minRows: 3, maxRows: 5 }"
          :placeholder="t(`placeholder.postContent`)"
          resize="none"
          type="textarea"
      />
    </el-card>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.main-button.icon-button:hover,
.main-button.icon-button:focus {
  padding-right: 45px;
}

:deep(.main-button.icon-button:after) {
  content: "\f178";
  font-family: FontAwesome, ui-serif;
  position: absolute;
  width: 30px;
  right: 8px;
  text-align: center;
  opacity: 0;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}

.main-button.icon-button:hover:after,
.main-button.icon-button:focus:after {
  opacity: 1;
}
</style>
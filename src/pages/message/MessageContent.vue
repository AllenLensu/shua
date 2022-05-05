<script lang="ts" setup>
import {computed, defineProps, onBeforeMount, onBeforeUpdate, onUnmounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import Dialog from "../../components/global/Dialog.vue";
import {addMessage, findMessage, getUUID} from "../../configs/services.js"
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import aMessageBox from "../../components/box/tipBox";
import moment from "moment";

const props = defineProps<{
  uid?: string
}>()
const {t} = useI18n();
const inputRef = ref("");
const messageRef = ref();
const store = useStore();
const router = useRouter();
const timeoutID = ref();
const uuid = ref();
const isLogin = computed(() => store.state.currentUser.value);

(async () => {
  if (!isLogin.value) {
    router.push('/account')
  }
})();

onBeforeMount(async () => {
  uuid.value = await getUUID(props.uid)
});

onBeforeUpdate(async () => {
  uuid.value = await getUUID(props.uid)
});

const fetchMessage = async () => {
  if (props.uid) {
    const {data} = await findMessage(props.uid)
    messageRef.value = data
  }
  timeoutID.value = setTimeout(fetchMessage, 1000)
}

fetchMessage()

const sendButton = async () => {
  let request = new FormData();
  request.append("send", isLogin.value.username)
  request.append("receive", props.uid)
  request.append("message", inputRef.value)
  const {success} = await addMessage(request)
  if (!success) {
    await aMessageBox(t(`tip.tip`), t(`tip.error`) + ` : ` + event, t(`config.confirm`))
  } else {
    inputRef.value = ''
  }
}

onUnmounted(() => {
  clearTimeout(timeoutID.value)
})
</script>

<template>
  <div v-if="uid">
    <el-card>
      <template #header>
        {{ props.uid }}
      </template>
      <div>
        <el-scrollbar height="48vh">
          <div style="width: 100%;">
            <div v-for="message in messageRef" :key="message + `_mes`">
              <Dialog :message="message" :uuid="uuid" style="margin-bottom: 15px"/>
            </div>
          </div>
        </el-scrollbar>
        <el-divider/>
        <div class="holder-set">
          <el-input v-model="inputRef" resize="none" size="default" style="width: 60vw;padding-right: 10px" type="textarea"/>
          <el-button type="primary" @click="sendButton">{{ t(`config.send`) }}</el-button>
        </div>
      </div>
    </el-card>
  </div>
  <div v-else>
    <el-empty :description="$t(`tip.slogan`)"/>
  </div>
</template>

<style scoped>
.holder-set {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
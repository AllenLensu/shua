<script lang="ts" setup>
import {computed, onUnmounted, ref} from "vue";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import Talk from "../../components/global/Talk.vue";
import {useRouter} from "vue-router";

const websocket = new WebSocket("ws://localhost:18080/chat")
onUnmounted(() => {
  websocket.close()
})
const {t} = useI18n();
const input = ref("")
const store = useStore()
const router = useRouter()
const onlineCount = ref(0)
const messages = ref<any[]>([])
const usrInfo = computed(() => store.state.currentUser.value)
const username = usrInfo.value?.username

function sendMessage() {
  websocket.send(JSON.stringify({username, msg: input.value}));
  input.value = '';
}
websocket.onopen = (...args) => {
  console.log("open")
  console.log(args)
}
websocket.onmessage = (event) => {
  console.log("onmessage")
  const message = JSON.parse(event.data)
  onlineCount.value = message.onlineCount;
  if (message.type === 'SPEAK') {
    messages.value = messages.value.concat(message.username + "：" + message.msg)
  }
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="header-set">
        <div style="flex: 1">{{ t(`placeholder.onlineCount`) }}: {{ onlineCount }}</div>
        <div style="flex: 1;text-align: center">{{ t(`hint.chatRoom`) }}</div>
        <div style="flex: 1"></div>
      </div>
    </template>
    <el-scrollbar height="60vh" style="margin-bottom: 20px">
      <div v-for="msg in messages">
        <Talk :msg="msg.split('：')[1]" :username="msg.split('：')[0]"/>
      </div>
    </el-scrollbar>
    <div class="holder-set">
      <el-input v-model="input" size="default" resize="none" style="width: 75vw;padding-right: 10px" type="textarea"/>
      <el-button type="primary" @click="sendMessage">{{ t(`config.send`) }}</el-button>
    </div>
  </el-card>
</template>

<style scoped>
.header-set {
  display: flex;
  justify-content: center;
}

.holder-set {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
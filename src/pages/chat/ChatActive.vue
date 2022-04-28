<script lang="ts" setup>
import {computed, onUnmounted, ref} from "vue";
import {useStore} from "vuex";

const websocket = new WebSocket("ws://localhost:18080/chat")
onUnmounted(() => {
  websocket.close()
})

const input = ref("")
const store = useStore()
const usrInfo = computed(() => store.state.currentUser.value)
const username = usrInfo.value.username

function sendMessage() {
  websocket.send(JSON.stringify({username, msg: input.value}));
  input.value = '';
}

const onlineCount = ref(0)

const messages = ref<any[]>([])

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
  <el-input v-model="input">
  </el-input>
  <el-button type="submit" @click="sendMessage">发送</el-button>
  <div>在线人数: {{ onlineCount }}</div>
  <div v-for="msg in messages">
    {{ msg }}
  </div>
</template>

<style scoped>

</style>
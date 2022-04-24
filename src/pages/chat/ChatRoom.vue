<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {defineProps, ref, watch} from "vue";
import {ArrowLeft} from "@element-plus/icons-vue";
import {useI18n} from "vue-i18n";
import ChatActive from "./ChatActive.vue";

const route = useRoute()
const router = useRouter()
const props = defineProps<{
  id?: string
}>()
const {t} = useI18n()
const roomRef = ref(route.params.id)
const urlDetect = ref(false)

const handleBack = () => {
  router.push('/chat')
}

watch(
    () => route.params.id,
    async params => {
      roomRef.value = route.params.id
      if (roomRef.value === null) {
        roomRef.value = null
      }
    }
)
watch(
    () => route.path,
    async params => {
      const url = route.path
      urlDetect.value = url !== '/chat';
      console.log(url)
      console.log(urlDetect.value)
    }
)



</script>

<template>
  <div v-if="urlDetect" style="margin-bottom: 20px">
    <el-page-header :content="'USERNAME' + route.params.username" :icon="ArrowLeft" :title="t(`config.back`)" @back="handleBack"/>
  </div>
  <div v-if="!roomRef">
    <el-empty :description="t(`tip.slogan`)"/>
  </div>
  <div v-else>
    ChatRoom {{ roomRef }}
    <ChatActive />
  </div>
</template>

<style scoped>

</style>
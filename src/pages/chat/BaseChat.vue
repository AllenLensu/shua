<script lang="ts" setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import ChatActive from "./ChatActive.vue";

const asideScrollHeightRef = ref(0)
const router = useRouter()
const store = useStore()
asideScrollHeightRef.value = window.innerHeight - 100;

(async () => {
  const isLogin = computed(() => store.state.currentUser.value)
  if (!isLogin.value) {
    router.push('/account')
  }
})()
</script>

<template>
  <div class="common-layout">
    <el-container class="box">
      <el-main>
        <ChatActive/>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.box {
  margin-left: 5%;
  margin-right: 5%;
}

:deep(.el-header) {
  padding-bottom: 20px;
  padding-top: 10px;
  --el-header-height: unset;
}

:deep(.el-main) {
  display: flex;
  flex-direction: column;
}

a {
  text-decoration: none;
}
</style>
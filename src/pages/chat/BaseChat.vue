<script lang="ts" setup>
import {computed, ref} from "vue";
import ListCard from "../../components/global/ListCard.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

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
      <el-aside width="280px">
        <el-header>
          <font-awesome-icon :icon="['fas', 'comments']"/>
          {{ $t(`hint.chatList`) }}
        </el-header>
        <div>
          <el-scrollbar height="78vh">
            <div style="margin-left: 5%;margin-top: 2%">
              <div v-for="i in 27" :key="i">
                <router-link :to="'/chat/' + i + '/' + i">
                  <ListCard :test="i"/>
                </router-link>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
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
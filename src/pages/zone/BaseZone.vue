<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router'
import {computed, onUnmounted, ref} from "vue";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";

const router = useRouter();
const route = useRoute();
const store = useStore();
const {t} = useI18n()
const scrollBarHeight = ref(window.innerHeight - 60)
const isAdmin = computed(() => store.state.currentUser.value?.accountRole)
const isCollapse = ref((window.outerWidth / window.outerHeight < 1) ? true : (window.outerWidth < 768));
const sidMenuWidth = ref(isCollapse.value ? '60px' : '200px');

(async () => {
  const isLogin = computed(() => store.state.currentUser.value)
  if (!isLogin.value) {
    router.push('/account')
  }
})()

const getActiveIndex = (): string => {
  switch (route.fullPath) {
    case '/zone':
      return 'zone'
    case '/zone/':
      return 'zone'
    case '/zone/comment':
      return 'history/comment'
    case '/zone/favor':
      return 'history/favor'
    case '/zone/thumb':
      return 'history/thumb'
    case '/zone/comment/':
      return 'history/comment'
    case '/zone/favor/':
      return 'history/favor'
    case '/zone/thumb/':
      return 'history/thumb'
    case '/zone/user/info':
      return 'user/info'
    case '/zone/user/info/':
      return 'user/info'
    case '/zone/account/info':
      return 'account/info'
    case '/zone/account/info/':
      return 'account/info'
    case '/zone/manage/user':
      return 'manage/user'
    case '/zone/manage/user/':
      return 'manage/user'
    case '/zone/manage/post':
      return 'manage/post'
    case '/zone/manage/post/':
      return 'manage/post'
    default:
      return 'setting'
  }
}

function resize() {
  scrollBarHeight.value = window.innerHeight - 60;
  let woWidth = window.innerWidth;
  let woHeight = window.innerHeight;
  if (woWidth / woHeight < 1) {
    isCollapse.value = true
  } else {
    isCollapse.value = woWidth < 768;
  }
  if (isCollapse.value) {
    sidMenuWidth.value = '60px'
  } else {
    sidMenuWidth.value = '200px'
  }
}

addEventListener("resize", resize)

onUnmounted(() => {
  removeEventListener("resize", resize)
})

</script>

<template>
  <el-container>
    <el-aside :width="sidMenuWidth">
      <el-scrollbar :max-height="scrollBarHeight" :noresize="true">
        <el-menu
            :collapse="isCollapse"
            :default-active="getActiveIndex()"
            :default-openeds="route.fullPath === '/zone/user/info' ? ['user/info'] : []"
            :router="true"
        >
          <el-menu-item index="zone" route="/zone/">
            <el-icon>
              <HomeFilled/>
            </el-icon>
            <span>{{ $t(`navigation.zonehome`) }}</span>
          </el-menu-item>
          <el-sub-menu index="history">
            <template #title>
              <el-icon>
                <Aim/>
              </el-icon>
              <span>{{ $t(`navigation.history`) }}</span>
            </template>
            <el-menu-item-group :title="t(`hint.treasureChest`)">
              <el-menu-item index="history/comment" route="/zone/comment">{{ $t(`navigation.comment`) }}</el-menu-item>
              <el-menu-item index="history/favor" route="/zone/favor">{{ $t(`navigation.favor`) }}</el-menu-item>
              <el-menu-item index="history/thumb" route="/zone/thumb">{{ $t(`navigation.thumb`) }}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="user">
            <template #title>
              <el-icon>
                <Menu/>
              </el-icon>
              <span>{{ $t(`navigation.centre`) }}</span>
            </template>
            <el-menu-item-group :title="t(`hint.information`)">
              <el-menu-item index="user/info" route="/zone/user/info">{{ $t(`navigation.userInfo`) }}</el-menu-item>
              <el-menu-item index="account/info" route="/zone/account/info">{{ $t(`navigation.accountInfo`) }}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu v-if="!(!!isAdmin)" index="manage">
            <template #title>
              <el-icon>
                <Management/>
              </el-icon>
              <span>{{ $t(`navigation.manage`) }}</span>
            </template>
            <el-menu-item-group :title="t(`hint.manage`)">
              <el-menu-item index="manage/user" route="/zone/manage/user">{{ $t(`navigation.manageUser`) }}</el-menu-item>
              <el-menu-item index="manage/post" route="/zone/manage/post">{{ $t(`navigation.managePost`) }}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="setting" route="/zone/setting">
            <el-icon>
              <Setting/>
            </el-icon>
            <span>{{ $t(`navigation.setting`) }}</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
:deep(.el-aside) {
  --el-aside-width: 200px
}

:deep(.el-menu) {
  border-right: 0
}

:deep(.el-main) {
  --el-main-padding: 10px;
}
</style>
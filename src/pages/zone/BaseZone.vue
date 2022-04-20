<script lang="ts" setup>
import {HomeFilled, Management, Menu as IconMenu, Setting} from '@element-plus/icons-vue'
import {useRoute, useRouter} from 'vue-router'
import {computed, onUnmounted, ref} from "vue";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";

const router = useRouter();
const route = useRoute();
const store = useStore();
const {t} = useI18n()
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
  //TODO IMPLEMENT
  switch (route.fullPath) {
    case '/zone/':
      return 'zone'
    case '/zone':
      return 'zone'
    case '/zone/user/info':
      return 'user/info'
    case '/zone/manage':
      return 'manage'
    case '/zone/setting':
      return 'setting'
    default:
      return 'setting'
  }
}

function resize() {
  if (window.outerWidth / window.outerHeight < 1) {
    isCollapse.value = true
  } else {
    isCollapse.value = window.outerWidth < 768;
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
    <el-aside>
      <el-affix :offset="80">
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
            <span>{{ $t(`navigation.home`) }}</span>
          </el-menu-item>
          <el-sub-menu index="user">
            <template #title>
              <el-icon>
                <icon-menu/>
              </el-icon>
              <span>{{ $t(`navigation.centre`) }}</span>
            </template>
            <el-menu-item-group :title="t(`hint.information`)">
              <el-menu-item index="user/info" route="/zone/user/info">{{ $t(`navigation.userInfo`) }}</el-menu-item>
              <el-menu-item index="account/info" route="/error">{{ $t(`navigation.accountInfo`) }}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item v-if="!(!!isAdmin)" index="manage" route="/zone/manage">
            <el-icon>
              <Management/>
            </el-icon>
            <span>{{ $t(`navigation.manage`) }}</span>
          </el-menu-item>
          <el-menu-item index="setting" route="/zone/setting">
            <el-icon>
              <Setting/>
            </el-icon>
            <span>{{ $t(`navigation.setting`) }}</span>
          </el-menu-item>
        </el-menu>
      </el-affix>
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-aside :deep {
  --el-aside-width: 200px
}

.el-menu :deep {
  border-right: 0
}

.el-main :deep {
  --el-main-padding: 10px;
}
</style>
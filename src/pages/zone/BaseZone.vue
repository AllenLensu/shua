<script lang="ts" setup>
import {HomeFilled, Management, Menu as IconMenu, Setting} from '@element-plus/icons-vue'
import {useRoute, useRouter} from 'vue-router'
import {computed, onUnmounted, ref} from "vue";
import {useStore} from "vuex";

const router = useRouter();
const route = useRoute();
const store = useStore();
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
    case '/zone/':
      return 'zone'
    case '/zone/user/info':
      return 'user/info'
    case '/zone/manage':
      return 'manage'
    default:
      return 'zone'
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
            <span>主页</span>
          </el-menu-item>
          <el-sub-menu index="user">
            <template #title>
              <el-icon>
                <icon-menu/>
              </el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item-group title="资料">
              <el-menu-item index="user/info" route="/zone/user/info">个人信息</el-menu-item>
              <el-menu-item disabled index="2-2">账户信息</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item v-if="!(!!isAdmin)" index="manage" route="/zone/manage">
            <el-icon>
              <Management/>
            </el-icon>
            <span>管理</span>
          </el-menu-item>
          <el-menu-item disabled index="setting">
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
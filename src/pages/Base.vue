<script lang="ts" setup>
import {computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {UserFilled} from '@element-plus/icons-vue'
import {useStore} from "vuex";
import {logout} from "../configs/services.js";
import {onBeforeRouteLeave, useRouter} from "vue-router";

const {locale} = useI18n()
const store = useStore()
const router = useRouter()
const accountLevel = ref(0)

const toggle = () => {
  if (locale.value == 'zh_CN') {
    locale.value = 'en_US'
  } else {
    locale.value = 'zh_CN'
  }
  store.dispatch("toggleLang")
}

const loginOut = async () => {
  await logout()
  await store.dispatch('clearCurrentUser')
  router.push('/account')
}

const currentUser = computed(() => store.state.currentUser.value)
const accountInfo = computed(() => store.state.currentUser.profile)

</script>

<template>
  <el-affix>
    <div class="bar">
      <router-link to="/">
        <div class="logo">
          <img alt="SHUA" height="24" src="../assets/shua.svg"/>
        </div>
      </router-link>
      <div class="menu">
        <div class="grid-content">
          <el-menu
              :router="true"
              class="el-menu-horizontal"
              mode="horizontal"
          >
            <el-menu-item index="/" route="/">{{ $t(`navigation.home`) }}</el-menu-item>
            <el-menu-item index="/chat" route="/chat">{{ $t(`navigation.chat`) }}</el-menu-item>
            <el-menu-item index="/zone" route="/zone">
              {{ $t(`navigation.zone`) }}
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <el-popover
          :content="$t(`tip.langList`)"
          :show-arrow="false"
          :title="$t(`language.title`)"
          :width="200"
          placement="bottom"
          trigger="hover"
      >
        <template #reference>
          <el-button style="margin-left: 20px; margin-right: 20px; vertical-align: middle" @click="toggle">
            {{ $t(`language.language`) }}
          </el-button>
        </template>
      </el-popover>
      <router-link to="/account">
        <el-popover
            :content="$t(`tip.wait4support`)"
            :show-arrow="false"
            :title="$t(`hint.account`)"
            :width="200"
            placement="bottom"
            trigger="hover"
        >
          <template v-if="currentUser">
            <el-space direction="vertical">
              <p>欢迎你，{{ currentUser.username }}</p>
              <p>经验值：{{ accountInfo.experience }}</p>
              <el-button @click="loginOut">登出</el-button>
            </el-space>
          </template>
          <template v-else>
            尚未登录
          </template>
          <template #reference>
            <div class="account">
              <el-avatar :fit="`fill`" :icon="UserFilled" :size="32" :src="currentUser?.avatar"
                         shape="circle"></el-avatar>
            </div>
          </template>
        </el-popover>
      </router-link>
    </div>
  </el-affix>
  <router-view></router-view>
</template>

<style scoped>
button {
  color: cornflowerblue;
}

.el-menu-horizontal {
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
  border-bottom: 0;
  border-right: none;
}

.grid-content {
  font-family: HYVIVO, sans-serif;
  align-items: center;
  justify-content: flex-end;
}

a:link {
  text-transform: none;
}

a:visited {
  text-transform: none;
}

a:hover {
  background: transparent;
  text-transform: uppercase;
}

.bar {
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  width: 100%;
  align-items: center;
  background-color: white;
}

.logo {
  display: flex;
  font-family: vivoB, sans-serif;
  vertical-align: middle;
  align-items: center;
  min-height: 50px;
  padding-left: 10px;
  flex-shrink: 0;
}

.menu {
  flex-grow: 1;
  flex-shrink: 1;
}

.account {
  margin-right: 10px;
  flex-shrink: 0;
}

</style>
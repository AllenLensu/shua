<script lang="ts" setup>
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {UserFilled} from '@element-plus/icons-vue'

const {locale} = useI18n()
const activeIndex = ref('/')

const handleNav = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const toggle = () => {
  if (locale.value == 'zh_CN') {
    locale.value = 'en_US'
  } else {
    locale.value = 'zh_CN'
  }
}
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
              :default-active="activeIndex"
              :router="true"
              class="el-menu-horizontal"
              mode="horizontal"
              @select="handleNav"
          >
            <el-menu-item index="1" route="/">{{ $t(`navigation.home`) }}</el-menu-item>
            <el-menu-item index="2" route="/zone">
              {{ $t(`zone.zone`) }}
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <el-popover
          :content="$t(`language.more`)"
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
            :show-arrow="false"
            :title="$t(`account.account`)"
            :content="$t(`language.more`)"
            :width="200"
            placement="bottom"
            trigger="hover"
        >
          <template #reference>
            <div class="account">
              <el-avatar :fit="`fill`" :icon="UserFilled" :size="32" shape="circle"></el-avatar>
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
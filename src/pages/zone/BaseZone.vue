<script lang="ts" setup>
import {
  HomeFilled,
  Menu as IconMenu,
  Setting,
  Management
} from '@element-plus/icons-vue'
import {checkAuthentication} from '../../configs/services.js'
import {useRouter} from 'vue-router'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const router = useRouter();

(async () => {
  try {
    const response = await checkAuthentication()
  } catch (e) {
    router.push('/account')
  }
})()

/**
 * {
 *   "success": true,
 *   "data": {
 *     "username": "hello",
 *     "phoneNumber": "1101110110"
 *   }
 * }
 * 401: // 跳转登录
 * 403: // 提示没有权限
 *
 * {
 *   "success": false,
 *   "data": null,
 *   "errorMessage": "请先登录！",
 *   "errorCode": ""
 * }
 */

</script>

<template>
  <el-container>
    <el-aside>
      <el-affix :offset="80">
        <el-menu
            :router="true"
            default-active="1"
            @close="handleClose"
            @open="handleOpen"
        >
          <el-menu-item index="1" route="/zone/">
            <el-icon>
              <HomeFilled/>
            </el-icon>
            <span>主页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <icon-menu/>
              </el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item-group title="资料">
              <el-menu-item index="2-1" route="/zone/user/info">个人信息</el-menu-item>
              <el-menu-item disabled index="2-2">账户信息</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="3" route="/zone/manage">
            <el-icon>
              <Management/>
            </el-icon>
            <span>管理</span>
          </el-menu-item>
          <el-menu-item disabled index="4">
            <el-icon>
              <Setting/>
            </el-icon>
            <span>设置</span>
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
<script lang="ts" setup>
import {findMenusWithChildren} from '../../configs/services.js'
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

interface SubMenu {
  id: number;
  name: string;
  tag: string;
  description: string;
}

interface Menu extends SubMenu {
  submenus?: SubMenu[];
  icon: string;
}

const route = useRoute();
const menus = ref<Menu[]>([])

onMounted(async () => {
  menus.value = await findMenusWithChildren()
})


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


const {id: menuId = '1', pid: parentMenuId} = route.params

const getActiveIndex = (): string => {
  switch (route.fullPath) {
    case '/':
      return 'home';
    case '/star':
      return 'star'
    default:
      return parentMenuId != null ? `${parentMenuId}-${menuId}` : `${menuId}`
  }
}

</script>

<template>
  <el-container>
    <el-aside width="200px">
      <el-scrollbar max-height="90vh">
        <el-menu
            :default-active="getActiveIndex()"
            :default-openeds="parentMenuId ? [parentMenuId] : []"
            :router="true"
            @close="handleClose"
            @open="handleOpen"
        >
          <el-menu-item index="home" route="/">
            <el-icon>
              <FullScreen />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="star" route="/star">
            <el-icon>
              <Star />
            </el-icon>
            <span>心选</span>
          </el-menu-item>
          <template v-for="menu of menus">
            <el-sub-menu
                v-if="menu.submenus && menu.submenus.length !== 0"
                :key="''+menu.id"
                :index="''+menu.id"
            >
              <template #title>
                <el-icon>
                  <component :is="menu.icon"/>
                </el-icon>
                <span>{{ menu.tag }}</span>
              </template>
              <el-menu-item
                  v-for="submenu of menu.submenus"
                  :key="`${menu.id}-${submenu.id}`"
                  :index="`${menu.id}-${submenu.id}`"
                  :route="`/content/${menu.id}/${submenu.id}`"
              >
                {{ submenu.tag }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item
                v-else
                :key="''+menu.id"
                :index="''+menu.id"
                :route="`/content/${menu.id}`">
              <el-icon>
                <component :is="menu.icon"/>
              </el-icon>
              <span>{{ menu.tag }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-scrollbar max-height="90vh" style="width: 100%;">
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-scrollbar>
  </el-container>
  <ElBacktop/>
</template>

<style scoped>
.el-header :deep {
  --el-header-padding: 0px
}

.el-menu :deep {
  border-right: 0
}
</style>
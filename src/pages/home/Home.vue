<script lang="ts" setup>
import {findMenusWithChildren} from '../../configs/services.js'
import {onMounted, onUnmounted, ref} from "vue";
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
const scrollBarHeight = ref(window.innerHeight - 60)
const isCollapse = ref((window.outerWidth / window.outerHeight < 1) ? true : (window.outerWidth < 768))
const sidMenuWidth = ref(isCollapse.value ? '60px' : '200px')

onMounted(async () => {
  menus.value = await findMenusWithChildren()
})

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

function resize() {
  scrollBarHeight.value = window.innerHeight - 60;
  let woWidth = window.outerWidth;
  let woHeight = window.outerHeight;
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
            :default-openeds="parentMenuId ? [parentMenuId] : []"
            :router="true"
        >
          <el-menu-item index="home" route="/">
            <el-icon>
              <FullScreen/>
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="star" route="/star">
            <el-icon>
              <Star/>
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
    <el-scrollbar :max-height="scrollBarHeight" style="width: 100%;">
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
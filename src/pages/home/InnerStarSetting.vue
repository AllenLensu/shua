<script lang="ts" setup>
import {onBeforeMount, ref} from 'vue'
import {findMenusWithChildren, tagStatus} from '../../configs/services.js'
import CheckedTagGroup from "../../components/global/CheckedTagGroup.vue";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";

interface SubTag {
  id: number;
  tag: string;
  description: string;
}

interface Tag extends SubTag {
  submenus?: SubTag[];
  icon: string;
}

const tags = ref<Tag[]>([])
const {t} = useI18n()
const router = useRouter()
const tagStateRef = ref([])
const scrollBarHeight = ref(window.innerHeight - 60);

(async () => {
  tagStateRef.value = (await tagStatus()).data
})()

onBeforeMount(async () => {
  tags.value = (await findMenusWithChildren()).filter(it => {
    return it.submenus.length > 0
  })
})

const submitHandler = () => {
  window.location.reload()
}

const tosettingButton = () => {
  router.push('/zone/setting')
}
</script>

<template>
  <el-scrollbar :max-height="scrollBarHeight">
    <div style="display: flex;justify-content: space-between">
      <el-button class="main-button" type="primary" @click="submitHandler">{{
          $t(`config.finish`)
        }}
      </el-button>
      <el-button class="main-button icon-button" type="primary" @click="tosettingButton">{{
          $t(`hint.detailSetting`)
        }}
      </el-button>
    </div>
    <h6/>
    <el-space direction="vertical" fill style="justify-content: center">
      <CheckedTagGroup
          v-for="items in tags"
          :key="items.tag"
          :state="tagStateRef"
          :tags="items"
      />
    </el-space>
  </el-scrollbar>
</template>

<style scoped>
.el-space__item :deep {
  justify-content: center;
}

.main-button {
  position: relative;
  font-family: YKH55, sans-serif;
  display: inline-block;
  background-color: #409EFF;
  border: 2px solid transparent;
  border-radius: 5px;
  color: #FFF;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}

.main-button:hover,
.main-button:focus {
  background-color: #fff;
  border: 2px solid #409EFF;
  color: #409EFF;
}

.main-button.icon-button:hover,
.main-button.icon-button:focus {
  padding-right: 45px;
}

.main-button.icon-button:after :deep {
  content: "\f178";
  font-family: FontAwesome, ui-serif;
  position: absolute;
  width: 30px;
  right: 8px;
  text-align: center;
  opacity: 0;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}

.main-button.icon-button:hover:after,
.main-button.icon-button:focus:after {
  opacity: 1;
}
</style>
<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {findMenusWithChildren} from '../../../../configs/services.js'
import CheckedTagGroup from "../../../../components/global/CheckedTagGroup.vue";
import {ArrowLeft} from "@element-plus/icons-vue";
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
const scrollBarHeight = ref(window.innerHeight - 100)
const handleBack = () => {
  router.go(-1)
}

onMounted(async () => {
  tags.value = (await findMenusWithChildren()).filter(it => {
    return it.submenus.length > 0
  })
})
</script>

<template>
  <el-scrollbar :max-height="scrollBarHeight">
  <el-page-header :content="t(`hint.starSetting`)" :icon="ArrowLeft" :title="t(`config.back`)" @back="handleBack"/>
  <h6/>
    <el-space direction="vertical" fill style="justify-content: center">
      <CheckedTagGroup
          v-for="items in tags"
          :key="items.tag"
          :tags="items"
      />
    </el-space>
  </el-scrollbar>
</template>

<style scoped>
.el-space__item :deep {
  justify-content: center;
}
</style>
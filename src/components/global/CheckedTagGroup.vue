<script lang="ts" setup>
import {defineProps, ref} from "vue";
import CheckedTag from "./CheckedTag.vue";
import aMessageBox from "../box/tipBox.ts";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const props = defineProps<{
  tags: any
}>()
const groupCheckedRef = ref(false)

const handleStarAll = () => {
  aMessageBox(t(`tip.tip`), t(`tip.wait4support`), 'OK')
}
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        {{ props.tags.tag }}
        <el-checkbox v-model="groupCheckedRef" :label="t(`navigation.starall`)" border/>
      </div>
    </template>
    <el-space size="large">
      <CheckedTag
          v-for="subItem in props.tags.submenus"
          :key="subItem.tag"
          :tag="subItem"/>
    </el-space>
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
}
</style>
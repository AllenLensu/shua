<script lang="ts" setup>
import {defineProps, reactive, ref} from "vue";
import {useI18n} from "vue-i18n";
import {every, values} from "lodash";
import {saveTagStatus} from "../../configs/services.js"

const {t} = useI18n()
const props = defineProps<{
  tags: any,
  state: any
}>()

const checkedState = []
props.tags.submenus.forEach(tag => {
  checkedState[tag.id] = false
})
props.state.forEach(element => {
  checkedState[element.typeId] = true
})

const checkedKeys = reactive(checkedState)
const isCheckedAll = ref(every(values(checkedKeys), Boolean));
props.tags.submenus.forEach(tag => {
  isCheckedAll.value = !!checkedState[tag.id];
})
const asyncCheckedTags = (checked) => {
  if (checked) {
    isCheckedAll.value = every(values(checkedKeys), Boolean)
  } else {
    isCheckedAll.value = false
  }
  saveTagStatus(checkedKeys)
}

const handleCheckedAllChange = (checked) => {
  for (const tag of props.tags.submenus) {
    checkedKeys[tag.id] = checked
  }
  saveTagStatus(checkedKeys)
}
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        {{ props.tags.tag }}
        <el-checkbox v-model="isCheckedAll" :label="t(`navigation.starall`)" border @change="handleCheckedAllChange"/>
      </div>
    </template>
    <el-space size="large">
      <el-check-tag
          v-for="tag in props.tags.submenus"
          :checked="checkedKeys[tag.id]"
          @change="(checked) => {
            checkedKeys[tag.id] = checked
            asyncCheckedTags(checked)
          }"
      >
        {{ tag.tag }}
      </el-check-tag>
    </el-space>
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
}
</style>
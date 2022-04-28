<script lang="ts" setup>
import {defineProps, ref, watch} from "vue";

const props = defineProps<{
  tag: any
  selectAll?: boolean
  onChange: (checked: boolean) => void
}>()

const checkedRef = ref(false)

const handleCheck = (checked: boolean) => {
  console.log(checked)
  checkedRef.value = checked
  // 发送网络请求
}

watch(() => props.selectAll, (selectAll) => {
  checkedRef.value = selectAll;
  // 发送网络请求
})
</script>

<template>
  <el-check-tag
      :checked="checkedRef"
      @change="handleCheck"
  >
    {{ props.tag.tag }}
  </el-check-tag>
</template>

<style scoped>
:deep(.el-check-tag) {
  font-weight: normal;
}
</style>
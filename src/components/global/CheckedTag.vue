<script lang="ts" setup>
import {defineProps, ref} from "vue";

const props = defineProps<{
  tag: any
}>()

const checkedRef = ref(false)

const handleCheck = (checked: boolean) => {
  console.log(checked)
  checkedRef.value = checked
}
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
.el-check-tag :deep {
  font-weight: normal;
}
</style>
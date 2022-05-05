<script lang="ts" setup>
import {defineProps} from "vue";

const props = defineProps<{
  uuid: any,
  message: any
}>()
</script>

<template>
  <div v-if="props?.uuid === props.message.receive" class="right-side">
    <el-card>
      {{ message.message }}
    </el-card>
  </div>
  <div v-else class="left-side">
    <el-card>
      {{ message.message }}
    </el-card>
  </div>
</template>

<style scoped>
.left-side {
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
}

.right-side {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}

:deep(.el-card__body) {
  padding: 10px;
}
</style>
<script lang="ts" setup>
import {UserFilled} from '@element-plus/icons-vue'
import {defineProps} from "vue";

const props = defineProps<{
  test: any
}>()
</script>

<template>
  <el-space direction="vertical" size="small">
    <el-card shadow="hover">
      <el-space size="large">
        <el-avatar :icon="UserFilled"/>
        <el-space direction="vertical"
                  style="border-bottom: 1px;align-items: flex-start;">
          <div style="max-width: 150px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
            USERNAME
            {{ props.test }}
          </div>
          <div style="display: flex;justify-content: space-between;font-size: smaller;color: grey;">
            <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width: 100px">
              LAST MESSAGE
            </div>
            <div>
              TIME
            </div>
          </div>
        </el-space>
      </el-space>
    </el-card>
  </el-space>
</template>

<style scoped>
.el-card :deep {
  border: 0;
}
</style>
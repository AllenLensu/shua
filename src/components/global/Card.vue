<script lang="ts" setup>
import {CirclePlus} from '@element-plus/icons-vue'
import {defineProps, onMounted} from "vue";
import {useI18n} from 'vue-i18n'
import {ElMessageBox, ElMessage} from 'element-plus'
import type {Action} from 'element-plus'
import Vditor from "vditor";

const props = defineProps<{
  post: any
}>()
const {t} = useI18n()

const waiting = () => {
  ElMessageBox({
    title: t(`tip.tip`),
    message: t(`tip.waiting`),
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}

onMounted(() => {
  let element = document.getElementById(String(props.post.contentid))
  Vditor.preview(element as HTMLDivElement,props.post.content)
})

</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <div class="card-header-plus">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
            <img alt="avatar" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
          <div style="margin-left: 12px;">
            {{ props.post.uid }}
            <br/>
            {{ $t(`content.description`) }}
          </div>
        </div>
        <el-space wrap>
          <el-button :icon="CirclePlus" class="button" type="text" @click="waiting">{{ $t(`content.star`) }}</el-button>
          <font-awesome-icon :icon="['fas', 'audio-description']" :mask="['far', 'circle']"/>
        </el-space>
      </div>
    </template>
    <div class="text item" :id="post.contentid"></div>
  </el-card>
</template>

<style scoped>
button {
  font-family: YKH55, vivoL, sans-serif;
  font-size: 14px;
}

.card-header-plus {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.card-header {
  font-family: YKH65, vivoR, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-family: YKH55, vivoL, sans-serif;
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
}

</style>
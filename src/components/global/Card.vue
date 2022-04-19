<script lang="ts" setup>
import {defineProps, onMounted} from "vue";
import {useI18n} from 'vue-i18n'
import Vditor from "vditor";
import aMessageBox from "../box/requireImplement";
import moment from "moment";

const props = defineProps<{
  post: any
}>()
const {t} = useI18n()

onMounted(() => {
  let element = document.getElementById(String(props.post.contentid))
  Vditor.preview(element as HTMLDivElement, props.post.content)
})

const starHandler = () => {
  aMessageBox(t(`tip.tip`), t(`tip.wait4support`), 'OK')
}

const errorHandler = () => {
  aMessageBox(t(`tip.tip`), t(`tip.wait4support`), 'OK')
}

</script>

<template>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <div class="card-header-plus">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
            <img alt="avatar" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
          <div style="margin-left: 12px;">
            {{ props.post.uid }}
            <div class="text timePosition">
              {{ props.post.signature }}
              <el-divider direction="vertical"/>
              {{ moment(props.post.sendTime).toNow() }}
            </div>
          </div>
        </div>
        <el-button class="button" @click="starHandler">
          <el-space>
            <font-awesome-icon :icon="['fas', 'plus']" :mask="['far', 'circle']"/>
            {{ $t(`config.follow`) }}
          </el-space>
        </el-button>
      </div>
    </template>
    <div :id="post.contentid" class="text item"></div>
    <el-divider/>
    <div class="optionPosition">
      <el-button class="button" @click="errorHandler">
        <el-space>
          <font-awesome-icon :icon="['fas', 'star']" :mask="['far', 'circle']"/>
          {{ $t(`config.star`) }}
        </el-space>
      </el-button>
      <el-button class="button" @click="errorHandler">
        <el-space>
          <font-awesome-icon :icon="['fas', 'comment-alt']" :mask="['far', 'circle']"/>
          {{ $t(`config.comment`) }}
        </el-space>
      </el-button>
      <el-button class="button" @click="errorHandler">
        <el-space>
          <font-awesome-icon :icon="['fas', 'thumbs-up']" :mask="['far', 'circle']"/>
          {{ $t(`config.thumbsup`) }}
        </el-space>
      </el-button>
    </div>

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

.timePosition {
  text-align: left;
}

.optionPosition {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  align-content: center;
}

.box-card {
  width: auto;
}

</style>
<script lang="ts" setup>
import {defineProps, withDefaults} from "vue"
import {useRouter} from "vue-router";

const router = useRouter()

const props = withDefaults(defineProps<{
  code?: string,
  message?: string
}>(), {code: '404', message: 'NOT FOUND'})

const prevButton = () => {
  router.go(-1)
}
</script>

<template>
  <div class="error">
    <font-awesome-icon :icon="['fas', 'bugs']" size="5x"/>
    <div class="txt">
      <p>{{ $t(`tip.bugs`) }}</p>
      <p>{{ props.code + ': ' + props.message }}</p>
      <el-button class="main-button icon-button" type="primary" @click="prevButton">{{
          $t(`config.back`)
        }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc((100vh - 58px) / 2);
}

.txt {
  display: flex;
  flex-direction: column;
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
  padding-left: 45px;
}

.main-button.icon-button:after :deep {
  content: "\f177";
  font-family: FontAwesome, ui-serif;
  position: absolute;
  width: 30px;
  left: 8px;
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
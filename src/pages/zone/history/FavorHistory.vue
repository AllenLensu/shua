<script lang="ts" setup>
import {ref} from "vue";
import {cfGetHistory} from "../../../configs/services.js"
import {useStore} from "vuex";
import HistoryCard from "../../../components/global/HistoryCard.vue";

const favorHistory = ref();
const store = useStore();

(async () => {
  favorHistory.value = (await cfGetHistory()).data
  console.log(favorHistory.value)
})();
</script>

<template>
  <el-scrollbar height="85vh">
    <el-space direction="vertical" fill size="large" style="width: 100%;">
      <div v-for="post in favorHistory" :key="`var_` + post.contentid">
        <HistoryCard :post="post"/>
      </div>
    </el-space>
  </el-scrollbar>
</template>

<style scoped>

</style>
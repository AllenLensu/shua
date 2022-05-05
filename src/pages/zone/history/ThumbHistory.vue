<script lang="ts" setup>
import {ref} from "vue";
import {ctGetHistory} from "../../../configs/services.js"
import {useStore} from "vuex";
import HistoryCard from "../../../components/global/HistoryCard.vue";

const thumbHistory = ref();
const store = useStore();

(async () => {
  thumbHistory.value = (await ctGetHistory()).data
})();
</script>

<template>
  <el-scrollbar height="85vh">
    <el-space direction="vertical" fill size="large" style="width: 100%;">
      <div v-for="post in thumbHistory" :key="`var_` + post.contentid">
        <HistoryCard :post="post"/>
      </div>
      <el-empty :description="$t(`tip.unhistory`)"/>
    </el-space>
  </el-scrollbar>
</template>

<style scoped>

</style>
<script lang="ts" setup>
import {computed, ref} from "vue";
import {ccGetHistory} from "../../../configs/services.js"
import {useStore} from "vuex";
import CommentHistoryCard from "../../../components/global/CommentHistoryCard.vue";

const commentHistory = ref();
const store = useStore();
const info = computed(() => store.state.currentUser.value);

(async () => {
  commentHistory.value = (await ccGetHistory(info.value?.username)).data
})();
</script>

<template>
  <el-scrollbar height="85vh">
    <el-space direction="vertical" fill size="large">
      <div v-for="post in commentHistory" :key="`var_` + post.contentid">
        <el-card shadow="hover">
          {{ post.comment }}
          <el-divider/>
          <CommentHistoryCard :post="post"/>
        </el-card>
      </div>
    </el-space>
    <el-empty :description="$t(`tip.unhistory`)"/>
  </el-scrollbar>
</template>

<style scoped>

</style>
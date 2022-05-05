<script lang="ts" setup>
import {
  getBanner,
  getFollowedNum,
  getFollowNum,
  getPostNum,
  getTodayFollowedNum,
  getTodayFollowNum,
  getTodayPostNum,
  postHistory
} from "../../../configs/services.js"
import {computed, onBeforeMount, ref} from "vue";
import {useStore} from "vuex";
import AccountPanelZone from "../../../components/global/AccountPanelZone.vue";
import HistoryPostCard from "../../../components/global/HistoryPostCard.vue";

const store = useStore();
const bannerList = ref();
const info = computed(() => store.state.currentUser.value);
const postNum = ref(0);
const tdPostNum = ref(0);
const followNum = ref(0);
const tdFollowNum = ref(0);
const followedNum = ref(0);
const tdFollowedNum = ref(0);
const postList = ref();

(async () => {
  const {data} = await postHistory()
  postList.value = data
})();

(async () => {
  const {data} = await getPostNum()
  postNum.value = data
})();

(async () => {
  const {data} = await getTodayPostNum()
  tdPostNum.value = data
})();

(async () => {
  const {data} = await getFollowNum()
  followNum.value = data
})();

(async () => {
  const {data} = await getTodayFollowNum()
  tdFollowNum.value = data
})();

(async () => {
  const {data} = await getFollowedNum()
  followedNum.value = data
})();

(async () => {
  const {data} = await getTodayFollowedNum()
  tdFollowedNum.value = data
})();

onBeforeMount(async () => {
  bannerList.value = (await getBanner()).data
})
</script>

<template>
  <el-scrollbar height="85vh">
  <div class="block">
    <span class="demonstration"> </span>
    <el-carousel autoplay height="30vh" type="card">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <el-image :src="`/assets/banner/` + item.path" fit="cover"/>
      </el-carousel-item>
    </el-carousel>
  </div>
  <h6/>
  <AccountPanelZone
      :followNum="followNum"
      :followedNum="followedNum"
      :postNum="postNum"
      :tdFollowNum="tdFollowNum"
      :tdFollowedNum="tdFollowedNum"
      :tdPostNum="tdPostNum"
  />
  <el-space direction="vertical" fill style="width: 100%;margin-top: 30px;">
    <div v-for="post in postList" :key="`var_`+postList.sendTime">
      <HistoryPostCard :post="post"/>
    </div>
  </el-space>
  </el-scrollbar>
</template>

<style scoped>
</style>
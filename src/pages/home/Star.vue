<script lang="ts" setup>
import Card from "../../components/global/Card.vue";
import {ref, watch} from "vue";
import {findStarPost} from "../../configs/services.js";
import {useRoute} from "vue-router";

const route = useRoute()
const props = defineProps<{
  pid?: string
  id?: string
}>()
const postList = ref([])
const postListLoading = ref(false);
const postListError = ref(null)
const postCalc = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const totalPost = ref(0)

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  postCalc.value = postList.value.slice((val - 1) * pageSize.value + 1, (val) * pageSize.value + 1)
}

// 当参数更改时获取用户信息
(async () => {
  try {
    postListLoading.value = true
    postList.value = (await findStarPost()).data
    postListLoading.value = false
    totalPost.value = postList.value.length
    postCalc.value = postList.value.slice(0, pageSize.value + 1)
  } catch (e) {
    postListLoading.value = false
    postListError.value = e
  }
})()

</script>

<template>
  <el-space :size="20" direction="vertical" fill>
    <div v-for="post in postCalc" :key="post.contentid">
      <Card :post="post"/>
    </div>
  </el-space>
  <h6/>
  <ElPagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :background="true"
      :total="totalPost"
      layout="total, prev, pager, next, jumper"
      style="display: flex;justify-content: center;"
      @current-change="handleCurrentChange"
  />
</template>

<style scoped>
</style>
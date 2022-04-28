<script lang="ts" setup>
import Card from "../../../components/global/Card.vue";
import {ref, watch} from "vue";
import {findPosts, findPostsTime} from "../../../configs/services.js";
import {useRoute} from "vue-router";
import CreatePost from "../../../components/global/CreatePost.vue";

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
const totalPost = ref(0);
const postShowType = ref(localStorage.getItem("isPopularity") ?? "true")
const isPopularity = ref(postShowType.value == "true")

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  postCalc.value = postList.value.slice((val - 1) * pageSize.value + 1, (val) * pageSize.value + 1)
}

// 当参数更改时获取用户信息
(async () => {
  try {
    const {id: menuId = '0', pid: parentMenuId} = route.params
    postListLoading.value = true
    if (postShowType.value == "true") {
      postList.value = await findPosts(menuId)
    } else {
      postList.value = await findPostsTime(menuId)
    }
    postListLoading.value = false
    totalPost.value = postList.value.length
    postCalc.value = postList.value.slice(0, pageSize.value + 1)
  } catch (e) {
    postListLoading.value = false
    postListError.value = e
  }
})()

// 当参数更改时获取用户信息
watch(
    () => route.params,
    async params => {
      const {id: menuId = '0'} = route.params
      if (postShowType.value == "true") {
        postList.value = await findPosts(menuId)
      } else {
        postList.value = await findPostsTime(menuId)
      }
      totalPost.value = postList.value.length
      postCalc.value = postList.value.slice(0, pageSize.value + 1)
    }
)

const switchShow = async () => {
  if (postShowType.value == "true") {
    postShowType.value = "false"
    isPopularity.value = false
  } else {
    postShowType.value = "true"
    isPopularity.value = true
  }
  localStorage.setItem("isPopularity", postShowType.value)
  window.location.reload()
}

</script>

<template>
  <CreatePost/>
  <div style="margin-top: 1%;margin-bottom: 1%">
    <el-button v-if="isPopularity" class="main-button" type="primary" @click="switchShow">
      {{ $t(`config.popularity`) }}
    </el-button>
    <el-button v-else class="main-button" type="primary" @click="switchShow">
      {{ $t(`config.time`) }}
    </el-button>
  </div>
  <div v-if="isPopularity">
    <el-space :size="20" direction="vertical" fill>
      <div v-for="post in postCalc" :key="'content_serialize' + post.hot">
        <Card :post="post"/>
      </div>
    </el-space>
  </div>
  <div v-else>
    <el-space :size="20" direction="vertical" fill>
      <div v-for="post in postCalc" :key="'content_serialize' + post.sendTime">
        <Card :post="post"/>
      </div>
    </el-space>
  </div>
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
</style>
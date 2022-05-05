<script lang="ts" setup>
import Card from "../../components/global/Card.vue";
import {computed, ref} from "vue";
import {findStarPost} from "../../configs/services.js";
import {useRouter} from "vue-router";
import StarSetting from "./InnerStarSetting.vue";
import {useStore} from "vuex";

const router = useRouter()
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
const drawer = ref(false)
const store = useStore()

const handleCurrentChange = (val: number) => {
  postCalc.value = postList.value.slice((val - 1) * pageSize.value + 1, (val) * pageSize.value + 1)
}
const settingButton = () => {
  const isLogin = computed(() => store.state.currentUser.value)
  if (isLogin.value) {
    drawer.value = true
  } else {
    router.push('/account')
  }
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
  <el-button class="main-button icon-button" type="primary" @click="settingButton">{{
      $t(`hint.toSetting`)
    }}
  </el-button>
  <h6/>
  <el-space :size="20" direction="vertical" fill>
    <div v-for="post in postCalc" :key="post.contentid">
      <Card :post="post"/>
    </div>
  </el-space>
  <h6/>
  <ElPagination
      v-if="!postCalc"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :background="true"
      :total="totalPost"
      layout="total, prev, pager, next, jumper"
      style="display: flex;justify-content: center;"
      @current-change="handleCurrentChange"
  />
  <div v-else>
    <el-empty :description="$t(`tip.slogan`)"/>
  </div>
  <el-drawer v-model="drawer" :close-on-click-modal="false" :close-on-press-escape="false" :with-header="false"
             size="40%">
    <StarSetting/>
  </el-drawer>
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

.main-button.icon-button:hover,
.main-button.icon-button:focus {
  padding-right: 45px;
}

:deep(.main-button.icon-button:after) {
  content: "\f178";
  font-family: FontAwesome, ui-serif;
  position: absolute;
  width: 30px;
  right: 8px;
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
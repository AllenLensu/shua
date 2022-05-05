<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ArrowLeft, UserFilled} from "@element-plus/icons-vue";
import {findUserInfoZone, getUserInfoZone, getUserPostZone} from "../../configs/services.js";
import {ref} from "vue";
import UserZoneAside from "./UserZoneAside.vue";
import Card from "../../components/global/Card.vue";

const props = defineProps<{
  uid: any,
  helper?: any
}>()
const router = useRouter();
const scrollBarHeight = ref(window.innerHeight - 60);
const userInfoRef = ref();
const userPostRef = ref();

const handleBack = () => {
  router.go(-1)
};

(async () => {
  if (props.helper) {
    const res = await getUserInfoZone(props.helper, props.uid);
    if (res.success) {
      userInfoRef.value = res.data[0]
    }
  } else {
    const res = await findUserInfoZone(props.uid)
    if (res.success) {
      userInfoRef.value = res.data[0]
    }
  }
  const res2 = await getUserPostZone(props.uid)
  if (res2.success) {
    userPostRef.value = res2.data
  }
})();
</script>

<template>
  <el-scrollbar :max-height="scrollBarHeight" style="margin-left: 10%;padding-right: 10%;">
    <el-page-header :content="$t(`hint.userHome`)" :icon="ArrowLeft" :title="$t(`config.back`)" @back="handleBack"/>
    <h6/>
    <el-container>
      <el-aside width="300px">
        <div class="aside-style">
          <el-avatar :alt="props.uid" :fit="`fill`" :icon="UserFilled" :size="120"
                     :src="'/assets/avatar/' + userInfoRef?.avatar"
                     shape="circle"></el-avatar>
          <UserZoneAside :uid="props.uid" :userInfo="userInfoRef"/>
        </div>
      </el-aside>
      <el-main>
        <el-scrollbar height="75vh">
          <el-space direction="vertical" fill style="width: 100%">
          <div v-for="post in userPostRef" :key="post.contentid + `_post`">
            <Card :post="post"/>
          </div></el-space>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-scrollbar>
</template>

<style scoped>
.aside-style {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-content: center;
}
</style>
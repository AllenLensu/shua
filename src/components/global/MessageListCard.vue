<script lang="ts" setup>
import {defineProps} from "vue";
import {UserFilled} from '@element-plus/icons-vue';
import moment from "moment";
import {useRouter} from "vue-router";

const props = defineProps<{
  item: any
}>()

const router = useRouter()
const routeHandler = () => {
  router.push('/mes/' + props.item.uid)
}
</script>

<template>
  <el-card shadow="hover" @click="routeHandler">
    <el-space size="large">
      <el-avatar :alt="props.item.uid" :fit="`fill`" :icon="UserFilled" :size="32"
                 :src="'/assets/avatar/' + props.item.avatar"
                 shape="circle"></el-avatar>
      <el-space direction="vertical" style="display: flex;align-items: flex-start;">
      <div>{{ props.item.uid }}</div>
        <div>{{ moment(props.item.time).toNow() }}</div>
      </el-space>
    </el-space>
  </el-card>
</template>

<style scoped>

</style>
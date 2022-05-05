<script lang="ts" setup>
import moment from "moment";
import {defineProps} from "vue";

const props = defineProps<{
  userInfo: any,
  uid: any
}>()

</script>

<template>
  <el-space direction="vertical">
    <p>{{ props.uid }}</p>
    <el-space>
      <p>关注&nbsp;&nbsp;{{ props.userInfo?.followNum }}</p>
      <el-divider direction="vertical"/>
      <p>粉丝&nbsp;&nbsp;{{ props.userInfo?.followedNum }}</p>
    </el-space>
  </el-space>
  <el-space direction="vertical" style="display: flex;align-items: flex-start;">
    <el-space style="display: flex;align-items: flex-start;justify-content: flex-start;">
      <el-popover :content="$t(`accountAttr.gender`)" placement="top" trigger="hover">
        <template #reference>
          <font-awesome-icon :fixed-width="true" :icon="['fas', 'venus-mars']" :mask="['far', 'circle']"/>
        </template>
      </el-popover>
      <span>{{ props.userInfo?.gender ? $t(`accountAttr.sex.male`) : $t(`accountAttr.sex.female`) }}</span>
    </el-space>
    <el-space style="display: flex;align-items: flex-start;justify-content: flex-start;">
      <el-popover :content="$t(`accountAttr.birthday`)" placement="top" trigger="hover">
        <template #reference>
          <font-awesome-icon :fixed-width="true" :icon="['fas', 'birthday-cake']" :mask="['far', 'circle']"/>
        </template>
      </el-popover>
      <span>{{ moment(props.userInfo?.birthday).format("YYYY-MM-DD") }}</span>
    </el-space>
    <el-space style="display: flex;align-items: flex-start;justify-content: flex-start;">
      <el-popover :content="$t(`accountAttr.signature`)" placement="top" trigger="hover">
        <template #reference>
          <font-awesome-icon :fixed-width="true" :icon="['fas', 'signature']" :mask="['far', 'circle']"/>
        </template>
      </el-popover>
      <span>{{ props.userInfo?.signature ?? "这个用户很懒，什么都没留下" }}</span>
    </el-space>
    <el-space style="display: flex;align-items: flex-start;justify-content: flex-start;">
      <el-popover :content="$t(`accountAttr.introduction`)" placement="top" trigger="hover">
        <template #reference>
          <font-awesome-icon :fixed-width="true" :icon="['fas', 'bullhorn']" :mask="['far', 'circle']"/>
        </template>
      </el-popover>
      <span>{{ props.userInfo?.introduction ?? "这个用户很懒，什么都没留下" }}</span>
    </el-space>
  </el-space>
</template>

<style scoped>

</style>
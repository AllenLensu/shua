<script lang="ts" setup>
import {defineProps} from "vue";

const props = defineProps<{
  postNum: any,
  tdPostNum: any,
  followNum: any,
  tdFollowNum: any,
  followedNum: any,
  tdFollowedNum: any
}>()
</script>

<template>
  <div class="base-panel">
    <div>关注</div>
    <el-badge v-if="props.tdFollowNum" :max="99" :value="`+`+props.tdFollowNum" class="item">
      <el-button class="show">{{ props.followNum }}</el-button>
    </el-badge>
    <el-button v-else class="show">{{ props.followNum }}</el-button>
    <el-divider direction="vertical"/>
    <div>粉丝</div>
    <el-badge v-if="props.tdFollowedNum" :max="99" :value="`+`+props.tdFollowedNum" class="item">
      <el-button class="show">{{ props.followedNum }}</el-button>
    </el-badge>
    <el-button v-else class="show">{{ props.followedNum }}</el-button>
    <el-divider direction="vertical"/>
    <div>帖子</div>
    <el-badge v-if="props.tdPostNum" :max="99" :value="`+`+props.tdPostNum" class="item">
      <el-button class="show">{{ props.postNum }}</el-button>
    </el-badge>
    <el-button v-else class="show">{{ props.postNum }}</el-button>
  </div>
</template>

<style scoped>
.base-panel {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 12vw;
  margin-right: 12vw;
}

.show {
  padding-left: 5%;
  padding-right: 5%;
  width: 50px;
}
</style>
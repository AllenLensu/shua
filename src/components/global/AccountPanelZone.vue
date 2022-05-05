<script lang="ts" setup>
import {defineProps, ref} from "vue";
import {getFollow, getFollowed, getFollowNum} from "../../configs/services.js";
import MiniUserCard from "./MiniUserCard.vue";

const props = defineProps<{
  postNum: any,
  tdPostNum: any,
  followNum: any,
  tdFollowNum: any,
  followedNum: any,
  tdFollowedNum: any
}>();
const followList = ref();
const followedList = ref();

(async () => {
  const {data} = await getFollowed();
  followedList.value = data
})();

(async () => {
  const {data} = await getFollow();
  followList.value = data
})();

const FollowNumHandler = async () => {
  const {data} = await getFollowNum()
  if (data !== props.followNum) {
    window.location.reload()
  }
}
</script>

<template>
  <div class="base-panel">
    <div>{{ $t(`config.follow`) }}</div>
    <el-badge v-if="props.tdFollowNum" :max="99" :value="`+`+props.tdFollowNum" class="item">
      <el-popover :width="300" placement="right" trigger="click" @hide="FollowNumHandler">
        <template #reference>
          <el-button class="show">{{ props.followNum }}</el-button>
        </template>
        <el-space direction="vertical" fill style="width: 100%">
          <div v-for="user in followList" :key="'user_' + user.uid">
            <MiniUserCard :ifFan="false" :user="user"/>
          </div>
        </el-space>
      </el-popover>
    </el-badge>
    <div v-else>
      <el-popover :width="300" placement="right" trigger="click" @hide="FollowNumHandler">
        <template #reference>
          <el-button class="show">{{ props.followNum }}</el-button>
        </template>
        <el-space direction="vertical" fill style="width: 100%">
          <div v-for="user in followList" :key="'user_' + user.uid">
            <MiniUserCard :ifFan="false" :user="user"/>
          </div>
        </el-space>
      </el-popover>
    </div>
    <el-divider direction="vertical"/>
    <div>{{ $t(`config.fan`) }}</div>
    <el-badge v-if="props.tdFollowedNum" :max="99" :value="`+`+props.tdFollowedNum" class="item">
      <el-popover placement="right" trigger="click">
        <template #reference>
          <el-button class="show">{{ props.followedNum }}</el-button>
        </template>
        <el-space direction="vertical" fill style="width: 100%">
          <div v-for="user in followedList" :key="'user_' + user.uid">
            <MiniUserCard :ifFan="true" :user="user"/>
          </div>
        </el-space>
      </el-popover>
    </el-badge>
    <div v-else>
      <el-popover placement="right" trigger="click">
        <template #reference>
          <el-button class="show">{{ props.followedNum }}</el-button>
        </template>
        <el-space direction="vertical" fill style="width: 100%">
          <div v-for="user in followedList" :key="'user_' + user.uid">
            <MiniUserCard :ifFan="true" :user="user"/>
          </div>
        </el-space>
      </el-popover>
    </div>
    <el-divider direction="vertical"/>
    <div>{{ $t(`config.post`) }}</div>
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
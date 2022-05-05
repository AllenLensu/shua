<script lang="ts" setup>
import {computed, defineProps, ref} from "vue";
import {UserFilled} from "@element-plus/icons-vue";
import aMessageBox from "../box/tipBox";
import {follow, unfollow} from "../../configs/services.js"
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";

const props = defineProps<{
  user: any,
  ifFan: any
}>()
const {t} = useI18n();
const store = useStore();
const isFollow = ref(true);
const currentUser = computed(() => store.state.currentUser.value);

const starHandler = async () => {
  if (!currentUser.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), t(`config.confirm`))
  } else if ((await follow(props.user.uid)).success) {
    isFollow.value = true
  }
}

const unstarHandler = async () => {
  if (!currentUser.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), t(`config.confirm`))
  } else if ((await unfollow(props.user.uid)).success) {
    isFollow.value = false
  }
}
</script>

<template>
  <el-space size="large" style="display: flex;justify-content: space-between;">
    <el-space>
      <router-link :to="`/user/` + props.user.uid">
        <el-avatar :alt="props.user.uid" :fit="`fill`" :icon="UserFilled" :size="32"
                   :src="'/assets/avatar/' + props.user.avatar"
                   shape="circle"></el-avatar>
      </router-link>
      <div>{{ props.user.uid }}</div>
    </el-space>
    <div v-if="!props.ifFan">
      <el-button v-if="isFollow" class="button" @click="unstarHandler">
        <el-space>
          <font-awesome-icon :icon="['fas', 'check']" :mask="['far', 'circle']"/>
          {{ $t(`config.followed`) }}
        </el-space>
      </el-button>
      <el-button v-else class="button" @click="starHandler">
        <el-space>
          <font-awesome-icon :icon="['fas', 'plus']" :mask="['far', 'circle']"/>
          {{ $t(`config.follow`) }}
        </el-space>
      </el-button>
    </div>
  </el-space>
</template>

<style scoped>
:deep(.el-space) {
  display: flex;
  align-items: flex-start;
}
</style>
<script lang="ts" setup>
import {computed, defineProps, onMounted, ref} from "vue";
import {useI18n} from 'vue-i18n'
import Vditor from "vditor";
import aMessageBox from "../box/tipBox.ts";
import moment from "moment";
import {useStore} from "vuex";
import {
  favor,
  follow,
  getFavorInfo,
  getFollowInfo,
  getThumbsInfo,
  thumbsdown,
  thumbsup,
  unfavor,
  unfollow
} from "../../configs/services.js"

const props = defineProps<{
  post: any
}>()
const {t} = useI18n()
const store = useStore()
const isFollow = ref(false);
const isFavor = ref(false);
const isThumbs = ref(false);

const currentUser = computed(() => store.state.currentUser.value);
(async () => {
  if (currentUser.value) {
    const {data} = await getFollowInfo(props.post.uid)
    isFollow.value = data
  }
})();

(async () => {
  if (currentUser.value) {
    const {data} = await getFavorInfo(props.post.contentid)
    isFavor.value = data
  }
})();

(async () => {
  if (currentUser.value) {
    const {data} = await getThumbsInfo(props.post.contentid)
    isThumbs.value = data
  }
})();

onMounted(() => {
  let element = document.getElementById(String(props.post.contentid))
  Vditor.preview(element as HTMLDivElement, props.post.content)
})


const starHandler = async () => {
  if (!currentUser.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), 'OK')
  } else if ((await follow(props.post.uid)).success) {
    isFollow.value = true
  }
}

const unstarHandler = async () => {
  if (!currentUser.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), 'OK')
  } else if ((await unfollow(props.post.uid)).success) {
    isFollow.value = false
  }
}

const favorHandler = async () => {
  if (!currentUser.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), 'OK')
  } else if ((await favor(props.post.contentid)).success) {
    isFavor.value = true
  }
}

const unfavorHandler = async () => {
  if (!currentUser.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), 'OK')
  } else if ((await unfavor(props.post.contentid)).success) {
    isFavor.value = false
  }
}

const thumbsupHandler = async () => {
  if (!currentUser.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), 'OK')
  } else if ((await thumbsup(props.post.contentid)).success) {
    isThumbs.value = true
  }
}

const thumbsdownHandler = async () => {
  if (!currentUser.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), 'OK')
  } else if ((await thumbsdown(props.post.contentid)).success) {
    isThumbs.value = false
  }
}

const errorHandler = () => {
  aMessageBox(t(`tip.tip`), t(`tip.wait4support`), 'OK')
}

</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <div class="card-header-plus">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
            <img alt="avatar" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
          <div style="margin-left: 12px;">
            {{ props.post.uid }}
            <div class="text timePosition">
              {{ props.post.signature }}
              <el-divider direction="vertical"/>
              {{ moment(props.post.sendTime).toNow() }}
            </div>
          </div>
        </div>
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
    </template>
    <div :id="post.contentid" class="text item"></div>
    <el-divider/>
    <div class="optionPosition">
      <el-button v-if="isFavor" class="button" color="#E6A23C" @click="unfavorHandler">
        <el-space>
          <font-awesome-icon :icon="['fas', 'star']" :inverse="true" :mask="['far', 'circle']"/>
          <div style="color: #F2F6FC">{{ $t(`config.stared`) }}</div>
        </el-space>
      </el-button>
      <el-button v-else class="button" @click="favorHandler">
        <el-space>
          <font-awesome-icon :icon="['fas', 'star']" :mask="['far', 'circle']"/>
          {{ $t(`config.star`) }}
        </el-space>
      </el-button>
      <el-button class="button" @click="errorHandler">
        <el-space>
          <font-awesome-icon :icon="['fas', 'comment-alt']" :mask="['far', 'circle']"/>
          {{ $t(`config.comment`) }}
        </el-space>
      </el-button>
      <el-button v-if="isThumbs" class="button" color="#F56C6C" @click="thumbsdownHandler">
        <el-space>
          <font-awesome-icon :icon="['fas', 'thumbs-up']" :inverse="true" :mask="['far', 'circle']"/>
          <div style="color: #F2F6FC">{{ $t(`config.thumbsup`) }}</div>
        </el-space>
      </el-button>
      <el-button v-else class="button" @click="thumbsupHandler">
        <el-space>
          <font-awesome-icon :icon="['fas', 'thumbs-up']" :mask="['far', 'circle']"/>
          {{ $t(`config.thumbsdown`) }}
        </el-space>
      </el-button>
    </div>

  </el-card>
</template>

<style scoped>
.card-header-plus {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.card-header {
  font-family: YKH65, vivoR, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-family: YKH55, vivoL, sans-serif;
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.timePosition {
  text-align: left;
}

.optionPosition {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  align-content: center;
}

</style>
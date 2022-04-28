<script lang="ts" setup>
import {
  favor,
  findPost,
  follow,
  getComment, getCommentNum,
  getFavorInfo,
  getFollowInfo, getShortUrl,
  getThumbsInfo,
  thumbsdown,
  thumbsup,
  unfavor,
  unfollow
} from "../../configs/services.js"
import {computed, defineProps, onMounted, onUnmounted, ref} from "vue";
import {useI18n} from 'vue-i18n'
import Vditor from "vditor";
import aMessageBox from "../../components/box/tipBox.ts";
import moment from "moment";
import {useStore} from "vuex";
import {ArrowLeft, UserFilled} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import CreateComment from "../../components/global/CreateComment.vue";
import CommentCard from "../../components/global/CommentCard.vue";
import Clipboard from "clipboard";

const scrollBarHeight = ref(window.innerHeight - 80)

const {t} = useI18n()
const store = useStore()
const isFollow = ref(false);
const isFavor = ref(false);
const isThumbs = ref(false);
const router = useRouter()
const postRef = ref({});
const commentNum = ref(0);
const avatar = ref("");
const props = defineProps<{
  postId: any
}>();
const shareUrl = ref(`http://localhost:18000/#/detail/`+props.postId);
const shortShareUrl = ref('');

(async () => {
  shortShareUrl.value = await getShortUrl(`http://localhost:18000/#/detail/` + props.postId)
})();
const handleBack = () => {
  router.go(-1)
}
const commentRef = ref({});
let clipboard;

onMounted(async () => {
  const {data} = await findPost(props.postId)
  postRef.value = data
  avatar.value = "/assets/avatar/" + postRef.value.avatar
  const element = document.getElementById(String(props.postId))
  await Vditor.preview(element as HTMLDivElement, postRef.value.content)
});

onMounted(async () => {
  const {data} = await getComment(props.postId)
  commentRef.value = data
});

const currentUser = computed(() => store.state.currentUser.value);

(async () => {
  if (currentUser.value) {
    const {data} = await getFollowInfo(postRef.value.uid)
    isFollow.value = data
  }
})();

(async () => {
  if (currentUser.value) {
    const {data} = await getFavorInfo(props.postId)
    isFavor.value = data
  }
})();

(async () => {
  if (currentUser.value) {
    const {data} = await getThumbsInfo(props.postId)
    isThumbs.value = data
  }
})();

(async () => {
  const {data} = await getCommentNum(props.postId)
  commentNum.value = data ?? 0
})();

const starHandler = async () => {
  if (!currentUser.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), 'OK')
  } else if ((await follow(postRef.value.uid)).success) {
    isFollow.value = true
  }
}

const unstarHandler = async () => {
  if (!currentUser.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), 'OK')
  } else if ((await unfollow(postRef.value.uid)).success) {
    isFollow.value = false
  }
}

const favorHandler = async () => {
  if (!currentUser.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), 'OK')
  } else if ((await favor(props.postId)).success) {
    isFavor.value = true
  }
}

const unfavorHandler = async () => {
  if (!currentUser.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), 'OK')
  } else if ((await unfavor(props.postId)).success) {
    isFavor.value = false
  }
}

const thumbsupHandler = async () => {
  if (!currentUser.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), 'OK')
  } else if ((await thumbsup(props.postId)).success) {
    isThumbs.value = true
  }
}

const thumbsdownHandler = async () => {
  if (!currentUser.value) {
    aMessageBox(t(`tip.tip`), t(`tip.requireLogin`), 'OK')
  } else if ((await thumbsdown(props.postId)).success) {
    isThumbs.value = false
  }
}

onMounted(() => {
  clipboard = new Clipboard(`#shareButton${props.postId}`)
  clipboard.on("success", async (event) => {
    await aMessageBox(t(`tip.tip`), t(`tip.hasCopy`) + ` : ` + event.text, 'OK')
  })
  clipboard.on("error", async (event) => {
    await aMessageBox(t(`tip.tip`), t(`tip.error`) + ` : ` + event, 'OK')
  })

})
onUnmounted(() => {
  clipboard.destroy()
})
</script>

<template>
  <el-scrollbar :max-height="scrollBarHeight" style="margin-left: 10%;padding-right: 10%;">
    <el-page-header :content="t(`hint.detail`)" :icon="ArrowLeft" :title="t(`config.back`)" @back="handleBack"/>
    <h6/>
    <el-card>
      <template #header>
        <div class="card-header">
          <div class="card-header-plus">
            <el-avatar :fit="`fill`" :icon="UserFilled" :size="32"
                       :src="avatar"
                       shape="circle"></el-avatar>
            <div style="margin-left: 12px;">
              {{ postRef.uid }}
              <div class="text timePosition">
                {{ postRef.signature }}
                <el-divider direction="vertical"/>
                {{ moment(postRef.sendTime).toNow() }}
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
      <div :id="'' + postId" class="text item"></div>
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
        <el-button class="button" :id="`shareButton${props.postId}`" :data-clipboard-text="shortShareUrl || shareUrl">
          <el-space>
            <font-awesome-icon :icon="['fas', 'share-alt']"/>
            {{ $t(`config.share`) }}
          </el-space>
        </el-button>
      </div>
    </el-card>
    <h6/>
    <CreateComment :postId="props.postId" :commentNum="commentNum"/>
    <el-space direction="vertical" fill size="large" style="width: 100%;">
      <div v-for="comment in commentRef" :key="comment.floor">
        <CommentCard :comment="comment"/>
      </div>
    </el-space>
  </el-scrollbar>
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
<script lang="ts" setup>
import {addPost, findTags} from '../../configs/services.js'
import {useRouter} from "vue-router";
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import aMessageBox from "../box/tipBox.ts";
import aMessage from "../box/tipMes.ts";

interface SubTag {
  value: number;
  label: string;
}

interface Tag extends SubTag {
  children?: SubTag[];
}

const tags = ref<Tag[]>([])
const store = useStore();
const router = useRouter();
const contentTypeRef = ref([])
const {t} = useI18n();
const textAreaRef = ref(localStorage.getItem('temPost') ?? '')
const cascaderAttr = {
  expandTrigger: 'hover',
}

const sendButton = async () => {
  if (!contentTypeRef.value) {
    return await aMessageBox(t(`tip.error`), t(`tip.finishArea`), t(`config.confirm`))
  } else {
    const verifyInfo = computed(() => store.state.currentUser.value)
    if (!verifyInfo.value) {
      router.push('/account')
    } else {
      const response = await addPost(textAreaRef.value, contentTypeRef.value)
      if (response.success) {
        localStorage.removeItem('temPost')
        await aMessage(t(`tip.sendSuccess`))
        router.go(0)
      }
    }
  }
}

const goImprove = async () => {
  router.push('/editor')
}

onMounted(async () => {
  tags.value = await findTags();
})

onUnmounted(async () => {
  localStorage.setItem('temPost', textAreaRef.value)
})
</script>

<template>
  <div style="margin-bottom: 20px;">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-space>
            <el-cascader
                v-model="contentTypeRef"
                :options="tags"
                :placeholder="$t(`placeholder.selectTag`)"
                :props="cascaderAttr"
                clearable
            />
            <el-button class="main-button" type="primary" @click="goImprove">
              {{ $t(`navigation.experience`) }}
            </el-button>
          </el-space>
          <el-button class="main-button icon-button" type="primary" @click="sendButton">
            {{ $t(`config.send`) }}
          </el-button>
        </div>
      </template>
      <el-input
          v-model="textAreaRef"
          :autosize="{ minRows: 3, maxRows: 5 }"
          :placeholder="t(`placeholder.postContent`)"
          resize="none"
          type="textarea"
      />
    </el-card>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

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

.main-button.icon-button:after :deep {
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
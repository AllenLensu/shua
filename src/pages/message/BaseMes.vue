<script lang="ts" setup>
import {Search} from "@element-plus/icons-vue";
import MessageListCard from "../../components/global/MessageListCard.vue"
import {computed, onUnmounted, ref} from 'vue'
import {addChatList, dumpHelper, getChatList, getMesList} from "../../configs/services.js";
import aMessageBox from "../../components/box/tipBox";
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";

interface LinkItem {
  value: string
  link: string
}

const lists = ref<LinkItem[]>([]);
const chatList = ref();
const chooseRef = ref();
const duplicateRef = ref();
const {t} = useI18n();
const store = useStore();
const username = ref();

(async () => {
  const info = computed(() => store.state.currentUser.value)
  if (info.value) {
    username.value = info.value.username
  }
})();

(async () => {
  const {data} = await getMesList()
  lists.value = data
})();

(async () => {
  const {data} = await dumpHelper()
  duplicateRef.value = data
})();


const timeoutID = ref();

let updateChatListCallback = async () => {
  const {data} = await getChatList()
  chatList.value = data
  timeoutID.value = setTimeout(updateChatListCallback, 1000)
}

updateChatListCallback()

onUnmounted(() => {
  clearTimeout(timeoutID.value)
})

const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
      ? lists.value.filter(createFilter(queryString))
      : lists.value;
  cb(results)
}

const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const handleSelect = (item: LinkItem) => {
  chooseRef.value = item.value;
}

const addHandler = () => {
  if (!chooseRef.value) {
    aMessageBox(t(`tip.tip`), t(`tip.null`), t(`config.confirm`))
    return;
  }
  if (chooseRef.value === username.value) {
    aMessageBox(t(`tip.tip`), t(`tip.unself`), t(`config.confirm`))
    return;
  }
  const result2 = duplicateRef.value.find(item => item === chooseRef.value)
  if (result2) {
    aMessageBox(t(`tip.tip`), t(`tip.duplicateUsername`), t(`config.confirm`))
    return;
  }
  const result = lists.value.find(item => item.value === chooseRef.value)
  if (!result) {
    aMessageBox(t(`tip.tip`), t(`tip.invalidname`), t(`config.confirm`))
    return;
  }
  addChatList(chooseRef.value)
}
</script>

<template>
  <div style="margin-left: 50px;margin-right: 50px">
    <el-container>
      <el-aside width="300px">
        <div style="display: flex;flex-direction: column">
          <el-space style="margin-bottom: 20px">
            <div class="widget search-widget">
              <el-autocomplete
                  v-model="chooseRef"
                  :fetch-suggestions="querySearchAsync"
                  :prefix-icon="Search"
                  class="input"
                  :placeholder="t(`config.search`)"
                  @select="handleSelect"
              />
            </div>
            <el-button type="primary" @click="addHandler">{{ $t(`navigation.add`) }}</el-button>
          </el-space>
          <el-scrollbar height="80vh">
            <el-space direction="vertical" fill style="width: 90%;">
              <div v-for="item in chatList" :key="item">
                <MessageListCard :item="item"/>
              </div>
            </el-space>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-main style="min-width: 500px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.widget.search-widget {
  position: relative
}

.widget.search-widget .input {
  padding-right: 60px;
}

.widget.search-widget button {
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  width: 40px;
  background-color: transparent;
  border: none;
}

.widget.search-widget .input:focus + button {
  color: #FF6700;
}
</style>
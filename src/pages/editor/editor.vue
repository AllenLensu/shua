<script lang="ts" setup>
import {addPost, findTags} from '../../configs/services.js'
import {useRouter} from "vue-router";
import {computed, onMounted, ref} from 'vue';
import {useI18n} from "vue-i18n";
import Vditor from 'vditor';
import './index.css';
import {useStore} from "vuex";
import {ArrowLeft} from "@element-plus/icons-vue";
import aMessageBox from "../../components/box/tipBox.ts";

interface SubTag {
  value: number;
  label: string;
}

interface Tag extends SubTag {
  children?: SubTag[];
}

const vditor = ref<Vditor | null>(null);
const tags = ref<Tag[]>([])
const store = useStore();
const router = useRouter();
const contentTypeRef = ref([])
const {t} = useI18n();
const cascaderAttr = {
  expandTrigger: 'hover',
}
const handleBack = () => {
  router.go(-1)
}

const sendButton = async () => {
  if (!contentTypeRef.value) {
    return await aMessageBox(t(`tip.error`), t(`tip.finishArea`), t(`config.confirm`))
  } else {
    const verifyInfo = computed(() => store.state.currentUser.value)
    if (!verifyInfo.value) {
      router.push('/account')
    } else {
      const response = await addPost(vditor.value.getValue(), contentTypeRef.value)
      if (response.success) {
        localStorage.removeItem('temPost')
        router.go(0)
      }
    }
  }
}

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    icon: 'ant',
    placeholder: t(`placeholder.postContent`),
    after: () => {
      const content = localStorage.getItem('temPost') ?? ''
      if (content) {
        vditor.value!.setValue(content);
      }
    },
    cache: {
      id: "temPost",
      enable: true
    },
    counter: {
      enable: true,
      type: "markdown",
    },
    toolbar: [
      "emoji",
      "headings",
      "bold",
      "italic",
      "strike",
      "link",
      {
        hotkey: '⇧⌘S',
        name: 'picture',
        tipPosition: 'nw',
        tip: '插入图片',
        className: 'left',
        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M96 896a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h832a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32H96zm315.52-228.48-68.928-68.928a32 32 0 0 0-45.248 0L128 768.064h778.688l-242.112-290.56a32 32 0 0 0-49.216 0L458.752 665.408a32 32 0 0 1-47.232 2.112zM256 384a96 96 0 1 0 192.064-.064A96 96 0 0 0 256 384z"></path></svg>',
        click() {
          vditor.value.insertValue('![img](https://)')
        },
      },
      "|",
      "list",
      "ordered-list",
      "check",
      "outdent",
      "indent",
      "|",
      "quote",
      "line",
      "code",
      "inline-code",
      "insert-before",
      "insert-after",
      "table",
      "|",
      "undo",
      "redo",
      "|",
      "edit-mode",
      "preview",
      "fullscreen",
    ],
    toolbarConfig: {
      hide: false,
      pin: false,
    },
  });
});

onMounted(async () => {
  tags.value = await findTags();
})
</script>

<template>
  <div class="global-position-fix">
    <el-page-header :content="t(`hint.uploadPost`)" :icon="ArrowLeft" :title="t(`config.back`)" @back="handleBack"/>
    <h6/>
    <div class="card-header">
      <el-space wrap>
        <el-cascader
            v-model="contentTypeRef"
            :options="tags"
            :placeholder="$t(`placeholder.selectTag`)"
            :props="cascaderAttr"
            clearable
        />
      </el-space>
      <el-button class="main-button icon-button" type="primary" @click="sendButton">
        {{ $t(`config.send`) }}
      </el-button>
    </div>
    <div id="vditor"/>
  </div>
</template>

<style scoped>
.global-position-fix {
  margin-top: 5vh;
  margin-left: 10%;
  margin-right: 10%;
  min-width: 500px;
}

.card-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: -50px;
  margin-bottom: 24px;
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
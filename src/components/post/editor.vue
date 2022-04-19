<script lang="ts" setup>
import {checkAuthentication} from '../../configs/services.js'
import {useRouter} from "vue-router";
import {onMounted, ref} from 'vue';
import {useI18n} from "vue-i18n";
import Vditor from 'vditor';
import './index.css';

const vditor = ref<Vditor | null>(null);
let verifyInfo = ref<any>();
const router = useRouter();
const {t} = useI18n();

const sendButton = async () => {
  try {
    verifyInfo = await checkAuthentication()
  } catch (e) {
    router.push('/account')
  }
}

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    icon: 'ant',
    height: 300,
    placeholder: t(`placeholder.postContent`),
    after: () => {
      const content = localStorage.getItem('temPost')
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
</script>

<template>
  <div style="margin-bottom: 20px;">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ $t(`hint.uploadPost`) }}</span>
          <el-button class="main-button icon-button" type="primary" @click="sendButton">
            {{ $t(`config.send`) }}
          </el-button>
        </div>
      </template>
      <div id="vditor"/>
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
<script lang="ts" setup>
import {ref} from 'vue'
import {checkAuthentication} from '../../configs/services.js'
import {useRouter} from "vue-router";

let verifyInfo = ref<any>();
const router = useRouter();

const textarea = ref('');

const sendButton = async () => {
  try {
    verifyInfo = await checkAuthentication()
  } catch (e) {
    router.push('/account')
  }
}
</script>

<template>
  <div style="margin-bottom: 20px;">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ $t(`post.addPost`) }}</span>
          <router-link to="/post">
            <el-button class="main-button" type="primary">{{
                $t(`language.more`)
              }}
            </el-button>
          </router-link>
          <el-button class="main-button icon-button" type="primary" @click="sendButton">{{
              $t(`post.send`)
            }}
          </el-button>
        </div>
      </template>
      <el-input
          v-model="textarea"
          :placeholder="$t(`post.contentHint`)"
          resize="none"
          rows="4"
          type="textarea"
      >
      </el-input>
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
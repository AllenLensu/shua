<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="setting-box">
    <RouterLink to="/zone/star">
      <el-card shadow="hover">
        <el-space direction="vertical" fill>
          <div class="large-card-icon">
            <font-awesome-icon :icon="['fas', 'star-half-alt']" :mask="['far', 'circle']" size="2x"/>
          </div>
          <div style="padding: 14px">
            <span>{{ $t(`hint.starSetting`) }}</span>
          </div>
        </el-space>
      </el-card>
    </RouterLink>
  </div>
</template>

<style scoped>
.setting-box {
  display: grid;
  justify-items: center;
  grid-gap: 5px 5px;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: center;
}

.large-card-icon {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-bottom: 5%;
}

a:-webkit-any-link :deep {
  color: unset;
  cursor: pointer;
  text-decoration: unset;
}
</style>
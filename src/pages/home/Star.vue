<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {findStarTags} from '../../configs/services.js'

interface Tag {
  id: number;
  name: string;
  description: string;
  index: number;
  ex: number;
}

const tags = ref<Tag[]>([])
const closeHandler = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

onMounted(async () => {
  tags.value = await findStarTags()

  console.log(tags.value)
})

</script>

<template>
  <el-scrollbar style="padding-bottom: 12px">
    <el-space>
      <el-tag
          v-for="item in tags"
          :key="item.name"
          class="mx-1"
          closable
          effect="dark"
          type=""
          @close="closeHandler"
      >
        {{ item.tag }}
      </el-tag>
    </el-space>
  </el-scrollbar>
</template>

<style scoped>

</style>
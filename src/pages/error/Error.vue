<script lang="ts" setup>
import {defineProps, withDefaults} from "vue";

const user: {
  name: string,
  age: number | undefined,
} = {name: 'huike', age: undefined}

const hello = user.age

if (hello !== undefined) {
  const notNull : number = hello
}

const props = withDefaults(defineProps<{
  code?: string,
  message?: string
}>(), {code: '404', message: 'NOT FOUND'})

</script>

<template>
  <div class="error">
    <font-awesome-icon :icon="['fas', 'bugs']" size="5x" />
    喔唷，哗啦啦！<br>
    YaHoo, you can get some rest!<br>
    {{ props.code + ': ' + props.message }}
  </div>
</template>

<style scoped>
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc((100vh - 58px)/2);
}
</style>
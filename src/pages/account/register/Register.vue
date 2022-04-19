<script lang="ts" setup>
import '../multiplexed.css'
import {computed, ref, watch} from "vue";
import {useStore} from "vuex";

const store = useStore();
const stepCurrentActive = ref((computed(() => store.state.register.steps)).value)
watch(
    () => (computed(() => store.state.register.steps)).value,
    async value => {
      stepCurrentActive.value = (computed(() => store.state.register.steps)).value
    }
)
</script>

<template>
  <video id="video" autoplay loop muted playsinline>
    <source src="../../../assets/video/login.mp4" type="video/mp4">
  </video>


  <el-container class="container">
    <div class="box register page">
      <el-steps :active="stepCurrentActive" finish-status="success" process-status="finish" simple>
        <el-step :title="$t(`hint.initAccount`)"></el-step>
        <el-step :title="$t(`hint.improveAccount`)"></el-step>
        <el-step :title="$t(`hint.finishAccount`)"></el-step>
      </el-steps>
      <router-view></router-view>
    </div>
  </el-container>
</template>

<style scoped>

</style>
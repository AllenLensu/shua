<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {findAllUser} from "../../../configs/services.js";
import {useI18n} from 'vue-i18n'
import aMessageBox from '../../../components/box/requireImplement.ts'

const userInfo = ref([]);
const {t} = useI18n()

onMounted(async () => {
  // findAllUser().then(response => {
  //   return response.data
  // }).then(responseData => {
  //   userInfo.value = responseData
  // })
  userInfo.value = await findAllUser()
})

const handleClick = () => {
  aMessageBox(t(`tip.tip`), t(`tip.wait4support`), 'OK')
}

</script>

<template>
  <el-table :data="userInfo" height="calc(100vh - 98px)" row-key="id" stripe style="width: 100%" :default-sort="{ prop: 'name' }">
    <el-table-column :label="$t(`accountAttr.uuid`)" prop="id"/>
    <el-table-column sortable :label="$t(`accountAttr.name`)" prop="name" width="100px"/>
    <el-table-column :formatter="(row, column, cellValue, index) => {
      return cellValue ===0 ? 'MALE' : 'FEMALE'
    }" :label="$t(`accountAttr.gender`)" prop="gender" width="100px"/>
    <el-table-column sortable :label="$t(`accountAttr.age`)" prop="age" width="100px"/>
    <el-table-column sortable :formatter="(row, column, cellValue, index) => {
      return new Date(cellValue).toLocaleDateString()
    }" :label="$t(`accountAttr.birthday`)" prop="birthday" width="120px"/>
    <el-table-column :label="$t(`accountAttr.resident`)" prop="resident"/>
    <el-table-column :label="$t(`accountAttr.household`)" prop="household"/>
    <el-table-column fixed="right" :label="$t(`config.operation`)" width="120">
      <template #default>
        <el-button size="small" type="text" @click="handleClick"
        >{{ $t(`config.detail`) }}
        </el-button
        >
        <el-button size="small" type="text" @click="handleClick">{{ $t(`config.edit`) }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>
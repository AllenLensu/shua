<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {findAllUser} from "../../../configs/services";
import {useI18n} from 'vue-i18n'

const userInfo = ref([]);
const {t} = useI18n()

import { ElMessageBox, ElMessage } from 'element-plus'
import type { Action } from 'element-plus'

const waiting = () => {
  ElMessageBox({
    title: t(`tip.tip`),
    message: t(`tip.waiting`),
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}

onMounted(async () => {
  // findAllUser().then(response => {
  //   return response.data
  // }).then(responseData => {
  //   userInfo.value = responseData
  // })
  const response = await findAllUser();
  userInfo.value = response
})

const handleClick = () => {
  waiting()
}

</script>

<template>
  <el-table :data="userInfo" height="calc(100vh - 98px)" row-key="id" stripe style="width: 100%" :default-sort="{ prop: 'name' }">
    <el-table-column :label="$t(`manage.id`)" prop="id"/>
    <el-table-column sortable :label="$t(`manage.name`)" prop="name" width="100px"/>
    <el-table-column :formatter="(row, column, cellValue, index) => {
      return cellValue ===0 ? 'MALE' : 'FEMALE'
    }" :label="$t(`manage.sex`)" prop="gender" width="100px"/>
    <el-table-column sortable :label="$t(`manage.age`)" prop="age" width="100px"/>
    <el-table-column sortable :formatter="(row, column, cellValue, index) => {
      return new Date(cellValue).toLocaleDateString()
    }" :label="$t(`manage.birthday`)" prop="birthday" width="120px"/>
    <el-table-column :label="$t(`manage.resident`)" prop="resident"/>
    <el-table-column :label="$t(`manage.household`)" prop="household"/>
    <el-table-column fixed="right" :label="$t(`manage.operations`)" width="120">
      <template #default>
        <el-button size="small" type="text" @click="handleClick"
        >{{ $t(`manage.operation.detail`) }}
        </el-button
        >
        <el-button size="small" type="text" @click="handleClick">{{ $t(`manage.operation.edit`) }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>
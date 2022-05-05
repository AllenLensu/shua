<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {banPost, banUser, getAllPost, unbanPost, unbanUser} from "../../../configs/services.js";
import {useI18n} from 'vue-i18n'
import aMessageBox from "../../../components/box/tipBox";

const postInfo = ref([]);
const {t} = useI18n()

onMounted(async () => {
  postInfo.value = await getAllPost()
  console.log(postInfo.value)
})

const handleBan = (index) => {
  banPost(index)
  aMessageBox(t(`tip.tip`), t(`tip.success`), t(`config.confirm`))
}

const handleUnBan = (index) => {
  unbanPost(index)
  aMessageBox(t(`tip.tip`), t(`tip.success`), t(`config.confirm`))
}

const handleDetails = (index) => {
  aMessageBox(t(`hint.detail`), index, t(`config.confirm`))
}

</script>

<template>
  <el-table :data="postInfo" :default-sort="{ prop: 'contentid' }" height="calc(100vh - 98px)" row-key="id" stripe
            style="width: 100%">
    <el-table-column :label="$t(`accountAttr.id`)" sortable width="100" prop="contentid"/>
    <el-table-column :label="$t(`accountAttr.uuid`)" prop="uuid"/>
    <el-table-column :formatter="(row, column, cellValue, index) => {
    return cellValue.substring(0,15) + '...'
    }" :label="$t(`accountAttr.content`)" prop="content"/>
    <el-table-column :label="$t(`accountAttr.type`)" width="100" sortable prop="type"/>
    <el-table-column :label="$t(`accountAttr.extype`)" width="120" sortable prop="type_ex"/>
    <el-table-column :label="$t(`accountAttr.status`)" width="100" sortable prop="isBanned"/>
    <el-table-column :label="$t(`accountAttr.hot`)" width="120" sortable prop="hot"/>
    <el-table-column :label="$t(`config.operation`)" fixed="right">
      <template #default="scope">
        <el-button size="small" type="text" @click.prevent="handleDetails(scope.row.content)">
          {{ $t(`config.detail`) }}
        </el-button>
        <el-button size="small" type="text" @click.prevent="handleBan(scope.row.contentid)">
          {{ $t(`config.ban`) }}
        </el-button>
        <el-button size="small" type="text" @click.prevent="handleUnBan(scope.row.contentid)">
          {{ $t(`config.unban`) }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>
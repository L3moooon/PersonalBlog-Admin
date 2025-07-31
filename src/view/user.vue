<template>
  <div>
    <div>本栏用于管理后台所有注册用户</div>
    <el-table
      :data="userData"
      show-overflow-tooltip>
      <el-table-column
        prop="id"
        label="id"
        width="80"></el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"></el-table-column>
      <el-table-column
        prop="ip"
        label="ip"></el-table-column>
      <el-table-column
        prop="location"
        label="归属地"></el-table-column>
      <el-table-column
        prop="permission"
        label="权限"
        width="80"></el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"></el-table-column>
      <el-table-column
        prop="last_login_time"
        label="最后登录时间"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getList } from "/src/api/user";
const userData = ref();
const getUserList = async () => {
  const { data } = await getList();
  userData.value = data;
};
onMounted(() => {
  getUserList();
});
</script>

<style lang="scss" scoped></style>

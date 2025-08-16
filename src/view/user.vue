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
        label="归属地">
        <template #default="scope">
          <div v-if="scope.row.location">
            {{ scope.row.location.province }}-{{ scope.row.location.city }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="permission"
        label="权限"
        width="80"></el-table-column> -->
      <el-table-column
        prop="create_time"
        label="创建时间">
        <template #default="scope">
          {{ timeFormatter(scope.row.create_time) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="last_login_time"
        label="最后登录时间">
        <template #default="scope">
          {{ timeFormatter(scope.row.last_login_time) }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="120">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            inline-prompt
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="禁用"
            @change=""
            style="margin-right: 10px" />
          <el-button
            link
            type="primary"
            size="small"
            @click="editArticle(scope.row)">
            角色分配
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="delArticle(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getList } from "/src/api/user.js";
import { timeFormatter } from "../utils/timeFormatter";
const userData = ref();
const getUserList = async () => {
  const { data } = await getList();
  userData.value = data;
  console.log(userData.value);
};
onMounted(() => {
  getUserList();
});
</script>

<style lang="scss" scoped></style>

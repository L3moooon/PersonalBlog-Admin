<template>
  <div>
    <div>本栏用于管理前台文章所有评论</div>
    <el-table
      :data="commentData"
      show-overflow-tooltip>
      <el-table-column
        prop="article_id"
        label="文章id"
        width="80"></el-table-column>
      <el-table-column
        prop="title"
        label="评论文章"></el-table-column>
      <el-table-column
        prop="user_id"
        label="用户id"></el-table-column>
      <el-table-column
        prop="user_name"
        label="用户名"></el-table-column>
      <el-table-column
        prop="parent_id"
        label="回复用户id"></el-table-column>
      <el-table-column
        prop="content"
        label="评论内容"></el-table-column>
      <el-table-column
        prop="comment_date"
        label="评论时间">
        <template #default="scope">
          {{ timeFormatter(scope.row.comment_date) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="edit_date"
        label="最后编辑时间">
        <template #default="scope">
          {{ timeFormatter(scope.row.edit_date) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="like_count"
        label="点赞量"></el-table-column>
      <el-table-column
        prop="unlike_count"
        label="点踩量"></el-table-column>
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
            active-text="显示"
            inactive-text="隐藏"
            @change=""
            style="margin-right: 10px" />
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
import { getAllComments } from "../api/comment";
import { timeFormatter } from "../utils/timeFormatter";
const commentData = ref();
//获取评论列表
const getList = async () => {
  const { data } = await getAllComments();
  commentData.value = data;
  console.log(commentData.value);
};
onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped></style>

<template>
  <div>本栏用于管理前台所有发布的文章</div>
  <el-table
    :data="article"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="id" />
    <el-table-column
      prop="title"
      label="标题" />
    <el-table-column
      prop="cover_img"
      label="封面" />
    <el-table-column
      prop="abstract"
      label="简介" />
    <el-table-column
      prop="author_name"
      label="作者" />
    <el-table-column
      prop="publish_date"
      label="发布时间" />
    <el-table-column
      prop="last_edit_Date"
      label="最后更新时间" />
    <el-table-column
      prop="view"
      label="访问量" />
    <el-table-column
      prop="like"
      label="点赞量" />
  </el-table>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { getAllArticle } from "@/api/article";
const article = ref();
const getList = async () => {
  const { data } = await getAllArticle();
  console.log(data);
  article.value = data;
};
onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped></style>

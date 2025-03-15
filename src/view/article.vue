<template>
  <div>我是article</div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { getAllArticle } from "@/api/article";
onMounted(() => {});
const param = reactive({
  id: Number,
  time: Number,
  cover: String,
  comments: Number,
  view: Number,
});
const getList = async () => {
  const data = await getAllArticle(param);
};
</script>

<style lang="scss" scoped></style>

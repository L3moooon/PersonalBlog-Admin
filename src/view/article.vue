<template>
  <div class="article-container">
    <div class="title">本栏用于管理前台所有发布的文章</div>
    <div class="function">
      <el-button
        type="primary"
        @click="publishArticle">
        发布文章
      </el-button>
      <el-button
        type="primary"
        @click="tagManagement">
        标签管理
      </el-button>
      <span>日期筛选</span>
      <span>搜索</span>
    </div>
    <el-table
      :data="articleData"
      show-overflow-tooltip
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="80" />
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
        prop="tag"
        label="标签" />
      <el-table-column
        prop="publish_date"
        label="发布时间" />
      <el-table-column
        prop="last_edit_Date"
        label="最后更新时间" />
      <el-table-column
        prop="view"
        label="访问量"
        width="80" />
      <el-table-column
        prop="like"
        label="点赞量"
        width="80" />
      <el-table-column
        fixed="right"
        label="操作"
        min-width="120">
        <template #default="scope">
          <el-switch
            v-model="articleStatus"
            inline-prompt
            active-text="展示"
            inactive-text="隐藏"
            @change="changeStatus"
            style="margin-right: 10px" />
          <el-button
            link
            type="primary"
            size="small"
            @click="editArticle(scope.row)"
            >编辑</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="delArticle(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      fullscreen
      v-model="showArticleDialog"
      class="article-dialog"
      :show-close="false"
      title="编辑文章">
      <template #default>
        <EditArticle></EditArticle>
      </template>
    </el-dialog>
    <el-dialog
      v-model="showTagDialog"
      title="标签管理">
      <div class="tag-container">
        <el-tag
          v-for="item in tagList"
          :key="item.id"
          closable
          :disable-transitions="false"
          @close="handleClose(item.id)">
          {{ item.tag_name }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="inputRef"
          v-model="inputValue"
          class="w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm" />
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput">
          + 新增标签
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, nextTick } from "vue";
import { getAllArticle, getAllTag, addTag, delTag } from "@/api/article";
import EditArticle from "../components/editArticle.vue";
import { ElMessage } from "element-plus";

const articleData = ref();
const showArticleDialog = ref(false);
const showTagDialog = ref(false);
const articleStatus = ref(1); //文章状态

const tagList = ref([]);
const inputValue = ref("");
const inputVisible = ref(false);
const inputRef = ref(null);

const changeStatus = () => {};

const editArticle = (row) => {
  showArticleDialog.value = true;
};
const delArticle = (row) => {
  showArticleDialog.value = true;
};
const publishArticle = () => {
  showArticleDialog.value = true;
};
const tagManagement = async () => {
  showTagDialog.value = true;
  console.log(data);
};
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    inputRef.value.input.focus();
  });
};
//新增标签
const handleInputConfirm = async () => {
  if (inputValue.value) {
    // dynamicTags.value.push(inputValue.value);
    const { status } = await addTag({ name: inputValue.value });
    if (status == 1) {
      ElMessage.success("添加成功");
      getTagList();
    }
  }
  inputVisible.value = false;
  inputValue.value = "";
};
const handleClose = async (id) => {
  const { status } = await delTag({ id: id });
  if (status == 1) {
    ElMessage.success("删除成功");
    getTagList();
  }
};
const getArticleList = async () => {
  const { data } = await getAllArticle();
  console.log(data);
  articleData.value = data;
};
const getTagList = async () => {
  const { data } = await getAllTag();
  tagList.value = data;
  console.log(tagList.value);
};

onMounted(() => {
  getArticleList();
  getTagList();
});
</script>

<style lang="scss" scoped>
.article-container {
  padding: 10px;
  .title {
    height: 40px;
    color: aliceblue;
    font-size: 20px;
  }
  .function {
    margin-bottom: 10px;
  }
}

:deep(.el-dialog.article-dialog) {
  padding: 0;
  border-radius: 0;
  .el-dialog__header {
    height: 40px;
    padding: 0;
  }
}
.tag-container {
  display: flex;
  gap: 5px;
}
</style>

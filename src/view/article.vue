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
        label="封面">
        <template #default="scope">
          <el-image
            class="table-img"
            :src="scope.row.cover_img"
            alt="" />
        </template>
      </el-table-column>
      <el-table-column
        prop="abstract"
        label="简介" />
      <el-table-column
        prop="tag"
        label="标签">
        <template #default="scope">
          <div class="tag-container">
            <el-tag
              v-for="(item, index) in scope.row.tag"
              :key="index"
              :disable-transitions="false">
              {{ item.name }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="publish_date"
        label="发布时间">
        <template #default="scope">
          {{ timeFormatter(scope.row.publish_date) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="last_edit_Date"
        label="最后更新时间">
        <template #default="scope">
          {{ timeFormatter(scope.row.last_edit_date) }}
        </template>
      </el-table-column>
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
            v-model="scope.row.status"
            inline-prompt
            :active-value="1"
            :inactive-value="0"
            active-text="展示"
            inactive-text="隐藏"
            @change="changeStatus(scope.row)"
            style="margin-right: 10px" />
          <el-button
            link
            type="primary"
            size="small"
            @click="editArticle(scope.row)">
            编辑
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
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :total="articleData.length" /> -->
    <!-- 编辑文章 -->
    <el-dialog
      class="article-dialog"
      fullscreen
      v-model="showArticleDialog"
      @closed="clearData"
      :destroy-on-close="true"
      :show-close="false">
      <template #title>
        <div class="top">
          <el-button
            class="back"
            @click="back">
            <img
              src="/src/assets/icons/back.png"
              alt="" />
            <span>返回</span>
          </el-button>
          <div>{{ EditOrAdd ? "发布文章" : "编辑文章" }}</div>
        </div>
      </template>
      <template #default>
        <!-- <EditArticle
          :tagList="tagList"
          @Update:showArticleDialog="updateArticleDialog"
          :content="content"></EditArticle> -->
        <EditArticleByPlugin
          :tagList="tagList"
          @Update:showArticleDialog="updateArticleDialog"
          :content="content" />
      </template>
    </el-dialog>
    <!-- 标签管理 -->
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
import {
  getAllArticle,
  changeArticleStatus,
  delArticle as del,
  getAllTag,
  addTag,
  delTag,
} from "@/api/article";
import EditArticle from "../components/editArticle.vue";
import EditArticleByPlugin from "../components/editArticleByPlugin.vue";
import { timeFormatter } from "/src/utils/timeFormatter";
import { ElMessage } from "element-plus";

const articleData = ref();
const showArticleDialog = ref(false);
const showTagDialog = ref(false);

const tagList = ref([]);
const EditOrAdd = ref(0);
const content = ref(null);

const inputValue = ref("");
const inputVisible = ref(false);
const inputRef = ref(null);

const changeStatus = async (row) => {
  console.log(row);
  const { status } = await changeArticleStatus({
    id: row.id,
    status: row.status,
  });
  if (status == 1) {
    ElMessage.success("操作成功");
  }
};

const back = () => {
  //TODO 保留草稿功能
  showArticleDialog.value = false;
};

const editArticle = (row) => {
  EditOrAdd.value = 0;
  content.value = row;
  showArticleDialog.value = true;
};
const updateArticleDialog = (data) => {
  showArticleDialog.value = data;
  getArticleList();
};
const delArticle = async (row) => {
  const { status } = await del({ id: row.id });
  if (status == 1) {
    ElMessage.success("删除成功");
    getArticleList();
  }
};
const publishArticle = () => {
  showArticleDialog.value = true;
  EditOrAdd.value = 1;
};
const clearData = () => {
  console.log("清除数据");
  content.value = null;
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
  .table-img {
    width: 80px;
    height: 80px;
  }
}
.top {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 2;
  background-color: #ffffff;
  .back {
    position: absolute;
    left: 10px;
    img {
      width: 20px;
    }
  }
}
:deep(.el-dialog.article-dialog) {
  padding: 0;
  border-radius: 0;
  .el-dialog__header {
    height: 100px;
    padding: 0;
  }
}
.tag-container {
  display: flex;
  gap: 5px;
}
</style>

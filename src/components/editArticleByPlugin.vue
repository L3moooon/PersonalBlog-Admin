<template>
  <div class="edit-container">
    <QuillEditor
      theme="snow"
      v-model:content="form.content"
      :options="editorOptions"
      contentType="html" />
    <!-- 第二页 -->
    <div class="divide"></div>
    <div class="content">
      <div class="catalog"></div>
      <div class="pub-setting">
        <el-form
          :model="form"
          label-width="auto">
          <el-form-item label="添加标题">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="文章标签">
            <el-select
              v-model="form.tag"
              multiple
              placeholder="请选择"
              style="width: 240px">
              <el-option
                v-for="item in props.tagList"
                :key="item.id"
                :label="item.tag_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="添加封面">
            <div class="upload-container">
              <el-image
                v-if="form.cover_img"
                class="preview-img"
                :src="form.cover_img"
                fit="cover"
                limit="1"
                :preview-src-list="[form.cover_img]"></el-image>
              <el-upload
                class="uploader"
                :http-request="handleUploadPortrait"
                accept=".jpg,.png"
                :show-file-list="false"
                list-type="picture-card"
                :limit="1"
                :before-upload="beforeAvatarUpload">
                <img
                  class="add"
                  src="/src/assets/icons/add.png"
                  alt="" />
                <div class="tips">限制一张图片，新封面将覆盖旧封面</div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="文章简介">
            <el-input v-model="form.abstract" />
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio
                :value="0"
                size="large">
                仅自己可见
              </el-radio>
              <el-radio
                :value="1"
                size="large">
                所有人可见
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-button @click="submitArticle">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { addOrEditArticle } from "../api/article";
import { upload } from "/src/api/public";
import { ElMessage } from "element-plus";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
// 1. 注册需要的语言
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("html", xml); // HTML使用xml解析器
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
const props = defineProps(["tagList", "content"]);
const emits = defineEmits(["Update:showArticleDialog"]);
// 在组件初始化时添加
import Quill from "quill";

const Block = Quill.import("blots/block");
class CodeBlock extends Block {
  static formats(node) {
    return true;
  }
}
CodeBlock.blotName = "code-block";
CodeBlock.tagName = "PRE";
Quill.register(CodeBlock, true);
const form = reactive({
  title: "",
  tag: [],
  abstract: "",
  status: 0,
  cover_img: "",
  content: "",
});
const editorOptions = {
  modules: {
    toolbar: [
      // 工具栏配置
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [
        {
          "code-block": {
            language: ["javascript", "css", "json", "html", "plain"],
          },
        },
      ][({ header: 1 }, { header: 2 })], // 语言选择下拉菜单
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: ["#FF0000", "#00FF00", "#0000FF"] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["link", "image", "video"],
    ],
    // syntax: true, // 启用代码语法高亮
    syntax: {
      highlight: (text) =>
        hljs.highlightAuto(text, ["javascript", "css", "json", "html"]).value,
    },
  },
  placeholder: "请输入内容...",
  theme: "snow", // 或 'bubble' 简约主题
};
const handleUploadPortrait = async (e) => {
  const { file } = e;
  // 创建FormData对象
  const formData = new FormData();
  formData.append("file", file);
  // 调用封装好的request
  const { data, status } = await upload(formData);
  if (status == 1) {
    console.log(data);
    form.cover_img = data.url;
  }
};
const beforeAvatarUpload = () => {
  //检查格式
  return true;
};
onMounted(() => {
  Object.assign(form, props.content);
});
</script>

<style lang="scss" scoped>
.edit-container {
  min-height: calc(100vh - 40px);
  background-color: aliceblue;
  .content {
    // display: flex;
    // justify-content: center;
    width: 100%;
    // width: 50%;
    // min-width: 500px;
    // min-height: calc(100vh - 70px);
    // background-color: rgb(69, 73, 73);
    .catalog {
      width: 18%;
      position: fixed;
      background-color: beige;
      top: 80px;
      bottom: 0;
      left: 20px;
    }
    .text {
      width: 50%;
      margin: 10px auto;
      min-height: calc(100vh - 200px);
      padding: 10px;
      background-color: #fff;
      // background-color: rgb(69, 73, 73);
      caret-color: black;
      &:focus-visible {
        outline: none;
      }
    }
    .pub-setting {
      width: 50%;
      margin: 10px auto;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;
    }
  }
}
:deep(.bold) {
  font-weight: 500;
}
:deep(.red) {
  color: red;
}
.upload-container {
  display: flex;
  gap: 15px;
}
.preview-img {
  width: 148px;
  border-radius: 8px;
  display: flex;
  align-items: center;
}
.uploader {
  position: relative;
  .add {
    width: 50px;
    position: absolute;
    top: 30px;
    // padding: 120px;
  }
  .tips {
    position: absolute;
    bottom: 0;
    text-align: center;
  }
}
:deep(.ql-toolbar) {
  display: flex;
  justify-content: center;
  border: none;
}
:deep(.ql-container) {
  width: 50%;
  margin: 10px auto;
  min-height: calc(100vh - 200px);
  padding: 10px;
  background-color: #fff;
  caret-color: black;
  border: none;
  border-radius: 5px;
  box-sizing: content-box;
}
:deep(.ql-editor) {
  padding: 0;
  // height: 100%;
  // background-color: aqua;
  min-height: calc(100vh - 200px);
}
/* 在全局或组件样式中添加 */
:deep(.ql-syntax) {
  caret-color: #abb2bf !important; /* 设置光标颜色为浅灰色 */
}

/* 如果代码块使用单独的<pre><code>结构 */
:deep(pre code[class*="language-"]) {
  caret-color: #abb2bf !important;
}
</style>

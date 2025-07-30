<template>
  <div class="edit-container">
    <div class="edit-func">
      <div class="func-item">
        <div class="img-container flex-center">
          <img
            src="/src/assets/icons/chexiao-copy.png"
            style="width: 25px"
            alt="" />
        </div>
        <div>撤销</div>
      </div>
      <div class="func-item">
        <div class="img-container flex-center">
          <img
            src="/src/assets/icons/gl-redo3.png"
            style="width: 25px"
            alt="" />
        </div>
        <div>重做</div>
      </div>
      <div class="func-item">
        <div class="img-container flex-center">
          <img
            src="/src/assets/icons/history.png"
            style="width: 22px"
            alt="" />
        </div>
        <div>历史</div>
      </div>
      |
      <div class="func-item">
        <div class="img-container flex-center">
          <img
            src="/src/assets/icons/gl-title.png"
            style="width: 20px"
            alt="" />
        </div>

        <div>标题</div>
      </div>
      <div class="func-item">
        <div
          class="img-container flex-center"
          @click="applyStyle('bold')">
          <img
            src="/src/assets/icons/gl-bold.png"
            style="width: 20px"
            alt="" />
        </div>
        <div>加粗</div>
      </div>
      <div class="func-item">
        <div
          class="img-container flex-center"
          @click="applyStyle('red')">
          <img
            src="/src/assets/icons/gl-fontColor.png"
            style="width: 22px"
            alt="" />
        </div>
        <div>颜色</div>
      </div>
      <div class="func-item">
        <div class="img-container flex-center">
          <img
            src="/src/assets/icons/beijingyanse.png"
            style="width: 25px"
            alt="" />
        </div>

        <div>背景</div>
      </div>
      <div class="func-item">
        <div class="img-container flex-center">
          <img
            src="/src/assets/icons/qingxie.png"
            style="width: 18px"
            alt="" />
        </div>
        <div>倾斜</div>
      </div>
      <div class="func-item">
        <div class="img-container flex-center">
          <img
            src="/src/assets/icons/gl-underline.png"
            style="width: 20px"
            alt="" />
        </div>

        <div>下划线</div>
      </div>
      <div class="func-item">
        <div class="img-container flex-center">
          <img
            src="/src/assets/icons/shanchuxian.png"
            style="width: 26px"
            alt="" />
        </div>
        <div>删除线</div>
      </div>
      |
      <div class="func-item">
        <div class="img-container flex-center">
          <img
            src="/src/assets/icons/biaoshilei_tuxiang.png"
            style="width: 20px"
            alt="" />
        </div>

        <div>图像</div>
      </div>
      <div class="func-item">
        <div class="img-container flex-center">
          <img
            src="/src/assets/icons/shipin.png"
            style="width: 24px"
            alt="" />
        </div>
        <div>视频</div>
      </div>
      <div class="func-item">
        <div class="img-container flex-center">
          <img
            src="/src/assets/icons/lianjie-copy.png"
            style="width: 25px"
            alt="" />
        </div>
        <div>链接</div>
      </div>
    </div>
    <div class="divide"></div>
    <div class="content">
      <div class="catalog"></div>
      <div
        class="text"
        id="edit-content"
        contenteditable="true"></div>
      <div class="pub-setting">
        <el-form
          :model="form"
          label-width="auto">
          <el-form-item label="添加标题">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="文章标签">
            <el-select
              v-model="form.tags"
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
            <el-upload></el-upload>
          </el-form-item>
          <el-form-item label="文章简介">
            <el-input v-model="form.abstract" />
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio
                value="0"
                size="large">
                仅自己可见
              </el-radio>
              <el-radio
                value="1"
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
import { addArticle } from "../api/article";
import { ElMessage } from "element-plus";
const props = defineProps(["tagList"]);

const form = reactive({
  title: "",
  tags: [],
  abstract: "",
  status: 0,
  cover_img: "",
});
const applyStyle = (className) => {
  const selectText = window.getSelection();
  // console.log(selectText);
  // 检查是否有选中内容
  if (!selectText.rangeCount) return;
  // 获取选中范围
  const range = selectText.getRangeAt(0);
  // console.log(range);
  // 创建包裹元素
  const span = document.createElement("span");
  span.className = className;
  try {
    // 将选中内容包裹在span中
    range.surroundContents(span);
  } catch (e) {
    // 处理无法包裹的情况（如跨节点选择）
    console.log("无法应用样式：", e);
    alert("请选择连续的文本内容进行样式设置");
  }
  // 清除选中状态
  selectText.removeAllRanges();
};
const submitArticle = async () => {
  //获取文本编辑区的内容
  const content = document.getElementById("edit-content").innerHTML;
  // console.log(content);
  const _content = sanitizeContent(content);
  const { status } = await addArticle({
    title: form.title,
    cover_img: form.cover_img,
    abstract: form.abstract,
    content: _content,
    status: form.status,
    tags: form.tags,
  });
  if (status == 1) {
    ElMessage.success("提交成功");
  }
};
// 清理编辑区内容（防 XSS）
function sanitizeContent(html) {
  // 简单过滤：只保留安全标签和属性（实际项目建议用 bleach/dompurify 库）
  const allowedTags = ["b", "i", "u", "a", "img", "p", "br"];
  const allowedAttrs = ["href", "src", "style"];
  return html.replace(/<(\/?)(\w+)([^>]*?)>/g, (match, slash, tag, attrs) => {
    if (!allowedTags.includes(tag)) return ""; // 过滤不允许的标签
    // 过滤不允许的属性
    const cleanAttrs = attrs.replace(
      /(\w+)=["'].*?["']/g,
      (attrMatch, attr) => {
        return allowedAttrs.includes(attr) ? attrMatch : "";
      }
    );
    return `<${slash}${tag}${cleanAttrs}>`;
  });
}

onMounted(() => {
  console.log(props.tagList);
});
</script>

<style lang="scss" scoped>
.edit-container {
  min-height: calc(100vh - 40px);
  background-color: aliceblue;
  .edit-func {
    display: flex;
    justify-content: center;
    gap: 15px;
    .func-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      .img-container {
        cursor: pointer;
        width: 25px;
        height: 30px;
      }
    }
  }
  .content {
    // display: flex;
    // justify-content: center;
    width: 100%;
    // width: 50%;
    // min-width: 500px;
    // min-height: calc(100vh - 70px);
    // background-color: rgb(69, 73, 73);
    .catalog {
      width: 300px;
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
    }
  }
}
:deep(.bold) {
  font-weight: 500;
}
:deep(.red) {
  color: red;
}
</style>

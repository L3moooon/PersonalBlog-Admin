<template>
  <div>主题设置</div>
  <el-form
    :model="form"
    label-width="auto"
    style="max-width: 600px">
    <el-form-item label="展示页欢迎语">
      <el-input v-model="form.welcome" />
    </el-form-item>
    <el-form-item label="展示页图片">
      <el-upload
        class="uploader"
        :http-request="handleUpload"
        accept=".jpg,.png"
        :show-file-list="false"
        :limit="1"
        :before-upload="beforeAvatarUpload">
        <el-image
          :src="form.bgImg"
          fit="cover"
          @click.stop
          :preview-src-list="[form.bgImg]"></el-image>
        <img
          class="add"
          src="/src/assets/icons/add.png"
          alt="" />
      </el-upload>
    </el-form-item>
    <el-form-item label="用户昵称">
      <el-input v-model="form.nickname" />
    </el-form-item>
    <el-form-item label="用户头像">
      <el-upload
        class="uploader"
        :http-request="handleUpload"
        accept=".jpg,.png"
        :show-file-list="false"
        :limit="1"
        :before-upload="beforeAvatarUpload">
        <el-image
          v-if="form.portrait"
          :src="form.portrait"
          fit="cover"
          @click.stop
          :preview-src-list="[form.portrait]"></el-image>
        <img
          v-else
          class="add"
          src="/src/assets/icons/add.png"
          alt="" />
      </el-upload>
    </el-form-item>
    <el-form-item label="个人链接">
      <div v-for="item in form.url">{{ item }}</div>
    </el-form-item>
    <el-form-item label="格言">
      <el-input v-model="form.motto" />
    </el-form-item>
    <el-form-item label="诗句">
      <div v-for="item in form.saying">{{ item }}</div>
    </el-form-item>
    <el-button>确定</el-button>
  </el-form>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { upload } from "/src/api/public";
import { getThemeInfo } from "../api/user";

const form = reactive({});
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleUpload = async (e) => {
  const { file } = e;
  // 创建FormData对象
  const formData = new FormData();
  formData.append("file", file); // 根据后端要求调整字段名
  // 调用封装好的request
  const { data, status } = await upload(formData);
  if (status == 1) {
    console.log(data);
    form.portrait = data.url;
  }
};
const beforeAvatarUpload = () => {
  //检查格式
  return true;
};

const handlePictureCardPreview = () => {
  dialogImageUrl.value = form.portrait;
  dialogVisible.value = true;
};

const getTheme = async () => {
  const { data, status } = await getThemeInfo();
  if (status == 1) {
    Object.assign(form, data);
    console.log(form);
  }
};
onMounted(() => {
  getTheme();
});
</script>

<style lang="scss" scoped>
.uploader {
  width: 150px;
  height: 150px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  .add {
    width: 30px;
    // padding: 120px;
  }
}
</style>

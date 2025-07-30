<template>
  <div>个人信息设置</div>
  <!-- <el-row>
    <el-col :span="24">昵称</el-col>
  </el-row> -->
  <el-form
    :model="form"
    label-width="auto"
    style="max-width: 600px">
    <el-form-item label="昵称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="头像">
      <el-upload
        class="avatar-uploader"
        :http-request="handleUpload"
        accept=".jpg,.png"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar" />
        <el-icon
          v-else
          class="avatar-uploader-icon"
          ><Plus
        /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="格言">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="诗句">
      <el-input v-model="form.name" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { upload } from "/src/api//public";

const form = reactive({
  name: "宵时雨",
});
const imageUrl = ref("");
const handleUpload = async (e) => {
  const { file } = e;
  // 创建FormData对象
  const formData = new FormData();
  formData.append("file", file); // 根据后端要求调整字段名
  // 调用封装好的request
  const data = await upload(formData);
  console.log(data);
};
const beforeAvatarUpload = () => {
  return true;
};
const handleAvatarSuccess = (response, uploadFile) => {
  console.log(response, uploadFile);
  imageUrl.value = "aa";
};
</script>

<style lang="scss" scoped></style>

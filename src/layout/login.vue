<template>
  <div class="background">
    <div
      class="login-container"
      v-if="!showRegister">
      <span>这里是博客的后台管理系统</span>
      <el-form
        :model="loginForm"
        label-position="top">
        <el-form-item label="账号:">
          <el-input v-model="loginForm.account" />
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="loginForm.password" />
        </el-form-item>
      </el-form>
      <el-button @click="login">登录</el-button>
      <div class="func">
        <div
          class="forget"
          @click="forgetPwd">
          忘记密码？
        </div>
        <div
          class="register"
          @click="register">
          注册
        </div>
      </div>
    </div>
    <div
      class="register-container"
      v-else>
      <span>注册账号</span>
      <el-form
        :model="registerForm"
        label-position="top">
        <el-form-item label="账号:">
          <el-input v-model="registerForm.name" />
        </el-form-item>
        <el-form-item label="账号:">
          <el-input v-model="registerForm.account" />
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="registerForm.password" />
        </el-form-item>
      </el-form>
      <div class="func">
        <div
          class="forget"
          @click="showRegister = false">
          <div>已有账号？<span>登录</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { login as userLogin } from "../api/login";
const showRegister = ref(false);
const loginForm = reactive({
  account: "", //邮箱账号
  password: "", //密码
});
const registerForm = reactive({
  name: "",
  account: "", //邮箱账号
  password: "", //密码
});
//登录
const login = async () => {
  const data = await userLogin({
    email: loginForm.account,
    password: loginForm.password,
  });
  console.log(data);
};
//注册
const register = () => {
  showRegister.value = true;
};
</script>

<style lang="scss" scoped>
.background {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("../assets/bamboo.png");
  background-repeat: no-repeat;
  background-size: cover;
  .login-container,
  .register-container {
    width: 500px;
    height: 350px;
    background-color: rgba($color: #ccc, $alpha: 0.8);
    border-radius: 10px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 20px;
  }
}
</style>

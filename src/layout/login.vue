<template>
  <div class="background">
    <div
      class="login-container"
      v-if="!showRegister">
      <span>这里是博客的后台管理系统</span>
      <!-- 登录 -->
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginFormRef"
        label-position="top">
        <el-form-item
          label="账号:"
          prop="account">
          <el-input v-model="loginForm.account" />
        </el-form-item>
        <el-form-item
          label="密码:"
          prop="password">
          <el-input v-model="loginForm.password" />
        </el-form-item>
        <el-button @click="login(loginFormRef)">登录</el-button>
      </el-form>
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
    <!-- 注册 -->
    <div
      class="register-container"
      v-else>
      <span>注册账号</span>
      <el-form
        :rules="registerRules"
        ref="registerFormRef"
        :model="registerForm"
        label-position="top">
        <el-form-item
          label="昵称:"
          prop="name">
          <el-input v-model="registerForm.name" />
        </el-form-item>
        <el-form-item
          label="账号:"
          prop="account">
          <el-input v-model="registerForm.account" />
        </el-form-item>
        <el-form-item
          label="密码:"
          prop="password">
          <el-input v-model="registerForm.password" />
        </el-form-item>
        <el-button @click="createNewCount(registerFormRef)">注册账号</el-button>
      </el-form>
      <div class="func">
        <div
          class="forget"
          @click="showRegister = false">
          <div>已有账号？<el-button>登录</el-button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { login as userLogin, register as userRegister } from "../api/login";
import { ElMessage } from "element-plus";
import { useUserStore } from "../store/user";
const router = useRouter();

const showRegister = ref(false);
const loginFormRef = ref();
const registerFormRef = ref();
const loginForm = reactive({
  account: "", //邮箱账号
  password: "", //密码
});
const registerForm = reactive({
  name: "",
  account: "", //邮箱账号
  password: "", //密码
});

const loginRules = reactive({
  account: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});
const registerRules = reactive({
  name: [
    {
      required: true,
      message: "请输入昵称",
      trigger: "blur",
    },
  ],
  account: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});
//登录
const login = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!");
      const data = await userLogin({
        email: loginForm.account,
        password: loginForm.password,
      });
      console.log(data);
      if (data.status == 1) {
        //存储token至local
        localStorage.setItem("user", JSON.stringify(data));
        //清空表单-跳转至主页
        router.push("/");
        loginForm.account = "";
        loginForm.password = "";
        ElMessage({
          type: "success",
          message: "登录成功",
        });
      } else {
        ElMessage({
          type: "error",
          message: "用户名或密码错误",
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
//注册
const register = () => {
  showRegister.value = true;
};
const createNewCount = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!");
      const data = await userRegister({
        name: registerForm.name,
        email: registerForm.account,
        password: registerForm.password,
      });
      console.log(data);
      if (data.status == 1) {
        ElMessage({
          type: "success",
          message: "注册成功",
        });
        showRegister.value = false;
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>
<style lang="scss" scoped>
.background {
  position: relative;
  width: 100%;
  height: 100vh;
  // background-image: url("../assets/bamboo.png");
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

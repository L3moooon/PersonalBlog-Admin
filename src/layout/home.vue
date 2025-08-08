<template>
  <div class="container">
    <!-- 左侧菜单 -->
    <div class="left">
      <div class="logo">博客后台管理系统</div>
      <el-menu popper-class="menu">
        <MenuList
          :menuList="routes"
          router="true"></MenuList>
      </el-menu>
    </div>
    <div class="right">
      <!-- 右上 -->
      <div class="right-top">
        <el-popover
          class="box-item"
          trigger="click"
          placement="bottom">
          <template #reference>
            <div class="user">
              <img
                src="/src/assets/personal.png"
                alt="" />
              <span>{{ user }}</span>
            </div>
          </template>
          <template #default>
            <div @click="logout">退出登录</div>
          </template>
        </el-popover>
      </div>
      <!-- 右下 -->
      <div class="right-down">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import MenuList from "@/components/menuList.vue";
const user = ref();
const router = useRouter();
const logout = () => {
  localStorage.removeItem("user");
  router.push("/login");
};

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem("user")).name;
  console.log(user.value);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  .left {
    width: 15%;
    .logo {
      height: 80px;
      background-color: aquamarine;
    }
  }
  .right {
    width: 85%;
    background-color: #ccc;
    .right-top {
      height: 50px;
      background-color: antiquewhite;
      overflow: hidden;
      .user {
        width: 100px;
        cursor: pointer;
        margin-left: auto;
        img {
          width: 25px;
        }
      }
    }
  }
}
</style>

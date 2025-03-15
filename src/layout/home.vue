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
      <div class="right-top"></div>
      <!-- 右下 -->
      <div class="right-down">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { routes } from "@/router/routes";
import MenuList from "@/components/menu/menu-list.vue";
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
      height: 80px;
      background-color: antiquewhite;
    }
  }
}
</style>

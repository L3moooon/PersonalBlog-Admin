import { defineStore } from "pinia";
import router from "@/router/index";
import { asyncRoutes, publicRoutes } from "../router/routes";
import { login as userLogin } from "@/api/login";
import { ElMessage } from "element-plus";
import { cloneDeep } from 'lodash-es';

const initialToken = ''
const initialUser = {
  name: '',
  permissions: {
    routeKeys: [],
    componentKeys: [],
    buttonKeys: []
  },
}
const loadFromLocal = (key) => {
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : null
}
const saveToLocal = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state))
}
const removeFromLocal = (key) => {
  localStorage.removeItem(key)
}

export const useUserStore = defineStore('User', {
  state: () => {
    return {
      user: loadFromLocal('user') || initialUser,
      token: loadFromLocal('token') || initialToken,
      menu: []
    }
  },
  actions: {
    async login(account, password) {
      try {
        const { status, user, token } = await userLogin({ account, password });
        if (status == 1) {
          this.token = token;
          this.user = user;
          saveToLocal('user', user);
          saveToLocal('token', token);
          this.generateRoutes()
          router.push('/');
          ElMessage.success('登录成功');
        } else {
          ElMessage.error('登录失败，请检查账号密码');
        }
      } catch (error) {
        ElMessage.error('登录请求失败，请稍后重试');
        console.error('登录异常：', error);
      }
    },

    // 退出登录
    logout() {
      this.token = initialToken;
      this.user = initialUser;
      removeFromLocal('token');
      removeFromLocal('user');
      router.push('/login');
      ElMessage.success('已退出登录');
    },
    generateRoutes() {
      const routeKeys = this.user.permissions.routeKeys;
      const accessedRoutes = [];
      // 深拷贝路由模板，避免修改原数组
      //注意 JSON.parse(JSON.stringify()) 这种深拷贝方式无法处理函数、Promise、组件引用等特殊类型，而路由的 component 通常是一个动态导入的函数（或组件本身），属于无法被 JSON 序列化的类型，因此深拷贝后会丢失 component 属性，变为 undefined。
      const routesCopy = cloneDeep(asyncRoutes);
      console.log(routeKeys, routesCopy);
      routesCopy.forEach(route => {
        console.log(route);
        // 检查当前路由是否有权限访问
        if (routeKeys.includes(route.path)) {
          // 处理子路由
          if (route.children && route.children.length > 0) {
            // 筛选有权限的子路由
            route.children = route.children.filter(child =>
              routeKeys.includes(child.path)
            );
          }
          accessedRoutes.push(route);
        }
      });
      this.menuList = [...publicRoutes, ...accessedRoutes];
      // 动态添加路由
      console.log(this.menuList);
      accessedRoutes.forEach(route => {
        router.addRoute(route);
      });
      console.log(router.getRoutes());
    }
  }
})

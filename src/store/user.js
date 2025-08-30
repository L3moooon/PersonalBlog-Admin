import { defineStore } from "pinia";
import { login as userLogin, register as userRegister } from "@/api/login";
import { ElMessage } from "element-plus";

export const useUserStore = defineStore('User', {
  state: () => {
    return {
      userInfo: {},
      permissions: { routeKeys: [], buttonKeys: [] },
    }
  },
  actions: {
    async login(account, password) {
      const { status, data, permissions, token } = await userLogin({ account, password });
      if (status == 1) {
        this.userInfo = data;
        this.permissions = permissions;
        localStorage.setItem('token', token);
        ElMessage.success('登录成功');
      } else {
        ElMessage.error('登录失败，请检查账号密码');
      }
    }
  }
})
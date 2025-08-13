import axios from "axios";
import { ElMessage } from "element-plus";

let request = axios.create({
  baseURL: '/',
  timeout: 10000,
});

request.interceptors.request.use((config) => {
  //获取token，登录成功以后携带给服务器
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.token) {
    const payload = JSON.parse(atob(user.token.split('.')[1])); // 解析 token 的 payload
    console.log(payload);
    const expirationTime = payload.exp * 1000; // 转换为毫秒
    const currentTime = Date.now();

    if (currentTime > expirationTime) {
      console.log('Token 已过期');
      localStorage.removeItem('user'); // 清除过期的 token
      window.location.href = '/login'; // 跳转到登录页
    } else {
      console.log('Token 未过期');
      config.headers.token = user.token;
    }
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let message = "";
    let status = error.response;
    console.log(error);
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "无权访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器错误";
        break;
      default:
        message = "网络出现问题";
        break;
    }
    ElMessage({
      type: "error",
      message,
    });
    return Promise.reject(error);
  }
);

export default request;

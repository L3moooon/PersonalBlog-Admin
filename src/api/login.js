import request from "../utils/request";
//用户登录
export const login = (data) => {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data,
  })
}
//用户注册
export const register = (data) => {
  return request({
    url: '/admin/user/register',
    method: 'post',
    data,
  })
}
//用户忘记密码
export const forgetPassword = (data) => {
  return request({
    url: '/admin/user/forgetPassword',
    method: 'post',
    data,
  })
}
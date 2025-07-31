import request from "./index";
//获取所有用户列表
export const getList = (data) => {
  return request({
    url: '/admin/userManagement/getAllUserList',
    method: 'post',
    data,
  })
}

//获取用户主题相关信息
export const getThemeInfo = () => {
  return request({
    url: '/web/user/info',
    method: 'post',
  })
}
//更改用户主题相关信息
export const modiThemeInfo = (data) => {
  return request({
    url: '/admin/webInfo/modifyUser',
    method: 'post',
    data
  })
}
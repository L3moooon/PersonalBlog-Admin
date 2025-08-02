import request from "./index";
//获取所有用户列表
export const getList = (data) => {
  return request({
    url: '/admin/userManagement/getAllUserList',
    method: 'post',
    data,
  })
}

import request from "@/utils/request";
//获取访客列表
export const getList = () => {
  return request({
    url: '/admin/visitorManagement/getList',
    method: 'post',
  })
}
//
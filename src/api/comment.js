import request from "./index";
//获取所有评论列表
export const getAllComments = () => {
  return request({
    url: '/admin/comment/getComments',
    method: 'post',
  })
}
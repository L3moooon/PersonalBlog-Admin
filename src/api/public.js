import request from "@/utils/request";
//用户登录
export const upload = (data) => {
  return request({
    url: '/public/upload',
    method: 'post',
    data,
  })
}
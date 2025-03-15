import request from "./index";
export const getAllArticle = (data) => {
  return request({
    url: '/login/login',
    method: 'post',
    data,
  })
}
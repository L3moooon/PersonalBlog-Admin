import request from "./index";
export const getAllArticle = () => {
  return request({
    url: '/public/article',
    method: 'post',
  })
}
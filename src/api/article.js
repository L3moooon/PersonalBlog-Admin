import request from "./index";
//获取所有文章列表
export const getAllArticle = () => {
  return request({
    url: '/public/getAllArticle',
    method: 'post',
  })
}

//获取所有标签列表
export const getAllTag = () => {
  return request({
    url: '/admin/tag/getAllTags',
    method: 'post',
  })
}
//新增标签
export const addTag = (data) => {
  return request({
    url: '/admin/tag/addTag',
    method: 'post',
    data
  })
}
//删除标签
export const delTag = (data) => {
  return request({
    url: '/admin/tag/delTag',
    method: 'post',
    data
  })
}
//修改标签
export const editTag = () => {
  return request({
    url: '/admin/tag/editTag',
    method: 'post',
  })
}

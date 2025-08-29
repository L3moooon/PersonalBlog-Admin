//角色管理
import request from '@/utils/request'
//获取所有角色
export const getRoleList = () => {
  return request({
    url: '/admin/role/getRoleList',
    method: 'post',
  })
}
//新增或修改角色
export const addOrEditRole = (data) => {
  return request({
    url: '/admin/role/add',
    method: 'post',
    data
  })
}
//删除角色
export const delRole = (data) => {
  return request({
    url: '/admin/role/del',
    method: 'post',
    data
  })
}
//获取所有权限
export const getAllPermission = () => {
  return request({
    url: '/admin/role/getAllPermission',
    method: 'post',
  })
}
//分配权限
export const allotPermission = (data) => {
  return request({
    url: '/admin/role/allotPermission',
    method: 'post',
    data
  })
}
//获取角色权限

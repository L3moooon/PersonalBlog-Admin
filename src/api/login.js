import request from "./index";
export const login = (data) => {
  return request({
    url: '/login/login',
    method: 'post',
    data,
  })
}

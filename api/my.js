import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
export function login(data) {
  return http.fly.request({
    method: 'post',
    // header: {
    //   "Authorization": "Basic d2VjaGF0OndlY2hhdF9zZWNyZXQ=",
    //   "Content-Type": "application/x-www-form-urlencoded"
    // },
    url: URL.host + '/blade-auth/oauth/token',
    body: data
  })
}
export function wechatuserInfo(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-user/wechatuser/update',
    body: data
  })
}

export function loginOut(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-auth/oauth/logout'
  })
}

// 
export function onLogin(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/wechat_user/one',
    body: data
  })
}
// 已经登录
export function hasLogin(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/wechat_user/one/' + data.id,
    body: data
  })
}
// 查询用户信息
export function userInfo(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_user/one/' + data.id,
    params: data
  })
}
// 修改用户信息

export function xgUserInfo(data) {
  return http.fly.request({
    method: 'put',
    url: URL.host + '/renren-fast/wechat_user/one/',
    body: data
  })
}
// 新增地址
export function addressAdd(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/wechatuseraddress/save',
    body: data
  })
}

//地址列表
export function addressList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/wechatuseraddress/page'
  })
}

// 编辑地址
export function addressEdit(data) {
  return http.fly.request({
    method: 'put',
    url: URL.host + '/blade-bms/wechatuseraddress/update',
    body: data
  })
}

// 删除地址

export function addressDel(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/wechatuseraddress/remove?ids=' + data.id
  })
}
// 反馈意见
export function feedback(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/advise/save',
    body: data
  })
}

// 获取手机哈
// /wechat/phone  GET请求
export function getPhone(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat/phone/',
    params: data
  })
}
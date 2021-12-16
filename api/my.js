import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
export function login(data) {
  return http.fly.request({
    method: 'post', 
    url: URL.host + '/blade-auth/token',
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
    url: URL.host + '/oauth/logout'
  })
}   
// 新增地址
export function addressAdd(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/wechatuseraddress/save',
    body: data
  })
}

//地址列表
export function addressList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/wechatuseraddress/page'
  })
}

// 编辑地址
export function addressEdit(data) {
  return http.fly.request({
    method: 'put',
    url: URL.host + '/wechatuseraddress/update',
    body: data
  })
}

// 删除地址

export function addressDel(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/wechatuseraddress/remove?ids=' + data.id
  })
} 

// 获取手机哈
// /wechat/phone  GET请求
export function getPhone(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-user/wechatuser/phone?appid=wx2ee980985f11541a',
    params: data
  })
}

export function couponuserList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/couponuser/client/list',
    params: data
  })
}
export function feedback(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/message/client/save',
    body: data
  })
}


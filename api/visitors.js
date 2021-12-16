import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
// 新增
export function addVisitors(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/appointment/save',
    body: data
  })
}

export function updVisitors(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/appointment/update',
    body: data
  })
}
export function removeVisitors(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/appointment/remove?ids='+data
  })
}

// 查看列表 
export function visitorsList(data) {
  console.log(data)
  return http.fly.request({
    method: 'get',
    url: URL.host + '/appointment/page',
    params: data
  })
} 
export function paymentQcode(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/appointment/page',
    params: data
  })
}  
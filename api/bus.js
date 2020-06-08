import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
// 首页
export function busList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/bus/regular/list',
    params: data
  })
} 

export function busUser(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/bus/regular/use',
    body: data
  })
} 

export function busInfo(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/bus/regular/info/'+data.id,
    params: data
  })
} 

export function busaddCoord(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/bus/regular/addCoord',
    params: data
  })
} 

export function busgetCoord(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/bus/regular/getCoord',
    params: data
  })
} 


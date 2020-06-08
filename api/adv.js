import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
// 首页
export function findAdv(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_ad/discovery_page',
    params: data
  })
} 

export function indexAdv(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_ad/home_page',
    params: data
  })
} 

export function leaseAdv() {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_ad/lease_page'
  })
} 

export function maintenanceAdv(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_ad/maintenance_page',
    params: data
  })
} 
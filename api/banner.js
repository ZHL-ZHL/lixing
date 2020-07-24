import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
// 首页
export function homeBanner(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_banner/home_page',
    params: data
  })
} 



export function discoveryBanner(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_banner/discovery_page',
    params: data
  })
} 

export function discoveryPage() {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_ad/discovery_page'
  })
}

export function leaseBanner(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/wechatbanner/page',
    params: data
  })
} 

export function maintenanceBanner(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_banner/maintenance_page',
    params: data
  })
} 
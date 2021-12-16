import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
// 首页
export function homeBanner(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/wechatbanner/page?current=1&size=5'+'&bannerType='+data,
    params: data
  })
} 
// 活动页
export function shopBanner(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/wechatbanner/page?bannerType=3&current=1&size=5',
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
 
export function leaseBanner(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/wechatbanner/page',
    params: data
  })
}  

export function listForMiniapp(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-system/roleminiappmenu/listForMiniapp',
    params: data
  })
} 

export function couponList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/coupon/client/list?current=1&size=1000',
    params: data
  })
} 
export function couponuserGain(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/couponuser/gain',
    body: data
  })
} 

import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
// 首页
export function discountAllList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_discount/all/'+data.wechatUserId,
    params: data
  })
} 

export function discountMyList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_discount/list/' + data.wechatUserId,
    params: data
  })
} 
export function getCard(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/wechat_discount/one/' + data.wechatUserId + '/' + data.discountId,
    body: data
  })
} 
// 余额
export function myYe(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/wechatmealcard/detail',
    params: data
  })
} 
// 充值

export function topay(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/wechatmealcard/toPay',
    body: data
  })
} 
//转账
export function totransfer(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/wechatmealcard/transfer',
    body: data
  })
} 
// 充送规则


export function chargeactivity(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/rtrechargeactivity/list',
    params: data
  })
} 

// 申请退款

export function refundApply(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/wechatmealcard/refund/apply',
    body: data
  })
} 
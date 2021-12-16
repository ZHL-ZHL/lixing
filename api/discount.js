import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
 
 
// 余额
export function myYe(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/wechatmealcard/detail',
    params: data
  })
} 
// 充值

export function topay(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/wechatmealcard/toPay',
    body: data
  })
} 
//转账
export function totransfer(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/wechatmealcard/transfer',
    body: data
  })
} 
// 充送规则


export function chargeactivity(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/rtrechargeactivity/list',
    params: data
  })
} 

// 申请退款

export function refundApply(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/wechatmealcard/refund/apply',
    body: data
  })
} 
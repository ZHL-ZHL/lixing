import http from "../utils/request.js"
import URL from "../utils/host.js"
// 提交订单

export function orderTj(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/userorder/save',
    body: data
  })
}
// 订单列表
export function orderList(data) { 
  return http.fly.request({
    method: 'get',
    url: URL.host + '/userorder/wechat/page',
    params: data
  })
}
// 订单详情
export function orderDetail(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/userorder/wechat/detail?orderNum=' + data.orderNum+'&orderType='+data.orderType
  })
}

export function userorderRefund(data) { 
  return http.fly.request({
    method: 'get',
    url: URL.host + '/userorder/wechat/refund',
    params: data
  })
}

export function clientCancle(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/rtorder/client/cancle',
    body: data
  })
} 
export function cartList(data) { 
  return http.fly.request({
    method: 'get',
    url: URL.host + '/cart/client/list',
    params: data
  })
}

export function orderConfirm(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/order/client/confirm',
    body: data
  })
} 

export function createOrder(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/order/client/create/'+data.key,
    body: data.obj
  })
}  


export function toPayOrder(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/order/client/toPay/'+data.key,
    body: data.obj
  })
}  

export function applyrepairList(data) { 
  return http.fly.request({
    method: 'get',
    url: URL.host + '/property/apply-repair-list',
    params: data
  })
}



import http from "../utils/request.js"
import URL from "../utils/host.js"
// 提交订单

export function orderTj(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/userorder/save',
    body: data
  })
}
// 订单列表
export function orderList(data) { 
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/userorder/wechat/page',
    params: data
  })
}
// 订单详情
export function orderDetail(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/userorder/wechat/detail?orderNum=' + data.orderNum+'&orderType='+data.orderType
  })
}

export function userorderRefund(data) { 
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/userorder/wechat/refund',
    params: data
  })
}

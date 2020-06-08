import http from "../utils/request.js"
import URL from "../utils/host.js"
// 提交订单

export function orderTj(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/wechat_order/one',
    body: data
  })
}
// 订单列表
export function orderList(data) {
  console.log()
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_order/list',
    params: data
  })
}
// 订单详情
export function orderDetail(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_order/one/'+data.id,
    parmas: data
  })
}
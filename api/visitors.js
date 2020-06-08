import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
// 新增
export function addVisitors(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/wechat_appointment/one',
    body: data
  })
}
// 查看列表
export function visitorsList(data) {
  console.log(data)
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_appointment/list',
    params: data
  })
}
// 访客单详情
export function visitorsDetail(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_appointment/one/' + data.appointmentId
  })
}
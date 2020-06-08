import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
export function dayReport(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_car/wx/dayReport',
    params: data
  })
}
import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
// 首页
export function distributionOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host2 + '/supply/delivery/waybillcoordinate/getPhone',
    params: data
  })
} 
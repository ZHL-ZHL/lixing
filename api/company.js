import http from "../utils/request.js"
import URL from "../utils/host.js"
// 获取公司列表 
export function companyOnlineSave(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/businessadvice/save',
    body: data
  })
}
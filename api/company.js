import http from "../utils/request.js"
import URL from "../utils/host.js"
// 获取公司列表
export function companyList() {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/company/list'
  })
}
export function queryHealthStatic(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/static/queryHealthStatic?date='+data.date
  })
}
export function registerStatic(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/static/registerStatic?date=' + data.date
  })
}
//   参数passState 车0，人1
export function queryPassTrafficStatic(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/static/queryPassTrafficStatic?passState=' + data.passState,
    parmas: data
  })
}


export function companyOnlineSave(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/businessadvice/save',
    body: data
  })
}
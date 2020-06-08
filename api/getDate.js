import http from "../utils/request.js"
import URL from "../utils/host.js"



//GET

// 主页接口
export function indexList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/app/leasedetail/list',
    params: data
  })
}

export function hotList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/app/leasedetail/list',
    params: data
  })
}


// 详情页接口
export function getDetial(detailId) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/app/leasedetail/info/'+detailId
  })
}


// POST
// 立即预约
export function orderMsg(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/app/apileasemake/save',
    body: data
  })
}

// 详情页接口
export function loginInfo(loginNo) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/app/apileasemake/list/',
    params: loginNo
  })
}
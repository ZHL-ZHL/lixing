import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
// 审核详情
export function getDetail(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/aCheck/getGarden',
    params: data
  })
}

// 审核列表
export function getCheckList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/aCheck/getCheck',
    params: data
  })
}

// 提交审核结果
export function updateCheck(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/checkDetail/update',
    body: data
  })
}

// 合同详情
export function getContract(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/acontract/info/' + data.id,
    // body: data
  })
}
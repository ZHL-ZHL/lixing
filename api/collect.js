import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
// 收藏
export function collect(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/wechat_favorite/one',
    body: data
  })
} 
// 删除
export function collectdel(data) {
  return http.fly.request({
    method: 'DELETE',
    url: URL.host + '/renren-fast/wechat_favorite/one',
    body: data
  })
} 

export function collectList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_favorite/list/' + data.wechatUserId + "/" + data.itmeType,
    parmas: data
  })
} 

import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
export function repairList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_maintenance/list',
    params: data
  })
} 

export function repairDetail(data) {
  if (data.wechatUserId){
    return http.fly.request({
      method: 'get',
      url: URL.host + '/renren-fast/wechat_maintenance/one/' + data.id + "/" + data.wechatUserId,
      params: data
    })
  }else{
    return http.fly.request({
      method: 'get',
      url: URL.host + '/renren-fast/wechat_maintenance/one/' + data.id,
      params: data
    })
  }
  
} 

export function addCar(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/wechat_shopping/one',
    body: data
  })
} 

export function carList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/wechat_shopping/list',
    params: data
  })
} 

export function delCar(data) {
  return http.fly.request({
    method: 'DELETE',
    url: URL.host + '/renren-fast/wechat_shopping/one/'+data.id,
    // params: data
  })
} 

export function tjCar(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/wechat_order/list',
    body: data
  })
} 

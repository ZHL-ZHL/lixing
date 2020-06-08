import http from "../utils/request.js"
import URL from "../utils/host.js" 


export function passTrafficSave(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/passTraffic/save',
    body: data
  })
} 

export function passTrafficList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/passTraffic/list',
    params: data
  })
} 

export function passTrafficUpdate(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/passTraffic/update',
    body: data
  })
} 

export function healthSave(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/health/save',
    body: data
  })
} 
export function healthUpdate(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/health/update',
    body: data
  })
} 


export function healthList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/health/list',
    params: data
  })
}   
export function healthpesonleDataList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/health/pesonleData',
    params: data
  })
}   
 
export function registerList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/register/list',
    params: data
  })
}
export function registerSave(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/register/save',
    body: data
  })
} 

export function registerpesonleData(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/register/pesonleData',
    params: data
  })
} 
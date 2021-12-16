import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
export function meetingList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/hzleasedetail/wechat/page',
    params: data
  })
} 

export function hzleasemakeList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/hzleasemake/page',
    params: data
  })
} 

export function meetingDetail(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/hzleasedetail/detail',
    params: data
  })
} 


export function selectByKeWord(data) {
  console.log(data)
  return http.fly.request({
    method: 'get',
    url: URL.host + '/hzleasedetail/selectByKeWord?keyWord='+data
  })
}  
export function hotLease(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-log/api/hotLease'
  })
} 

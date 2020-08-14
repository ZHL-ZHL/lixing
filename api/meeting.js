import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
export function meetingList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/hzleasedetail/wechat/page',
    params: data
  })
} 

export function hzleasemakeList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/hzleasemake/page',
    params: data
  })
} 

export function meetingDetail(data) {
  if (data.wechatUserId){
    return http.fly.request({
      method: 'get',
      url: URL.host + '/blade-bms/leasedetail/info/' + data.id + "/" + data.wechatUserId,
      // params: data
    })
  }else{
    return http.fly.request({
      method: 'get',
      url: URL.host + '/blade-bms/hzleasedetail/detail',
      params: data
    })
  }
} 


export function selectByKeWord(data) {
  console.log(data)
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/hzleasedetail/selectByKeWord?keyWord='+data
  })
}  
export function hotLease(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-log/api/hotLease'
  })
} 

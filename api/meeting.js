import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
export function meetingList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/sys/leasedetail/list',
    params: data
  })
} 


export function meetingDetail(data) {
  if (data.wechatUserId){
    return http.fly.request({
      method: 'get',
      url: URL.host + '/renren-fast/app/leasedetail/info/' + data.id + "/" + data.wechatUserId,
      // params: data
    })
  }else{
    return http.fly.request({
      method: 'get',
      url: URL.host + '/renren-fast/app/leasedetail/info/' + data.id
      // params: data
    })
  }
  
} 
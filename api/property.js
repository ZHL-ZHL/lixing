import http from "../utils/request.js"
import URL from "../utils/host.js" 
export function timesList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/times/apply-list',
    params: data
  })
}   
 
export function applySave(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/apply/client/save',
    body: data
  })
} 
export function repairreportSave(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/repairreport/client/save',
    body: data
  })
} 
export function managerList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/manager/listone',
    params: data
  })
}   
 

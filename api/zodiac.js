import http from "../utils/request.js"
import URL from "../utils/host.js" 
export function getInvestmenti(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-desk/yellow/list',
    params: data
  })
} 
export function investments(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-desk/server/list',
    params: data
  })
} 

export function getdDictionary(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-system/dict/dictionary?code=other_list'
  })
} 



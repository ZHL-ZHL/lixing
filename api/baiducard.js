import http from "../utils/request.js"
import URL from "../utils/host.js"
export function getAccessToken(data) {
  return http.fly.request({
    method: 'get',
    url: 'https://aip.baidubce.com/oauth/2.0/token',
    params: data
  })
}

export function saveaCompanyInfo(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/aCompanyInfo/save',
    body: data
  })
}
export function saveaCompanyMileage(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/aCompanyMileage/save',
    body: data
  })
}
export function updateCompanyMileage(data) {
  return http.fly.request({
    method: 'put',
    url: URL.host + '/renren-fast/aCompanyMileage/update',
    body: data
  })
}


// 编辑
export function updeteaCompanyInfo(data) {
  return http.fly.request({
    method: 'put',
    url: URL.host + '/renren-fast/aCompanyInfo/update',
    body: data
  })
}
export function getaCompanyInfo(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/aCompanyInfo/getInfo',
    params: data
  })
}
export function selectUserListApply(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/aCompanyMileage/selectUserList',
    params: data
  })
}

export function aCompanyCarupdate(data) {
  return http.fly.request({
    method: 'put',
    url: URL.host + '/renren-fast/aCompanyCar/update',
    body: data
  })
}
export function selectUserGet(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/aCompanyMileage/selectUser',
    params: data
  })
} 
export function addFpWaybill(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/aCompanyMileage/addFpWaybill?id=' + data.id + '&coordinate=' + data.coordinate
  })
} 
export function getFpWaybill(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/aCompanyMileage/getFpWaybill?id=' + data.id
  })
}  
export function getCompany(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/sys/sysdict/pullDown?code=organization_company'
  })
}  

export function selectCarList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/aCompanyMileage/getList',
    params: data
  })
} 

export function sysapprove(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/sys/sysapprove/save',
    body: data
  })
} 
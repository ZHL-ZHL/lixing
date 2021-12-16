import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http) 
export function productList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/product/client/list',
    params: data
  })
}  
export function productMenuList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/group/client/product-list',
    params: data
  })
}  
export function getDetail(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/product/client/detail',
    params: data
  })
}   
 
export function addGoods(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/cart/client/add',
    body: data
  })
} 


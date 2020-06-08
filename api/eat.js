import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
// 首页
export function eatList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/food/recommend/list',
    params: data
  })
} 

export function shopInfo(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/restaurant/info/'+data.id,
    params: data
  })
} 

export function classification(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/sys/sysdict/pullDown',
    params: data
  })
} 

export function foodList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/food/list',
    params: data
  })
} 

export function eatSbumit(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/shop/order/create',
    body: data
  })
} 

export function eatCar(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/shop/rtcart/save',
    body: data
  })
} 

export function eatCarList(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/shop/rtcart/list',
    body: data
  })
} 

export function eatAddressList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/rtaddress/list',
    params: data
  })
} 

// shop / rtaddress / save
export function eatAddressSave(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/shop/rtaddress/save',
    body: data
  })
} 

export function eatOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/order/user/pageList',
    params: data
  })
} 

export function eatshopOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/order/restaurant/list',
    params: data
  })
} 
// shop / order / shopAccept
export function eatshopAccept(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/order/shopAccept',
    params: data
  })
} 
// shop / order / startDelivery
export function eatshopDelivery(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/order/startDelivery',
    params: data
  })
} 

export function eatshopFinish(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/order/finishDelivery',
    params: data
  })
} 



export function eatOrderDetail(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/order/info',
    params: data
  })
} 

export function eatgroupList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/food/group/list',
    params: data
  })
} 

export function eatgroupshopList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/food/group/shop/list',
    params: data
  })
} 

export function eatPingjia(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/shop/rtassess/create',
    body: data
  })
} 

export function eatpingjiaList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/rtassess/pageList',
    params: data
  })
} 

export function eatcancelOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/order/cancelOrder',
    params: data
  })
} 




export function eatPayOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/order/pay',
    params: data
  })
} 

export function eatCancelAgreeOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/order/cancel/agree',
    params: data
  })
} 
export function eatCancelRefuseOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/order/cancel/refuse',
    params: data
  })
} 

// eatRefuseOrder

export function eatRefuseOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/order/shopRefuse',
    params: data
  })
} 

// shop / recommend / save
export function eatrecommend(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/shop/recommend/save',
    body: data
  })
} 

export function eatrecommendCencel(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/recommend/cancel',
    params: data
  })
} 

export function eatShelf(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/food/shelf',
    body: data
  })
} 
// food / shelf

export function eatqueryState(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/order/refund/queryState',
    params: data
  })
} 

export function eatshopfinishFood(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/order/finishFood',
    params: data
  })
} 

export function boundWeChatUser(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/restaurant/boundWeChatUser',
    params: data
  })
} 

export function sterilize(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/shop/sterilize/list',
    params: data
  })
} 
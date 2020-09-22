import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
// 首页
export function eatList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/food/recommend/list',
    params: data
  })
}  
export function shopInfo() {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/client/detail?id=1298522833797799937'
  })
} 

export function paySave(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/rtorder/client/save',
    body: data
  })
} 




export function classification(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/sys/sysdict/pullDown',
    params: data
  })
} 

export function foodList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/food/list',
    params: data
  })
} 

export function eatSbumit(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/shop/order/create',
    body: data
  })
} 

export function eatCar(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/shop/rtcart/save',
    body: data
  })
} 

export function eatCarList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/list',
    body: data
  })
} 

export function eatAddressList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/rtaddress/list',
    params: data
  })
} 

// shop / rtaddress / save
export function eatAddressSave(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/shop/rtaddress/save',
    body: data
  })
} 

export function eatOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/order/user/pageList',
    params: data
  })
} 

export function eatshopOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/order/restaurant/list',
    params: data
  })
} 
// shop / order / shopAccept
export function eatshopAccept(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/order/shopAccept',
    params: data
  })
} 
// shop / order / startDelivery
export function eatshopDelivery(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/order/startDelivery',
    params: data
  })
} 

export function eatshopFinish(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/order/finishDelivery',
    params: data
  })
} 


export function rtfoodDetail(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/rtfood/detail',
    params: data
  })
} 



export function eatOrderDetail(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/order/info',
    params: data
  })
} 

export function eatgroupList() {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/client/list?shopId=1298522833797799937'
  })
} 
export function eatreserveList() {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/client/reserveList?shopId=1298522833797799937'
  })
}  

export function eatgroupshopList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/food/group/shop/list',
    params: data
  })
} 

export function eatPingjia(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/shop/rtassess/create',
    body: data
  })
} 

export function eatpingjiaList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/rtassess/pageList',
    params: data
  })
} 

export function eatcancelOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/order/cancelOrder',
    params: data
  })
} 




export function eatPayOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/order/pay',
    params: data
  })
} 

export function eatCancelAgreeOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/order/cancel/agree',
    params: data
  })
} 
export function eatCancelRefuseOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/order/cancel/refuse',
    params: data
  })
} 

// eatRefuseOrder

export function eatRefuseOrder(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/order/shopRefuse',
    params: data
  })
} 

// shop / recommend / save
export function eatrecommend(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/shop/recommend/save',
    body: data
  })
} 

export function eatrecommendCencel(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/recommend/cancel',
    params: data
  })
} 

export function eatShelf(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/food/shelf',
    body: data
  })
} 
// food / shelf

export function eatqueryState(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/order/refund/queryState',
    params: data
  })
} 

export function eatshopfinishFood(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/order/finishFood',
    params: data
  })
} 

export function boundWeChatUser(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/restaurant/boundWeChatUser',
    params: data
  })
} 

export function sterilize(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-bms/shop/sterilize/list',
    params: data
  })
} 

export function balancePay(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/blade-bms/rtorder/client/balancePay',
    body: data
  })
} 

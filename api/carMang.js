import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http) 
export function getCarInfo(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-iot/parCar/getParkingPaymentInfo',
    params: data
  })
}  

export function payMoneys(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/userorder/wechat/pay?orderType=' + data.orderType+'&orderNum='+data.orderNum,
  })
}

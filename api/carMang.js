import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
export function carList(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/renren-fast/aCompanyCar/getList',
    params: data
  })
}

export function getCarInfo(data) {
  return http.fly.request({
    method: 'get',
    url: URL.host + '/blade-iot/parCar/getParkingPaymentInfo',
    params: data
  })
}  

export function payMoneys(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/renren-fast/wechat_car/pay?id=' + data.id,
  })
}

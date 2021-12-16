import http from "../utils/request.js"
import URL from "../utils/host.js"
// console.log(http)
export function tjCar(data) {
  return http.fly.request({
    method: 'post',
    url: URL.host + '/wechatuserorder',
    body: data
  })
} 

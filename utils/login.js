import {
  login,
  wechatuserInfo
} from "../api/my"; 


export function xdLogin(data) {
  wx.setStorage({
    key: 'userInfo',
    data: data.detail.userInfo
  })
  return new Promise(function (resolve, reject) {
    if (data.detail.userInfo) {
      wx.login({
        success: res => {
          // console.log(res)
          login({
            code: res.code, 
            appId:"wx2ee980985f11541a",
            grantType: 'wechat',
            scope: "all"
          }).then(res1 => {  
            wx.setStorage({
              key: 'token',
              data: res1.data.accessToken,
            }) 
            let userInfonew =  wx.getStorageSync('userInfo') 
            userInfonew.phone = res1.data.phone 
            wx.setStorage({
              key: 'userInfo',
              data: userInfonew
            }) 
            wx.setStorage({
              key: "openId",
              data: res1.data.oauthId,
            })
            resolve(res1.data)
          }).catch(res1 => {
            reject(res1.data)
          });
        }
      });
    } else {
      console.log("请授权");
    }
  })
}
export default {
  xdLogin
}
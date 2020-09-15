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
            // appId: 'wxfef791981a5dcf72',
            appId:"wxc35575f7a176ae3c",
            grant_type: 'wechat',
            scope: "all"
          }).then(res1 => { 
            wx.setStorage({
              key: 'token',
              data: res1.access_token,
            })
            let userInfonew =  wx.getStorageSync('userInfo') 
            userInfonew.phone = res1.phone 
            wx.setStorage({
              key: 'userInfo',
              data: userInfonew
            })
            if(res1.haveLogged==0){ 
              wechatuserInfo({
                nickName:data.detail.userInfo.nickName,
                picture:data.detail.userInfo.avatarUrl,
                id:res1.user_id,
                haveLogged:1
              }).then({

              })
            }
            wx.setStorage({
              key: "openId",
              data: res1.openId,
            })
            resolve(res1)
          }).catch(res1 => {
            reject(res1)
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
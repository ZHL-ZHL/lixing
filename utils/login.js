import {
  login
} from "../api/my";
import {
  onLogin
} from "../api/my";
import {
  userInfo
} from "../api/my";


export function xdLogin(data) {
  console.log(data.detail.encryptedData, data.detail.errMsg, data.detail.iv, '111111111111')
  return new Promise(function(resolve, reject) {
    if (data.detail.userInfo) {
      wx.login({
        success: res => {
          login({
            code: res.code
          }).then(res1 => {
            wx.setStorage({
              key: 'token',
              data: res1.data.token,
            })
            wx.setStorage({
              key: 'openId',
              data: res1.data.openId,
            })
            wx.setStorage({
              key: 'role',
              data: res1.data.roleId,
            })
            // wx.hideLoading()
            if (res1.data.haveLogged == 0) {
              wx.showLoading({
                title: "加载中",
                mask: true,
              });
              setTimeout(() => {
                userInfo({
                  id: res1.data.userId
                }).then(res2 => {
                  if (res2.code == 0) {
                    wx.setStorage({
                      key: 'userInfo',
                      data: res2.data,
                    })
                    resolve(res2.data)
                  } else {
                    wx.showToast({
                      title: res2.msg,
                      icon: "none"
                    })
                  }
                }).catch(res2 => {
                  reject(res2)
                })
              }, 1000)
              // , encryptedData: data.detail.encryptedData, errMsg: data.detail.errMsg, iv: data.detail.iv, code: res.code

            } else if (res1.data.haveLogged == 1) {
              wx.showLoading({
                title: "加载中",
                mask: true,
              });
              setTimeout(() => {
                onLogin({
                  nickName: data.detail.userInfo.nickName,
                  picture: data.detail.userInfo.avatarUrl
                }).then(res2 => {
                  if (res2.code == 0) {
                    resolve(res2.data)
                    wx.setStorage({
                      key: 'userInfo',
                      data: res2.data,
                    })
                  } else {
                    wx.showToast({
                      title: res2.msg,
                      icon: "none"
                    })
                  }
                }).catch(res2 => {
                  reject(res2)
                })
              })

            }
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
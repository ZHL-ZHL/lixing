// pages/eatOrderDetail/eatOrderDetail.js
import { eatOrderDetail, eatcancelOrder, eatPayOrder, eatshopAccept, eatshopDelivery, eatshopFinish, eatRefuseOrder, eatCancelAgreeOrder, eatCancelRefuseOrder, eatshopfinishFood} from "../../api/eat.js"
import URL from "../../utils/host.js"
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    detail:"",
    orderId:"",
    type:"",
    ylink: URL.imgURL,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.id,
      type:options.type
    })
   this.getDetail()
  },
  getDetail(){
    eatOrderDetail({ orderId: this.data.orderId}).then(res => {
      if (res.code == 200) {
        this.setData({
          detail: res.data
        })
      } else {
        wx.showToast({
          title: res.mag,
          icon: "none"
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.mag,
        icon: "none"
      })
    })
  },
  toPay(e) {
    let id = e.currentTarget.dataset.id;
    let data = {}
    data.orderId = id;

    eatPayOrder(data).then(res => {
      if (res.code == 200) {
        let data = JSON.parse(res.data)
        console.log(data)
        let pay_info = JSON.parse(data.pay_info)
        console.log(pay_info)

        wx.requestPayment({
          // 'appId': data,
          'timeStamp': pay_info.timeStamp,
          'nonceStr': pay_info.nonceStr,
          'package': pay_info.package,
          'signType': pay_info.signType,
          'paySign': pay_info.paySign,
          'success': res => {
            console.log(res)
            this.getDetail()
          },
          fail: function (res1) {
            console.log(res1)
          }
        })

      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: "none"
      })
    })
  },
  toCencel(e) {
    let id = e.currentTarget.dataset.id;
    let data = {}
    data.orderId = id;

    wx.showModal({
      title: '提示',
      content: '您确定要取消吗？',
      showCancel: true,
      cancelText: '我再想想',
      confirmText: '确定',
      confirmColor: '',
      success: res => {
        if (res.confirm) {
          eatcancelOrder(data).then(res => {
            if (res.code == 200) {
              this.getDetail()
            } else {
              wx.showToast({
                title: res.msg,
                icon: "none"
              })
            }
          }).catch(res => {
            wx.showToast({
              title: res.msg,
              icon: "none"
            })
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  toLook(e) {
    let id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: '/pages/eatQueryState/eatQueryState?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  toEvaluate(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/evaluate/evaluate?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  toaccept(e) {
    eatshopAccept({ orderId: e.currentTarget.dataset.id }).then(res => {
      if (res.code == 200) {
        this.getDetail()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
    })
  },
  toDelivery(e) {
    eatshopDelivery({ orderId: e.currentTarget.dataset.id }).then(res => {
      if (res.code == 200) {
        this.getDetail()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
    })
  },
  tofoodfinish(e) {

    eatshopfinishFood({ orderId: e.currentTarget.dataset.id }).then(res => {
      if (res.code == 200) {
        this.getDetail()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
    })
  },
  tofinish(e) {
    eatshopFinish({ orderId: e.currentTarget.dataset.id }).then(res => {
      if (res.code == 200) {
        this.getDetail()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
    })
  },
  toRefuse(e) {

    wx.showModal({
      title: '提示',
      content: '确定要拒绝这个单子吗？',
      showCancel: true,
      cancelText: '我再想想',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          eatRefuseOrder({ orderId: e.currentTarget.dataset.id }).then(res => {
            if (res.code == 200) {
              this.getDetail()
            } else {
              wx.showToast({
                title: res.msg,
                icon: 'none',
              })
            }
          }).catch(res => {
            wx.showToast({
              title: res.msg,
              icon: 'none',
            })
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  toRefuseCancel(e) {
    eatCancelRefuseOrder({ orderId: e.currentTarget.dataset.id }).then(res => {
      if (res.code == 200) {
        this.getDetail()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
    })
  },
  toAgreeCancel(e) {
    wx.showModal({
      title: '提示',
      content: '确定要同意这个单子取消吗？',
      showCancel: true,
      cancelText: '我再想想',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          eatCancelAgreeOrder({ orderId: e.currentTarget.dataset.id }).then(res => {
            if (res.code == 200) {
              this.getDetail()
            } else {
              wx.showToast({
                title: res.msg,
                icon: 'none',
              })
            }
          }).catch(res => {
            wx.showToast({
              title: res.msg,
              icon: 'none',
            })
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
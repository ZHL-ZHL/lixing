// pages/carNumberDetail/carNumberDetail.js
import {
  getCarInfo,
  payMoneys
} from "../../api/carMang.js" 
import Url from "../../utils/host.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // url: Url.host,
    show: false,
    id:null,
    showCarInfo: false,
    plateNo: "",
    entryTime: "",
    outTime: "",
    imgName:"",
    payable:0,
    payedFee:0, 
  }, 
  onClose() {
    this.setData({ close: false });
  }, 
  onShowcar(){
    this.setData({ show: true });
  },
  payMoney(){ 
    payMoneys({
      id: this.data.id
    }).then(res=>{
      let pay_info = JSON.parse(JSON.parse(res.data).pay_info)
      console.log(pay_info)
      wx.requestPayment({
        // 'appId': data,
        'timeStamp': pay_info.timeStamp,
        'nonceStr': pay_info.nonceStr,
        'package': pay_info.package,
        'signType': pay_info.signType,
        'paySign': pay_info.paySign,
        'success': function (res) {
          console.log(res)
          wx.showToast({
            title: "支付成功",
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.navigateTo({
                url: '/pages/paySuccess/paySuccess?type=1',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            }
          })
        },
        fail: function (res1) {
        }
      })
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    getCarInfo({
      plateNo: options.plateNo
    }).then(res => { 
      if (res.code == 0 && res.resCode == 0) {
          this.setData({
            showCarInfo:true,
            id:res.data.id,
            plateNo: res.data.plateNo,
            entryTime: res.data.entryTime,
            outTime: res.data.outTime,
            imgName: res.data.imgName,
            payable: res.data.payable, 
            payedFee: res.data.payedFee, 
          })
      } else {
        wx.showToast({
          title: res.resMsg,
          icon: 'none',
          image: '',
          mask: true,
          duration: 1500, 
          success: function(res) {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 1500);

          },
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
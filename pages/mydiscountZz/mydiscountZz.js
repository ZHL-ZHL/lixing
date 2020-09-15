// pages/mydiscountZz/mydiscountZz.js
import drawQrcode from 'weapp-qrcode'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      setMoney:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let data={}
    // data.openId=wx.getStorageSync('openId')
   
    
  },
  sacnCode(){
    console.log(1)
    wx.scanCode({
      success (res) {
        console.log(res)
        let payType=JSON.parse(res.result).payType
        if(payType==1){
          wx.navigateTo({
            url: '/pages/mydiscountZzS/mydiscountZzS?type=2&openId='+JSON.parse(res.result).openId,
          })
        }else{
          // mydiscountZzPay
          wx.navigateTo({
            url: '/pages/mydiscountZzPay/mydiscountZzPay?info='+res.result,
          })
        }
        
      },fail(res){
        console.log(res)
      }
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
    var that=this
    let data={}
    data.openId=wx.getStorageSync('openId')
    if(this.data.setMoney!=0){
      data.payType=2
      data.money=this.data.setMoney
      data.nickname=wx.getStorageSync('userInfo').nickName
    }else{
      data.payType=1
    }
    wx.getStorage({
      key: 'userInfo',
      success:(res=>{
        let avartar=res.data.avatarUrl
        wx.getImageInfo({
          src: avartar,
          success:function(result){
            drawQrcode({
              canvasId: 'myQrcode',
              text:JSON.stringify(data),
              width: 160,
              height: 160,
              image: {
                imageResource:result.path,
                dx: 55,
                dy: 55,
                dWidth: 50,
                dHeight: 50
               }
            })
          }
        })
      })
    })
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
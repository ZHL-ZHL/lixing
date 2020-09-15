// pages/mydiscountZzPay/mydiscountZzPay.js
import {totransfer} from '../../api/discount'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:'',
    nickname:"",
    otherOpenId:""
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        nickname:JSON.parse(options.info).nickname,
        otherOpenId:JSON.parse(options.info).openId,
        money:JSON.parse(options.info).money,
      })
  },
  toPay(){
    let data={}
    data.appId="wxc35575f7a176ae3c"
    data.fromOpenId=wx.getStorageSync('openId')
    data.toOpenId=this.data.otherOpenId
    data.transferMoney=this.data.money
    totransfer(data).then(res=>{
       if(res.code==200){
         wx.showToast({
           title: '转账成功',
           success:function(){
            setTimeout(res1=>{
              wx.navigateBack({
                delta: 2,
              })
           },1500)
           }
         })
           
       }else{
           wx.showToast({
             title: res.msg,
             icon:"none"
           })
       }
    }).catch(res=>{
      wx.showToast({
        title:res,
        icon:"none"
      })
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
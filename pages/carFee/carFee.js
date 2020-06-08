// pages/carFee/carFee.js
import { dayReport} from "../../api/property.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today:0,
    month:0,
    monthData:"",
    todayData:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    dayReport().then(res=>{
       if(res.code==0){
         let month = 0;
         let today=0;
         console.log(today)
         res.data[0].res.forEach(v=>{
           today += v.amount
         })
         res.data[1].res.forEach(v => {
           month += v.amount
         })
         today = parseFloat(today / 100).toFixed(2)
         month = parseFloat(month / 100).toFixed(2)
         console.log(month, today)
         this.setData({
           month,
           today,
           monthData: res.data[1],
           todayData: res.data[0],
           todayData1: res.data[0].date.slice(0,10)
         })
       }else{
         wx.showToast({
           title: res.msg,
           icon: "none"
         })
       }
    }).catch(res=>{
      wx.showToast({
        title: res.msg,
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
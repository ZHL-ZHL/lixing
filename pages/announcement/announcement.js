// pages/announcement/announcement.js
import { sterilize} from "../../api/eat.js"
var util = require('../../utils/util.js');
console.log(util)
console.log()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopId:"",
    date: util.getNowTime(new Date()),
    list:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopId:options.shopId,
    })
    this.getList()
  },
  getList(){
    sterilize({ shopId: this.data.shopId, date: this.data.date }).then(res=>{
       if(res.code==200){
          this.setData({
            list:res.data
          })
       }else{
         wx.showToast({
           title: res.msg,
           icon: 'none',
         })
       }
    }).catch(res=>{
      wx.showToast({
        title: res.msg,
        icon: 'none',
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
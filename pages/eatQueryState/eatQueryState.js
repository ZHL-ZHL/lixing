// pages/eatQueryState/eatQueryState.js
import { eatqueryState} from "../../api/eat.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
   msg:"",
   data:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    eatqueryState({orderId:options.id}).then(res=>{
      if(res.code==200){
         this.setData({
            msg:res.msg,
            data:res.data
         })
      }else{
        wx.showToast({
          title: res.msg,
          icon:"none"
        })
      }
    }).catch(res=>{
      wx.showToast({
        title: res.msg,
        icon: "none"
      })
    })
  },
  goback(){
    wx.navigateBack({
      delta: 1,
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
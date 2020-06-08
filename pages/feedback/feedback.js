// pages/feedback/feedback.js
import {
  feedback
} from "../../api/my"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:""
  },
  content(e){
     this.setData({
       content:e.detail.value
     })
  },
  submit(){
     if(this.data.content.length==0){
        wx.showToast({
          title: '请输入问题或意见',
          icon:"none"
        })
     }else{
       feedback({ adviseDetail:this.data.content}).then(res=>{
          if(res.code==0){
             wx.showToast({
               title: '提交成功',
               success:function(){
                 wx.navigateBack({
                   delta: 1,
                 })
               }
             })
          }else{
            wx.showToast({
              title: res.msg,
              icon: "none"
            })
          }
       }).catch(res=>{
          wx.showToast({
            title: res,
            icon:"none"
          })
       })
     }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
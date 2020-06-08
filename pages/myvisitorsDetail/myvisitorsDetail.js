// pages/myvisitorsDetail/myvisitorsDetail.js
import { visitorsDetail} from "../../api/visitors.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointmentId:"",
    info:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      appointmentId:options.id
    })
    this.getDetail()
  },
  getDetail(){
    visitorsDetail({ appointmentId: this.data.appointmentId}).then(res=>{
       if(res.code==0){
          this.setData({
            info:res.data
          })
       }else{
          wx.showToast({
            title: res.desc,
            icon:"none"
          })
       }
    }).catch(res=>{
      wx.showToast({
        title: res,
        icon: "none"
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
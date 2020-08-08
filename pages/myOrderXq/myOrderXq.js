// pages/myOrderXq/myOrderXq.js
import { orderDetail} from "../../api/order.js"
import Url from "../../utils/host.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:"",
    info: "", 
    online: Url.imghost,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.id
    })
    this.getDetail()
  },
  getDetail(){
    orderDetail({ id: this.data.orderId}).then(res=>{
       if(res.code==200){
         this.setData({
           info:res.data
         })
       }else{
        wx.showToast({
          title: res.msg,
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
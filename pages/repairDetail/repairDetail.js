// pages/repairDetail/repairDetail.js
import { repairDetail} from "../../api/repair.js"
import { addCar } from "../../api/repair.js"
import { collect } from "../../api/collect.js"
import Url from "../../utils/host.js"
import {
  xdLogin,
} from "../../utils/login"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repairId:"",
    maintenance:"",
    wechatUserId:"",
    favorite:"",
    onLine: Url.imghost,
    userInfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       repairId:options.id,
       wechatUserId:wx.getStorageSync('userInfo').wechatUserId,
       userInfo: wx.getStorageSync('userInfo')
     })
     this.getDetail()
  },
  getDetail(){
    repairDetail({ id: this.data.repairId, wechatUserId: this.data.wechatUserId}).then(res=>{
       if(res.code==0){
          this.setData({
            maintenance: res.maintenance,
            favorite: res.maintenance.favorite
          })
       }else{

       }
    }).catch(res=>{

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toCollect(){
    let data = {};
    data.wechatUserId = this.data.wechatUserId
    data.itemType = 2;
    data.itemId = this.data.repairId;
    collect(data).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: res.msg,
        })
        this.setData({
          favorite: !(this.data.favorite)
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res,
        icon: "none"
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  orderTj(){
    wx.navigateTo({
      url: '/pages/tjMeeting/tjMeeting?info=' + JSON.stringify(this.data.maintenance) + '&orderType=2',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getuser(e){
    let type = e.currentTarget.dataset.type
    if (this.data.userInfo){
      if (type == 1) {
        this.addcar()
      } else if (type == 2) {
        this.orderTj()
      }    
    }else{
      xdLogin(e).then(res => {
        this.setData({
          userInfo: res
        })
        if (type==1){
          this.addcar()
        }else if(type==2){
          this.orderTj()
        }
        

      }).catch(res => {
        console.log(res)
      })
    }
  },
  addcar(){
     addCar({itemId:this.data.repairId}).then(res=>{
        if(res.code==0){
           wx.showToast({
             title: res.msg,
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
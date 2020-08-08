// pages/myInfo/myInfo.js
import { userInfo } from "../../api/my";
import { xgUserInfo } from "../../api/my";
import { upLoadIMg } from "../../utils/upload.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:"",
    userInfo:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       userInfo: wx.getStorageSync("userInfo")
     })
     console.log( wx.getStorageSync("userInfo"))
    // this.getUser()
  },
  getUser(){
    console.log('111111111111')
    userInfo({ id: this.data.userId}).then(res=>{
      if(res.code==200){
        this.setData({
          userInfo:res.data
        })
      }else{
        wx.showToast({
          title: res.desc,
          icon: "none"
        })
      }
    }).catch(res=>{
       wx.showToast({
         title: res,
         icon:"none"
       })
    })
  },
  blurNickName(e){
    if(e.detail.value==""){
       this.setData({
         userInfo:this.data.userInfo
       })
    }else{
      let userInfo=this.data.userInfo;
      userInfo.nickName=e.detail.value
      this.setData({
        userInfo: userInfo
      })
    }
  },
  blurPhone(e){
    if (e.detail.value == "") {
      this.setData({
        userInfo: this.data.userInfo
      })
    } else {
      let userInfo = this.data.userInfo;
      userInfo.phone = e.detail.value
      this.setData({
        userInfo: userInfo
      })
    }
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        var data = res.tempFilePaths

        upLoadIMg(data).then(res => {
          let userInfo=this.data.userInfo;
          userInfo.picture=res.data.url
          that.setData({
            userInfo: userInfo
          });
        }).catch(res => {

        })
      }
    })
  },
  toSave(){
    let userInfo=this.data.userInfo;
    var that=this;
    xgUserInfo(userInfo).then(res=>{
      if (res.code == 200) {
        wx.setStorage({
          key: 'userInfo',
          data: that.data.userInfo,
          success: res => {
            wx.navigateBack({
              delta: 1,
            })
          }
        })
      } else {
        wx.showToast({
          title: res.desc,
          icon: "none"
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
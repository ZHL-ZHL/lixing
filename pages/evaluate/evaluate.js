// pages/evaluate/evaluate.js
import {
  upLoadIMg
} from "../../utils/upload.js"
import { eatPingjia} from "../../api/eat.js"
import URL from "../../utils/host.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:0,
    files:[],
    orderId:"",
    content: "", 
    ylink: URL.imgURL,

  },
  onChange(event) {
    this.setData({
      value: event.detail
    });
  },
  content(e){
    this.setData({
      content:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      orderId:options.id
    })
  },
  previewImage(){

  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var data = res.tempFilePaths
        console.log(data)
        var files = that.data.files

        upLoadIMg(data).then(res => {
          files.push(res.url)
          that.setData({
            files
          })
          console.log(that.data.files)
        }).catch(res => {

        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  toPingjia(){
    let data={}
    data.assessShopId = 1
    data.assessOrderId = this.data.orderId
    data.assessScore = this.data.value
    data.assessContent = this.data.content
    console.log(this.data.files)
    data.assessImage=this.data.files.join(",")
    eatPingjia(data).then(res=>{
      if(res.code==0){
        wx.showToast({
          title: '评价成功',
          duration: 2000,
          mask: true,
          success: function(res) {
            wx.navigateBack({
              delta: 1,
            })
          },
          fail: function(res) {},
          complete: function(res) {},
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
  *
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
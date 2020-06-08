// pages/reviewPending/reviewPending.js
import {
  upLoadIMg
} from "../../utils/upload.js"
import Url from "../../utils/host.js"
import {
  updateCompanyMileage,
  addFpWaybill,
  getFpWaybill
} from "../../api/baiducard.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    includePoints: [],
    polyline: [],
    viaPointList: [],
    onLine: Url.imghost,
    mileageStartPic: '',
    userStratTime: "",
    userEndTime: "",
    id: "",
    brandName: "",
    plateCar: "",
    carType: "",
    starting: "",
    end: "",
    stratLatitude: "",
    endLongitude: "",
    attachments: [],
    reason: "",
    viaPointList: [],
  },
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        var data = res.tempFilePaths
        upLoadIMg(data).then(res1 => {
          that.setData({
            mileageStartPic: res1.url
          })
          console.log(that.data.mileageStartPic)
        }).catch(res => {})
      }
    })
  },
  updateCompanyMileagebtn: function(e) {
    if (!this.data.mileageStartPic) {
      wx.showToast({
        title: '请上传里程开始图片',
        icon: "none"
      })
    } else {
      let that = this
      wx.getSetting({
        success: res => { 
          if (res.authSetting['scope.userLocationBackground']) {
            updateCompanyMileage({
              id: this.data.id,
              mileageDrivingStatus: 1,
              mileageStartPic: this.data.mileageStartPic
            }).then(res => {
              if (res.code == 0) {
                wx.startLocationUpdate({
                  success(res) {
                    wx.startLocationUpdateBackground({
                      success(res) {
                        updateCompanyMileage({
                          id: that.data.id,
                          mileageDrivingStatus: 1
                        }).then(res => {
                          if (res.code == 0) {
                            const latitude = that.data.endLongitude.split(",")[0]
                            const longitude = that.data.endLongitude.split(",")[1]
                            const name = that.data.end
                            wx.navigateBack({
                              delta: 1,
                            })
                            wx.openLocation({
                              latitude: parseFloat(latitude),
                              longitude: parseFloat(longitude),
                              scale: 18,
                              name: name
                            })
                            wx.onLocationChange(function(res) {
                              console.log(res.latitude + ',' + res.longitude)
                              addFpWaybill({
                                id: that.data.id,
                                coordinate: res.latitude + ',' + res.longitude
                              }).then(res => {
                                console.log(res)
                              })
                            })
                          }
                        })
                      },
                      fail(res) {
                        console.log('开启后台定位失败', res)
                      }
                    })
                  },
                  fail(res) {
                    console.log('开启后台定位失败', res)
                  }
                })
              }
            })
          } else {
            wx.openSetting({})
          }
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.stopLocationUpdate(function(res) {
      console.log('location change', res)
    })
    console.log(options.attachment)
    let arr = []
    options.attachment = options.attachment.split(",")
    options.attachment.forEach(item => {
      arr.push({
        url: item
      })
    })
    this.setData({
      attachments: arr
    })
    this.setData({
      showCarInfo: options.type,
      id: options.id,
      brandName: options.brandName,
      plateCar: options.plateCar,
      carType: options.carType,
      starting: options.starting,
      end: options.end,
      reason: options.reason,
      userStratTime: options.userStratTime,
      userEndTime: options.userEndTime,
      attachments: options.attachments,
      stratLatitude: options.stratLatitude,
      endLongitude: options.endLongitude,
      viaPointList: options.viaPoint ? options.viaPoint == 'null' ? [] : JSON.parse(options.viaPoint) : [],
    });
    console.log(this.data.viaPointList)
    let arrpoint = [{
      longitude: parseFloat(this.data.stratLatitude.split(',')[1]),
      latitude: parseFloat(this.data.stratLatitude.split(',')[0]),
    }]
    let markerarr = [{
      label: {
        content: '起点', //文本
        color: '#FF0202', //文本颜色
        borderRadius: 3, //边框圆角
        borderWidth: 1, //边框宽度
        borderColor: '#FF0202', //边框颜色
        bgColor: '#ffffff', //背景色
        padding: 5, //文本边缘留白
        textAlign: 'center' //文本对齐方式。有效值: left, right, center
      },
      //气泡callout
      callout: {
        content: '起点', //文本
        color: '#FF0202', //文本颜色
        borderRadius: 3, //边框圆角
        borderWidth: 1, //边框宽度
        borderColor: '#FF0202', //边框颜色
        bgColor: '#ffffff', //背景色
        padding: 5, //文本边缘留白
        textAlign: 'center' //文本对齐方式。有效值: left, right, center
      },
      id: 0,
      latitude: parseFloat(this.data.stratLatitude.split(',')[0]),
      longitude: parseFloat(this.data.stratLatitude.split(',')[1]),
      width: 50,
      height: 50
    }]
    this.data.viaPointList.forEach((item, index) => {
      arrpoint.push({
        longitude: parseFloat(item.location.split(',')[1]),
        latitude: parseFloat(item.location.split(',')[0])
      })
      markerarr.push({
        label: {
          content: item.address, //文本
          color: '#FF0202', //文本颜色
          borderRadius: 3, //边框圆角
          borderWidth: 1, //边框宽度
          borderColor: '#FF0202', //边框颜色
          bgColor: '#ffffff', //背景色
          padding: 5, //文本边缘留白
          textAlign: 'center' //文本对齐方式。有效值: left, right, center
        },
        //气泡callout
        callout: {
          content: item.address, //文本
          color: '#FF0202', //文本颜色
          borderRadius: 3, //边框圆角
          borderWidth: 1, //边框宽度
          borderColor: '#FF0202', //边框颜色
          bgColor: '#ffffff', //背景色
          padding: 5, //文本边缘留白
          textAlign: 'center' //文本对齐方式。有效值: left, right, center
        },
        id: index,
        latitude: parseFloat(item.location.split(',')[0]),
        longitude: parseFloat(item.location.split(',')[1]),
        width: 50,
        height: 50
      })
    })
    markerarr.push({
      label: {
        content: '终点', //文本
        color: '#FF0202', //文本颜色
        borderRadius: 3, //边框圆角
        borderWidth: 1, //边框宽度
        borderColor: '#FF0202', //边框颜色
        bgColor: '#ffffff', //背景色
        padding: 5, //文本边缘留白
        textAlign: 'center' //文本对齐方式。有效值: left, right, center
      },
      //气泡callout
      callout: {
        content: '终点', //文本
        color: '#FF0202', //文本颜色
        borderRadius: 3, //边框圆角
        borderWidth: 1, //边框宽度
        borderColor: '#FF0202', //边框颜色
        bgColor: '#ffffff', //背景色
        padding: 5, //文本边缘留白
        textAlign: 'center' //文本对齐方式。有效值: left, right, center
      },
      id: 1,
      latitude: parseFloat(this.data.endLongitude.split(',')[0]),
      longitude: parseFloat(this.data.endLongitude.split(',')[1]),
      width: 50,
      height: 50
    })

    arrpoint.push({
      longitude: parseFloat(this.data.endLongitude.split(',')[1]),
      latitude: parseFloat(this.data.endLongitude.split(',')[0])
    })
    this.setData({
      markers: markerarr,
      includePoints: arrpoint,
      polyline: [{
        points: arrpoint,
        color: "#FF0000DD",
        width: 2,
        dottedLine: true
      }]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
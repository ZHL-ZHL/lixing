// pages/beenCompleted/beenCompleted.js
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
    mileageNumber: "",
    markers: [],
    includePoints: [],
    polyline: [],
    viaPointList: [],
    mileageDrivingStatus: null,
    costMoneys: [],
    onLine: Url.imghost,
    mileageStartPic: '',
    mileageEndPic: '',
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
    subsidieMoney: '',
    mileageReamrk: '',

  },
  endUseCar(e) {
    let value = e.detail.value
    console.log(e)
    if (!this.data.mileageEndPic) {
      wx.showToast({
        title: '请上传里程结束图片',
        icon: "none"
      })
    } else {
      if (this.data.costMoneys.length > 0) {
        this.data.costMoneys = this.data.costMoneys.map(item => {
          return item.url
        })
      }
      updateCompanyMileage({
        id: this.data.id,
        mileageDrivingStatus: 2,
        mileageEndPic: this.data.mileageEndPic, //里程结束 
        costMoneys: this.data.costMoneys, //费用凭证  数组
        otherMoney: value.otherMoney, //其它费用
        mileageReamrk: value.mileageReamrk //备注
      }).then(res => {
        if (res.code == 0) {
          wx.stopLocationUpdate(function(res) {
            console.log('location change', res)
          })
          wx.navigateBack({
            delta: 1,
          })
        }

      })
    }

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
            mileageEndPic: res1.url
          })
          console.log(that.data.mileageEndPic)
        }).catch(res => {

        })
      }
    })
  },
  delImg(e) {
    let index = this.data.costMoneys.findIndex(item => item.url == e.target.id)
    console.log(e.target.id, index)
    this.data.costMoneys.splice(index, 1)
    this.setData({
      costMoneys: this.data.costMoneys
    });
  },
  chooseImage1: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        var data = res.tempFilePaths
        upLoadIMg(data).then(res => {
          let arr = that.data.costMoneys;
          arr.push(res)
          that.setData({
            costMoneys: arr
          });
          console.log(that.data.costMoneys)
        }).catch(res => {

        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.attachment)
    let arr = []
    if (options.attachment !== 'null') {
      options.attachment = options.attachment.split(",")
      options.attachment.forEach(item => {
        arr.push({
          url: item
        })
      })
    }

    let arr1 = []
    if (options.costMoneys !== 'null') {
      options.costMoneys = options.costMoneys.split(",")
      options.costMoneys.forEach(item => {
        arr1.push({
          url: item
        })
      })
    }

    console.log(arr1)
    this.setData({
      attachments: arr,
      costMoneys: arr1
    })
    // console.log(options.costMoneys, options.mileageReamrk)
    this.setData({
      mileageNumber: options.mileageNumber == 'null' ? 0 : options.mileageNumber,
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
      // attachments: options.attachments,
      stratLatitude: options.stratLatitude,
      endLongitude: options.endLongitude,
      mileageStartPic: options.mileageStartPic,
      mileageDrivingStatus: options.mileageDrivingStatus,
      viaPointList: options.viaPoint ? options.viaPoint == 'null' ? [] : JSON.parse(options.viaPoint) : [],
      mileageEndPic: options.mileageEndPic == 'null' ? '' : options.mileageEndPic, //里程结束 
      // costMoneys: options.costMoneys == 'null' ? [] : options.costMoneys , //费用凭证  数组
      otherMoney: options.otherMoney == 'null' ? '' : options.otherMoney, //其它费用
      mileageReamrk: options.mileageReamrk == 'null' ? '' : options.mileageReamrk //备注

    });


    if (this.data.mileageDrivingStatus == 1) {
      let that = this
      let string = ''
      console.log('111111111')
      wx.startLocationUpdate({
        success(res) {
          wx.startLocationUpdateBackground({
            success(res) {
              wx.onLocationChange(function(res) { 
                string = res.latitude + ',' + res.longitude
                if (wx.setStorageSync('coordinate') && wx.setStorageSync('coordinate') == string) {
                  return false
                }
                wx.setStorage({
                  key: 'coordinate',
                  data: res.latitude + ',' + res.longitude,
                })
                addFpWaybill({
                  id: that.data.id,
                  coordinate: res.latitude + ',' + res.longitude
                }).then(res => {
                  console.log(res)
                })
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
        width: 20,
        height: 20
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
          width: 20,
          height: 20
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
        width: 20,
        height: 20
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
    } else {
      wx.stopLocationUpdate(function(res) {
        console.log('location change', res)
      })
      getFpWaybill({
        id: options.id
      }).then(res => {
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
          id: '00',
          latitude: parseFloat(this.data.stratLatitude.split(',')[0]),
          longitude: parseFloat(this.data.stratLatitude.split(',')[1]),
          width: 20,
          height: 20
        }]
        if (res.data.length > 0) {
          res.data = Array.from(new Set(res.data))
          res.data.forEach((item, index) => {
            arrpoint.push({
              longitude: parseFloat(item.split(',')[1]),
              latitude: parseFloat(item.split(',')[0])
            })
            markerarr.push({
              // label: {
              //   content: item.address, //文本
              //   color: '#FF0202', //文本颜色
              //   borderRadius: 3, //边框圆角
              //   borderWidth: 1, //边框宽度
              //   borderColor: '#FF0202', //边框颜色
              //   bgColor: '#ffffff', //背景色
              //   padding: 5, //文本边缘留白
              //   textAlign: 'center' //文本对齐方式。有效值: left, right, center
              // },
              // //气泡callout
              callout: {
                display:'BYCLICK',
                // content: item.address, //文本
                // color: '#FF0202', //文本颜色
                // borderRadius: 3, //边框圆角
                // borderWidth: 1, //边框宽度
                // borderColor: '#FF0202', //边框颜色
                // bgColor: '#ffffff', //背景色
                // padding: 5, //文本边缘留白
                // textAlign: 'center' //文本对齐方式。有效值: left, right, center
              },
              alpha: 0,
              id: index,
              latitude: parseFloat(item.split(',')[0]),
              longitude: parseFloat(item.split(',')[1]),
              width: 0,
              height: 0
            })
          })
        }
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
          id: '01',
          latitude: parseFloat(this.data.endLongitude.split(',')[0]),
          longitude: parseFloat(this.data.endLongitude.split(',')[1]),
          width: 20,
          height: 20
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
      })
    }
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
// pages/comCarRecord/comCarRecord.js
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
    mileageDrivingStatus: null,
    userStratTime: "",
    userEndTime: "",
    id: "",
    carId: "",
    brandName: "",
    plateCar: "",
    carType: "",
    starting: "",
    end: "",
    stratLatitude: "",
    endLongitude: "",
    attachments: [],
    reason: "",
    onLine: Url.imghost,
    pictureList: [],
    showEnd: false,
    showSave: false,
    showStart: true,
    onLine: Url.imghost,
    markers: [],
    includePoints: [],
    polyline: [],
    viaPointList: [],
    mileageNumber: "",
    options:""
  },
  chooseImage: function(e) {
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
          let arr = that.data.pictureList;
          arr.push(res)
          that.setData({
            pictureList: arr
          });
          console.log(that.data.pictureList)
        }).catch(res => {

        })
      }
    })
  },
  delImg(e) {
    let index = this.data.pictureList.findIndex(item => item.url == e.target.id)
    this.data.pictureList.splice(index, 1)
    this.setData({
      pictureList: this.data.pictureList
    });
    // console.log(this.data.pictureList)
  },
  toMap(e) {
    let that = this
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userLocationBackground']) {
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
                      that.setData({
                        showEnd: true,
                        showStart: false,
                        showSave: false
                      })
                      wx.openLocation({
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        scale: 18,
                        name: name
                      })
                      wx.onLocationChange(function(res) {
                        console.log({
                          id: that.data.id,
                          coordinate: res.latitude + ',' + res.longitude
                        })
                        addFpWaybill({
                          id: that.data.id,
                          coordinate: res.latitude + ',' + res.longitude
                        }).then(res => {
                          console.log(res)
                        })
                      })
                      wx.navigateBack({
                        delta: 1,
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
        } else {
          wx.openSetting({

          })
        }

      }
    })




  },
  toEnd() {
    this.setData({
      showEnd: false,
      showStart: false,
      showSave: true
    })
  },
  toSave() {

    if (this.data.pictureList.length == 0) {
      wx.showToast({
        title: '请上传附件',
        icon: "none"
      })
      return false
    }
    let arr = this.data.pictureList.map(item => {
      return item.url
    })
    wx.stopLocationUpdate(function(res) {
      console.log('location change', res)
    })
    updateCompanyMileage({
      id: this.data.id,
      mileageDrivingStatus: 2
    }).then(res => {
      if (res.code == 0) {
        this.setData({
          showEnd: false,
          showStart: false,
          showSave: false
        })
        wx.navigateBack({
          delta: 1,
        })
      }
    })

  },
  updateCompanyMileagebtn: function(e) {



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

   console.log(options)
    this.setData({
      mileageNumber: options.mileageNumber == 'null' ? 0 : options.mileageNumber,
      id: options.id,
      brandName: options.brandName,
      plateCar: options.plateCar,
      carType: options.carType,
      starting: options.starting,
      end: options.end,
      stratLatitude: options.stratLatitude,
      endLongitude: options.endLongitude,
      attachments: options.attachment,
      reason: options.reason,
      userStratTime: options.userStratTime,
      userEndTime: options.userEndTime,
      carId: options.carId,
      mileageDrivingStatus: options.mileageDrivingStatus,
      viaPointList: options.viaPoint ? options.viaPoint == 'null' ? [] : JSON.parse(options.viaPoint) : [],
      options
    })
    if (options.mileageDrivingStatus !== 2) {
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
    }


    if (options.mileageStatus == 0 && options.mileageDrivingStatus == 0) {
      this.setData({
        showStart: true,
        showEnd: false,
        showSave: false
      })
    }
    if (options.mileageStatus == 0 && options.mileageDrivingStatus == 1) {
      let that = this
      wx.startLocationUpdate({
        success(res) {
          wx.startLocationUpdateBackground({
            success(res) {
              wx.onLocationChange(function(res) {
                console.log({
                  id: that.data.id,
                  coordinate: res.latitude + ',' + res.longitude
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

      this.setData({
        showStart: false,
        showEnd: true,
        showSave: false
      })
    }
    if (options.mileageStatus == 0 && options.mileageDrivingStatus == 2) {
      wx.stopLocationUpdate(function(res) {
        console.log('location change', res)
      })
      this.setData({
        showStart: false,
        showEnd: false,
        showSave: false
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
              //气泡callout
              callout: {
                display: 'BYCLICK',
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

    let arr = []
    console.log(options.alsoAttachment)
    if (options.alsoAttachment) {
      options.alsoAttachment = options.alsoAttachment.split(",")
      options.alsoAttachment.forEach(item => {
        arr.push({
          url: item
        })
      })
    }

    this.setData({
      pictureList: arr
    })
    // mileageStatus  0审核通过 1审核失败 2待审核 
    // mileageDrivingStatus  0未使用 1使用中 2已完成
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
  onShareAppMessage: function(res) {
  
    if (res.from === 'button') { }
    console.log('/pages/comCarRecord/comCarRecord?' + this.data.options)
    return {
      title: '用车详情',
      path: '/pages/comCarRecord/comCarRecord?type=' + 1 + '&id=' + this.data.options.id + '&carId=' + this.data.options.carId + '&brandName=' + this.data.options.brandName + '&plateCar=' + this.data.options.plateCar + '&carType=' + this.data.options.dictName + '&end=' + this.data.options.end + '&endLongitude=' + this.data.options.endLongitude + '&starting=' + this.data.options.starting + '&stratLatitude=' + this.data.options.stratLatitude + '&reason=' + this.data.options.reason + '&attachment=' + this.data.options.attachment + '&mileageStatus=' + this.data.options.mileageStatus + '&mileageDrivingStatus=' + this.data.options.mileageDrivingStatus + '&userStratTime=' + this.data.options.userStratTime + '&userEndTime=' + this.data.options.userEndTime + '&viaPoint=' + this.data.options.viaPoint + '&mileageNumber=' + this.data.options.mileageNumber,
      success: function (res) {

      }
    }
  }
})
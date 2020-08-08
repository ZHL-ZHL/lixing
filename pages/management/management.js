// pages/management/management.js

import {
  getAccessToken,
  getIDCard,
  saveaCompanyInfo,
  updeteaCompanyInfo,
  getaCompanyInfo
} from "../../api/baiducard.js"
import {
  upLoadIMg
} from "../../utils/upload.js"
import URL from "../../utils/host.js"
Page({
  goCarRecord() {
    wx.navigateTo({
      url: '/pages/carRecord/carRecord',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    onlineurl: URL.imgURL,
    showSave: false,
    showSub: false,
    infoName: '',
    phone: '', //手机号
    cardNo: '', //身份证
    cardPic: '', //身份证 正
    cardPicReverse: '', //身份证 反
    paperPic: '', //行车证 正
    paperPicReverse: '', //行车证 反
    driverPic: '', //驾驶证 正
    driverPicReverse: '', // 驾驶证 反
    infoId: '',
  },
  // 身份证识别验证
  chooseImage1: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var data = res.tempFilePaths
        upLoadIMg(data).then(res => {
          that.setData({
            cardPic: res.url
          })
        }).catch(res => {})
      }
    })
  },
  chooseImage2: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var data = res.tempFilePaths
        upLoadIMg(data).then(res => {
          that.setData({
            cardPicReverse: res.url
          })
        }).catch(res => {})
      }
    })
  },
  // 行车证
  chooseImage3: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var data = res.tempFilePaths
        upLoadIMg(data).then(res => {
          that.setData({
            paperPic: res.url
          })
        }).catch(res => {})
      }
    })
  },
  chooseImage4: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var data = res.tempFilePaths
        upLoadIMg(data).then(res => {
          that.setData({
            paperPicReverse: res.url
          })
        }).catch(res => {})
      }
    })
  },
  // 驾驶证
  chooseImage5: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var data = res.tempFilePaths
        upLoadIMg(data).then(res => {
          that.setData({
            driverPic: res.url
          })
        }).catch(res => {})
      }
    })
  },
  chooseImage6: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var data = res.tempFilePaths
        upLoadIMg(data).then(res => {
          that.setData({
            driverPicReverse: res.url
          })
        }).catch(res => {})
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getaCompanyInfo().then(res => {
      if (res.data) {
        this.setData({
          infoName: res.data.infoName,
          phone: res.data.phone, //手机号
          cardNo: res.data.cardNo, //身份证
          cardPic: res.data.cardPic, //身份证 正
          cardPicReverse: res.data.cardPicReverse, //身份证 反
          paperPic: res.data.paperPic, //行车证 正
          paperPicReverse: res.data.paperPicReverse, //行车证 反
          driverPic: res.data.driverPic, //驾驶证 正
          driverPicReverse: res.data.driverPicReverse, // 驾驶证 反 
          infoId: res.data.infoId,
          showSub: false,
          showSave: true,
        })
      } else {
        this.setData({
          showSave: false,
          showSub: true,
        })

      }
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

  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
  formSubmit(e) {
    let value = e.detail.value
    console.log(value)
    if (value.infoName.length == 0) {
      wx.showToast({
        title: '请填写名字',
        icon: "none"
      })
    } else if (value.phone.length == 0 || value.phone.length != 11) {
      wx.showToast({
        title: '手机号不正确',
        icon: "none"
      })
    } else if (value.cardNo.length == 0) {
      wx.showToast({
        title: '请输入身份证',
        icon: "none"
      })
    }

     else if (!this.data.cardPic) {
      wx.showToast({
        title: '请上传身份证正面照片',
        icon: "none"
      })
    } else if (!this.data.cardPicReverse) {
      wx.showToast({
        title: '请上传身份证反面照片',
        icon: "none"
      })
    } else if (!this.data.paperPic) {
      wx.showToast({
        title: '请上传行车证正面照片',
        icon: "none"
      })
    } else if (!this.data.paperPicReverse) {
      wx.showToast({
        title: '请上传行车证反面照片',
        icon: "none"
      })
    } else if (!this.data.driverPic) {
      wx.showToast({
        title: '请上传驾驶证正面照片',
        icon: "none"
      })
    } else if (!this.data.driverPicReverse) {
      wx.showToast({
        title: '请上传驾驶证反面照片',
        icon: "none"
      })
    } 
    else {
      value.cardPic = this.data.cardPic //身份证 正
      value.cardPicReverse = this.data.cardPicReverse //身份证 反
      value.paperPic = this.data.paperPic //行车证 正
      value.paperPicReverse = this.data.paperPicReverse //行车证 反
      value.driverPic = this.data.driverPic //驾驶证 正
      value.driverPicReverse = this.data.driverPicReverse // 驾驶证 反 
      if (this.data.showSub) {
        saveaCompanyInfo(value).then(res => {
          if (res.code == 200) {
            wx.showToast({
              title: '填写成功',
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
        }).catch(res => {
          wx.showToast({
            title: res,
            icon: "none"
          })
        })
      } else {
        value.infoId = this.data.infoId
        updeteaCompanyInfo(value).then(res => {
          if (res.code == 200) {
            wx.showToast({
              title: '修改成功',
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
        }).catch(res => {
          wx.showToast({
            title: res,
            icon: "none"
          })
        })
      }



    }

  },
})
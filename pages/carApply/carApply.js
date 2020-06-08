// pages/carApply/carApply.js 
var dateTimePicker = require('../../utils/datapicker.js');
import {
  saveaCompanyMileage,
  updateCompanyMileage,
  getCompany,
  sysapprove
} from "../../api/baiducard.js"
import {
  upLoadIMg
} from "../../utils/upload.js"

import Url from "../../utils/host.js"

Page({

  /**
   * 页面的初始数据
   */
  //  
  data: {
    id: null,
    columns: [],
    index: null,
    showCarInfo: false,
    onLine: Url.imghost,
    passType: '1',
    columns: [],
    region: [],
    date: '',
    time: '',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2020,
    endYear: 2050,
    show: true,
    name: "",
    idCode: "",
    showCompany: true,
    peerList: [],
    id: "",
    ownerName: "",
    brandName: "",
    plateCar: "",
    carType: "",
    starting: "",
    end: "",
    startlocation: "",
    endlocation: "",
    attachments: [],
    reason: "",
    userStratTime: "",
    userEndTime: "",
    viaPointList: [{
      address: "",
      location: ""
    }],

  },
  bindPickerChange: function(e) {
    console.log(e)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getCompany().then(res => {
      this.setData({
        columns: res.data,
        index: res.data.findIndex((value) => value.id == options.companyId),
      })
      console.log(this.data.index)
    })

    // 公司用车 type == 1   私车公用 type == 2  公司用车修改 type == 3   私车公用修改 type == 4 

    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);

    this.setData({
      ownerName: options.ownerName,
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      showCarInfo: options.type,
      id: options.id,
      brandName: options.brandName,
      plateCar: options.plateCar,
      carType: options.carType,
      starting: options.starting,
      end: options.end,
      startlocation: options.startlocation,
      endlocation: options.endlocation,
      reason: options.reason,
      viaPointList: options.viaPoint ? options.viaPoint == 'null' ? [] : JSON.parse(options.viaPoint) : []
    });
    console.log(this.data.viaPointList)
    this.setData({
      userStratTime: options.userStratTime ? options.userStratTime : this.data.dateTimeArray1[0][this.data.dateTime1[0]] + '-' + this.data.dateTimeArray1[1][this.data.dateTime1[1]] + '-' + this.data.dateTimeArray1[2][this.data.dateTime1[2]] + ' ' + this.data.dateTimeArray1[3][this.data.dateTime1[3]] + ':' + this.data.dateTimeArray1[4][this.data.dateTime1[4]],
      userEndTime: options.userEndTime ? options.userEndTime : this.data.dateTimeArray[0][this.data.dateTime[0]] + '-' + this.data.dateTimeArray[1][this.data.dateTime[1]] + '-' + this.data.dateTimeArray[2][this.data.dateTime[2]] + ' ' + this.data.dateTimeArray[3][this.data.dateTime[3]] + ':' + this.data.dateTimeArray[4][this.data.dateTime[4]],

    })
    console.log(options.attachment)
    let arr = []
    if (options.attachment !== 'null') {
      options.attachment = options.attachment ? options.attachment.split(",") : []
      options.attachment.forEach(item => {
        arr.push({
          url: item
        })
      })
    }

    this.setData({
      attachments: arr
    })
  },
  startAddress() {
    let that = this
    wx.chooseLocation({
      success: function(res) {
        that.setData({
          starting: res.address,
          startlocation: res.latitude + ',' + res.longitude
        })
        console.log(that.data.startlocation)
      }
    })
  },
  endAddress() {
    let that = this
    wx.chooseLocation({
      success: function(res) {
        that.setData({
          end: res.address,
          endlocation: res.latitude + ',' + res.longitude
        })
        console.log(that.data.endlocation)
      }
    })
  },
  addviaPoint(e) {
    console.log(e)
    let that = this
    let index = e.currentTarget.dataset.index
    wx.chooseLocation({
      success: function(res) {
        that.data.viaPointList[index].address = res.address
        that.data.viaPointList[index].location = res.latitude + ',' + res.longitude
        that.setData({
          viaPointList: that.data.viaPointList
        })
      }
    })
  },
  additemviaPoint() {
    console.log(this.data.viaPointList)
    this.data.viaPointList.push({
      address: '',
      location: ''
    })
    this.setData({
      viaPointList: this.data.viaPointList
    })
  },
  delitemviaPoint(e) {
    let index = e.currentTarget.dataset.index
    this.data.viaPointList.splice(index, 1)
    this.setData({
      viaPointList: this.data.viaPointList
    })
  },
  onChangeOutSide(event) {

    this.setData({
      passType: event.detail
    });
    if (this.data.passType == '1') {
      this.setData({
        showCompany: true
      });
    } else {
      this.setData({
        showCompany: false
      });
    }
  },
  delImg(e) {
    let index = this.data.attachments.findIndex(item => item.url == e.target.id)
    console.log(e.target.id, index)
    this.data.attachments.splice(index, 1)
    this.setData({
      attachments: this.data.attachments
    });
    // console.log(this.data.attachments)
  },
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // console.log(res)
        var data = res.tempFilePaths
        upLoadIMg(data).then(res => {
          // console.log(res,'222222')
          let arr = that.data.attachments;
          arr.push(res)
          that.setData({
            attachments: arr
          });
          console.log(that.data.attachments)
        }).catch(res => {

        })
      }
    })
  },
  changeDateTime1(e) {
    const that = this;
    that.setData({
      dateTime1: e.detail.value,
    });
    var aaa1 = that.data.dateTime1[0];
    var aaa2 = that.data.dateTime1[1];
    var aaa3 = that.data.dateTime1[2];
    var aaa4 = that.data.dateTime1[3];
    var aaa5 = that.data.dateTime1[4];
    var aaa6 = that.data.dateTime1[5];


    var time1 = that.data.dateTimeArray1[0][aaa1];
    var time2 = that.data.dateTimeArray1[1][aaa2];
    var time3 = that.data.dateTimeArray1[2][aaa3];
    var time4 = that.data.dateTimeArray1[3][aaa4];
    var time5 = that.data.dateTimeArray1[4][aaa5];
    var time6 = that.data.dateTimeArray1[5][aaa6];
    var time = time1 + '-' + time2 + '-' + time3 + ' ' + time4 + ':' + time5;
    console.log(time)
    that.setData({
      userStratTime: time,
    });

  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  changeDateTime(e) {
    const that = this;
    that.setData({
      dateTime: e.detail.value,
    });

    var aaa1 = that.data.dateTime[0];
    var aaa2 = that.data.dateTime[1];
    var aaa3 = that.data.dateTime[2];
    var aaa4 = that.data.dateTime[3];
    var aaa5 = that.data.dateTime[4];
    var aaa6 = that.data.dateTime[5];


    var time1 = that.data.dateTimeArray[0][aaa1];
    var time2 = that.data.dateTimeArray[1][aaa2];
    var time3 = that.data.dateTimeArray[2][aaa3];
    var time4 = that.data.dateTimeArray[3][aaa4];
    var time5 = that.data.dateTimeArray[4][aaa5];
    var time6 = that.data.dateTimeArray[5][aaa6];
    var time = time1 + '-' + time2 + '-' + time3 + ' ' + time4 + ':' + time5;
    console.log(e, time)
    that.setData({
      userEndTime: time,
    });
  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
  formSubmit(e) {
    let value = e.detail.value


    if (value.starting.length == 0) {
      wx.showToast({
        title: '请选择起点',
        icon: "none"
      })
    } else if (!value.ownerName && (this.data.showCarInfo == 2 || this.data.showCarInfo == 4)) {
      wx.showToast({
        title: '请输入车主姓名',
        icon: "none"
      })
    } else if (!value.companyId) {
      wx.showToast({
        title: '请选择申请人单位',
        icon: "none"
      })
    } else if (value.end.length == 0) {
      wx.showToast({
        title: '请选择终点',
        icon: "none"
      })
    } else if (value.reason.length == 0) {
      wx.showToast({
        title: '请输入事件原因',
        icon: "none"
      })
    } else {
      value.companyId = this.data.columns[this.data.index].id;
      value.list = this.data.viaPointList
      // return false
      if (this.data.attachments.length > 0) {
        value.attachments = this.data.attachments.map(item => {
          return item.url
        })
      }
      value.stratLatitude = this.data.startlocation
      value.endLongitude = this.data.endlocation

      if (this.data.showCarInfo == 1) {
        value.carId = this.data.id
        value.type = this.data.showCarInfo
      }
      if (this.data.showCarInfo == 2) {
        value.type = this.data.showCarInfo
      }
      if (this.data.showCarInfo == 3 || this.data.showCarInfo == 4) {
        value.id = this.data.id
      }

      if (this.data.showCarInfo == 1 || this.data.showCarInfo == 2) {
        saveaCompanyMileage(value).then(res => {
          if (res.code == 0) {
            sysapprove({
              type: '3',
              deptId: '',
              tableName: 'a_company_mileage',
              natrualKey: res.data
            }).then(res1 => {

            })
            wx.showToast({
              title: '申请成功',
              success: res => {
                wx.navigateBack({
                  delta: 1,
                })
              }
            })
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 3000
            })
          }
        }).catch(res => {
          wx.showToast({
            title: res,
            icon: "none",
            duration: 3000
          })
        })
      } else if (this.data.showCarInfo == 3 || this.data.showCarInfo == 4) {
        value.mileageStatus = 2
        updateCompanyMileage(value).then(res => {
          if (res.code == 0) {
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
      }

    }

  },
  addperson() {
    this.setData({
      show: false
    })
  },
  cencelAdd() {
    this.setData({
      show: true
    })
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  sfnumInput(e) {
    this.setData({
      idCode: e.detail.value
    })
  },
  okAdd() {
    if (this.data.name.length == 0) {
      wx.showToast({
        title: '请输入姓名',
        icon: "none"
      })
    } else {
      let peer = {}
      peer.companionName = this.data.name;
      if (this.data.idCode.length != 0) {
        peer.companionIdentity = this.data.idCode;
      }

      let peerList = this.data.peerList
      peerList.push(peer)
      this.setData({
        peerList: peerList,
        show: true,
        name: "",
        idCode: ""
      })
      console.log(this.data.peerList)
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
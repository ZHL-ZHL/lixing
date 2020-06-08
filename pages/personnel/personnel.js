// pages/visitors/visitors.js
var dateTimePicker = require('../../utils/datapicker.js'); 
import {
  companyList
} from "../../api/company.js"
import {
  passTrafficSave
} from "../../api/outbreak.js"
import {
  upLoadIMg
} from "../../utils/upload.js"

import Url from "../../utils/host.js"

Page({

  /**
   * 页面的初始数据
   */
  // 、、、、法雨、哥弟、柒牌、路灵通、中鲁物流、华为、美菜、全智供应链、中通、晋商银行、食堂、小卖铺
  data: {
    onLine: Url.imghost,
    passType:'1',
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
    showCompany:true,
    peerList: [],
    pictureList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    // var lastArray = obj1.dateTimeArray.pop();
    // var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });

    companyList().then(res => {
      console.log(res.page)
      this.setData({
        columns: res.page
      })
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
  delImg(e){
    let index = this.data.pictureList.findIndex(item => item.url == e.target.id) 
    console.log(e.target.id,index)   
    this.data.pictureList.splice(index, 1)
    this.setData({
      pictureList: this.data.pictureList
    });
    // console.log(this.data.pictureList)
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
  changeDateTime(e) {
    const that = this;
    console.log("打印时间~~~~~~~~~~~~~~~~~~~~~", this.data.dateTimeArray);

    this.setData({
      dateTime: e.detail.value
    });

    console.log("打印时间", this.data.dateTime);

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
    var time = time1 + '-' + time2 + '-' + time3 + ' ' + time4 + ':' + time5 + ':' + time6;

  },
  changeDateTime1(e) {
    const that = this;
    console.log("打印时间~~~~~~~~~~~~~~~~~~~~~", this.data.dateTimeArray1);

    this.setData({
      dateTime1: e.detail.value
    });

    console.log("打印时间", this.data.dateTime1);

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
    var time = time1 + '-' + time2 + '-' + time3 + ' ' + time4 + ':' + time5 + ':' + time6;

  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  changeDateTime(e) {
    const that = this;
    console.log("打印时间~~~~~~~~~~~~~~~~~~~~~", this.data.dateTimeArray);

    this.setData({
      dateTime: e.detail.value
    });

    console.log("打印时间", this.data.dateTime);

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
    var time = time1 + '-' + time2 + '-' + time3 + ' ' + time4 + ':' + time5 + ':' + time6;

  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
  formSubmit(e) { 
    let value = e.detail.value
    console.log(value)
    delete value['0'];
    delete value['1'];
    value.passType = this.data.passType; 
    if (value.passName.length == 0) {
      wx.showToast({
        title: '请填写名字',
        icon: "none"
      })
    } else if (value.passPhone.length == 0 || value.passPhone.length != 11) { 
      wx.showToast({
        title: '被访人手机号不正确',
        icon: "none"
      })
    } else if (!value.passCompanyId) {
      wx.showToast({
        title: '请填写单位',
        icon: "none"
      })
    } else if (value.passCard.length == 0) {
      wx.showToast({
        title: '请填写身份证号',
        icon: "none"
      })
    } else if (!value.passAddress) {
      wx.showToast({
        title: '请填写户籍地址',
        icon: "none"
      })
      
    } else if (!value.passPurpose) {
      wx.showToast({
        title: '请填写来访目的',
        icon: "none"
      }) 
    } else {
      // if(this.data.passType =='1'){
        value.passCompanyId = this.data.columns[this.data.index].id;
      // }
      //  0:车 1:人
      value.passState = 1;
      if (this.data.pictureList.length > 0) {
        value.passImageUrl = this.data.pictureList.map(item => {
          return item.url
        })
        value.passImageUrl = value.passImageUrl.join(',')
      }
      passTrafficSave(value).then(res => {
        if (res.code == 0) {
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
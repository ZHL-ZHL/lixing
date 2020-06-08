// pages/visitors/visitors.js
var dateTimePicker = require('../../utils/datapicker.js');
import { addVisitors } from "../../api/visitors.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    peerList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },
  changeDateTime(e) {
    const that = this;
    console.log("打印时间~~~~~~~~~~~~~~~~~~~~~", this.data.dateTimeArray);

    this.setData({ dateTime: e.detail.value });

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
  formReset: function () {
    console.log('form发生了reset事件')
  },
  formSubmit(e) {

    let value = e.detail.value
    console.log(value)
    value.list = this.data.peerList;
    if (value.visitorName.length == 0) {
      wx.showToast({
        title: '请填写被访人员名字',
        icon: "none"
      })
    } else if (value.intervieweePhone.length == 0 || value.intervieweePhone.length != 11) {
      wx.showToast({
        title: '被访人手机号不正确',
        icon: "none"
      })
    } else if (value.address.length == 0) {
      wx.showToast({
        title: '请填写访问地点',
        icon: "none"
      })
    } else if (value.visitorName.length == 0) {
      wx.showToast({
        title: '请填写被访人姓名',
        icon: "none"
      })
    } else if (value.visitorPhone.length == 0 || value.visitorPhone.length != 11) {
      wx.showToast({
        title: '请填写被访人电话',
        icon: "none"
      })
    } else {
      addVisitors(value).then(res => {
        if (res.code == 0) {
          wx.showToast({
            title: '预约成功',
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
      if (this.data.idCode.length!=0){
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
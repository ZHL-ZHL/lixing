// pages/carNumber/carNumber.js
import {
  getaCompanyInfo
} from "../../api/baiducard.js"
import {
  getCarInfo,
  payMoneys
} from "../../api/carMang.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: ['京', '津', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘', '皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘', '晋', '蒙', '陕', '吉', '闽', '贵', '粤', '青', '藏', '川', '宁', '琼', '港', '澳','台'],
    addressTitle:"晋",
    show: false,
    carNumber: '',
    show: false,
    id: null,
    showCarInfo: false,
    plateNo: "",
    entryTime: "",
    outTime: "",
    imgName: "",
    elapsedTime:0,
    payable: 0,
    payedFee: 0,
  },
  onChange(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail.value);
    this.setData({
      carNumber: event.detail.value
    })
  },
  onClose() {
    this.setData({
      close: false
    });
  },
  onShowcar() {
    this.setData({
      show: true
    });
  },
  changeAddress(e){
    // console.log(e.currentTarget.id)
    this.setData({
      addressTitle: e.currentTarget.id,
      show: false
    })
  },
  showPopup() {
    // console.log(1)
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  payMoney() {
    payMoneys({
      id: this.data.id
    }).then(res => {
      let pay_info = JSON.parse(JSON.parse(res.data).pay_info)
      console.log(pay_info)
      wx.requestPayment({
        // 'appId': data,
        'timeStamp': pay_info.timeStamp,
        'nonceStr': pay_info.nonceStr,
        'package': pay_info.package,
        'signType': pay_info.signType,
        'paySign': pay_info.paySign,
        'success': function(res) {
          console.log(res)
          wx.showToast({
            title: "支付成功",
            icon: 'success',
            duration: 2000,
            success: function() {
              wx.navigateTo({
                url: '/pages/paySuccess/paySuccess?type=1',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            }
          })
        },
        fail: function(res1) {}
      })
    })

  },
  subm() {
    if (this.validateCar(this.data.carNumber)) {
      wx.setStorage({
        key: 'carNumber',
        data: this.data.carNumber.toUpperCase()
      }) 
      getCarInfo({
        parkCode:1,
        plateNo: this.data.addressTitle+this.data.carNumber.toUpperCase()
      }).then(res => {
        if (res.code == 200 && res.data.data) {
          this.setData({
            showCarInfo: true,
            // id: res.data[0].id,
            plateNo: res.data.data.plateNo,
            entryTime: res.data.data.entryTime,
            outTime: res.data.data.outTime, 
            payable: res.data.data.payable,
            payedFee: res.data.data.payedFee,
            elapsedTime: res.data.data.elapsedTime
          })
        } else {
          let that = this;
          wx.showToast({
            title: '未查询到该车辆',
            icon: 'none',
            image: '',
            mask: true,
            duration: 1500,
            success: function(res) { 
              that.setData({
                showCarInfo: false,
                id: "",
                plateNo: "",
                entryTime: "",
                outTime: "",
                imgName: "",
                payable: "",
                payedFee: "",
                elapsedTime:0,
              })
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // getaCompanyInfo().then(res => {})
    if (wx.getStorageSync("carNumber")) {
      this.setData({
        carNumber: wx.getStorageSync("carNumber")
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
  validateCar: function(carbrand) { 
    let carbrandALL = this.data.addressTitle+carbrand
    // console.log(typeof (carbrandALL), carbrandALL)
    //车牌号判断的正则表达式
    var regExp = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
    if (!regExp.test(carbrandALL.toUpperCase())) {
      wx.showToast({
        title: '请输入正确的车牌号！',
        duration: 1500
      })
      return false;
    } else {
      console.log("车牌号正确")
    }
    return true;
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
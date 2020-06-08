// pages/shopDetail/shopDetail.js
import { getDetail } from "../../api/contract";
import { updateCheck } from "../../api/contract";
import Time from "../../utils/util.js"
import URL from "../../utils/host.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reviewers: [],
    checkLevel: "",
    contractId: "",
    info: "",
    checkId: "",
    auditStatus: "",
    loginNo: "",
    source: "",
    type: "",
    contractType: "",
    token: "",
    ylink: URL.imgURL,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type == 0) {
      wx.setNavigationBarTitle({
        title: '招商申请',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '已审核',
      })
    }
    console.log(JSON.parse(options.info))
    this.setData({
      contractId: JSON.parse(options.info).contractId,
      info: JSON.parse(options.info),
      loginNo: wx.getStorageSync("openId"),
      type: options.type,
      contractType: options.contractType,
      token: wx.getStorageSync("token")
    })
    this.getCheck()

  },

  getCheck() {
    let contractId
    if (this.data.contractType == 2) {
      contractId = this.data.info.surrenderId
    } else if (this.data.contractType == 1) {
      contractId = this.data.info.feeId
    } else {
      contractId = this.data.contractId
    }
    getDetail({ contractId: contractId, contractType: this.data.contractType }).then(res => {
      if (res.code == 0) {
        let source = res.data.detailList.find((item) => {
          return item.checkMan.loginNo == this.data.loginNo;
        })
        var list = res.data.detailList.map(v => {
          if (v.checkTime) {
            v.checkTime = Time.formatDuring(v.checkTime, 'Y-M-D h:m:s')
          }
          if (v.signature) {
            if (v.signature == "") {
              v.signature = 'null'
            }
            console.log(1)
          } else {
            console.log(2)
          }
          console.log(v)
          // v.twozi = v.checkMan.name.substring(0, 2)
          console.log(v)
          return v
        })
        console.log(list)
        this.setData({
          reviewers: list,
          checkLevel: res.data.checkLevel,
          contractId: res.data.contractId,
          checkId: res.data.checkId,
          auditStatus: res.data.auditStatus,
          source: source
        })
      } else {
        wx.showToast({
          title: res.desc,
          icon: 'none',
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res,
        icon: 'none',
      })
    })
  },

  decision(e) {
    let type = e.currentTarget.dataset.type
    let checkLevel = this.data.checkLevel;
    let contractId = this.data.contractId;
    let leng = this.data.reviewers.length
    console.log(this.data.info)
    wx.navigateTo({
      url: '/pages/opinion/opinion?type=' + type + '&checkLevel=' + checkLevel + '&contractId=' + contractId + '&checkMan=' + this.data.reviewers[this.data.reviewers.length - checkLevel].checkMan.id + '&id=' + this.data.reviewers[this.data.reviewers.length - checkLevel].id + '&contractType=' + this.data.info.contractType + '&checkId=' + this.data.checkId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
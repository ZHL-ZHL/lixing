// pages/eatDetail/eatDetail.js
var WxParse = require('../../wxParse/wxParse.js');
import {
  rtfoodDetail
} from "../../api/eat.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showGG: false,
    info: {},
    eatList: [],
    showTime: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    let info = JSON.parse(options.info)
    this.setData({
      type: options.type,
      shopInfoMsg: JSON.parse(options.shopInfoMsg),
      showBtnGoCar: options.showBtnGoCar
    })
    rtfoodDetail({
      id: info.id
    }).then(res => {
      info.detail = res.data.detail
      this.setData({
        info: info
      })
      WxParse.wxParse('content', 'html', info.detail, that, 0);
    })
  },
  showggBtn(e) {
    console.log(e)
    this.setData({
      listfoodName: e.currentTarget.dataset.item.name,
      specificationList: e.currentTarget.dataset.item.specificationDetail,
      menuItem: e.currentTarget.dataset.item
    })
    this.setData({
      showGG: true,
      showTime: e.currentTarget.dataset.item.dateTime ? e.currentTarget.dataset.item.dateTime : ""
    })
  },
  changeTime(e) {
    let index = e.currentTarget.dataset.time
    let menuItem = e.currentTarget.dataset.item
    menuItem.dateTime = index
    this.setData({
      info: menuItem,
      showTime: index,
    })
  },
  goodsDel(e) {
    if (this.data.info.num && this.data.info.num > 0) {
      this.data.info.num--
    } else {
      this.data.info.num = 0;
    }
    this.setData({
      info: this.data.info
    })
  },
  goodsAdd(e) {
    if (this.data.info.num) {
      this.data.info.num++
    } else {
      this.data.info.num = 1;
    }

    if (this.data.type == 1) {
      let dateTime = e.currentTarget.dataset.item.dateTime
      this.data.info.dateTime = dateTime
    }
    this.setData({
      info: this.data.info
    })
  },
  closeshowGG() {
    this.setData({
      showGG: false
    })
  },
  changeColor(e) {
    let pidx = e.currentTarget.dataset.pidx
    let idx = e.currentTarget.dataset.idx
    let specificationList = this.data.specificationList
    let list = specificationList[pidx].specificationListnew
    let selNum = list.filter(function (v) {
      if (v.show) {
        return true;
      } else {
        return false;
      }
    })
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item.name == e.currentTarget.dataset.item.name) {
        if (!item.show && (selNum.length == specificationList[pidx].num)) {
          wx.showToast({
            title: '选' + specificationList[pidx].num + '个' + specificationList[pidx].categoryName + '菜',
            icon: "none"
          })
        } else {
          item.show = !e.currentTarget.dataset.item.show
          break
        }

      }
    }
    specificationList[pidx].specificationListnew = list
    this.setData({
      specificationList
    })
  },
  tocarradd() {
    let tcArray = []
    let tc = []
    this.data.specificationList.forEach(item => {
      item.specificationListnew.forEach(item1 => {
        if (item1.show) {
          tc.push(item1.name)
        }
      });
    });
    if (tc.length > 0) {
      tcArray.push({
        specificationList: tc.join(",")
      })
      if (!this.data.info.num) {
        this.data.info.num = 1
        this.data.info.specificationList = tcArray
      } else {
        this.data.info.num += 1
        this.data.info.specificationList = this.data.info.specificationList.concat(tcArray)
      }
    }

    this.setData({
      info: this.data.info,
      showGG: false
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
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log(this.data.info)
    this.data.info.num = this.data.info.num ? this.data.info.num : 0
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      detailObj: this.data.info,
    })
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
// pages/carRecord/carRecord.js
import Url from "../../utils/host.js"
import {
  selectCarList,
  updateCompanyMileage
} from "../../api/baiducard.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    online: Url.imghost,
    pageNum: 1,
    pageSize: 10,
    type: 1, //1公司用车   2私车
    currentIndex: 0,
    //公司用车
    companyCar: [],
    //私车公用
    private: [],
    radio: '0',
    passId: null,
    remark: ""
  },
  onClose() {
    this.setData({
      close: false
    });
  },
  //swiper切换时会调用
  pagechange: function(e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 2
      this.setData({
        currentIndex: currentPageIndex
      })
    }
    this.setData({
      type: e.detail.current == 0 ? 1 : 2
    })
    this.getselectUserListApply()
  },
  //用户点击tab时调用
  titleClick: function(e) {
    // console.log(e.currentTarget.dataset.idx) 
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: e.currentTarget.dataset.idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(111111)
    // this.getselectUserListApply()
  },
  getselectUserListApply() {
    selectCarList({
      type: this.data.type,
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      mileageDrivingStatus: 1
    }).then(res => {
      res.data.forEach(item => {
        item.userEndTime1 = item.userEndTime.split(" ")[1]
        // item.viaPoint = JSON.parse(item.viaPoint) ? JSON.parse(item.viaPoint):[]
      })
      console.log(res.data)
      if (this.data.type == 1) {
        this.setData({
          companyCar: res.data
        })
      } else {
        this.setData({
          private: res.data
        })
      }

    })
  },
  passCar(e) {
    this.setData({
      show: true,
      passId: e.currentTarget.id,
      remark: "",
      radio:"0",
    });
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  changeRemark(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  getpass() {
    if (!this.data.radio) {
      wx.showToast({
        title: '请选择状态',
        icon: "none"
      })
    } else {
      updateCompanyMileage({
        mileageStatus: this.data.radio,
        remark: this.data.remark,
        id: this.data.passId
      }).then(res => {
        this.getselectUserListApply()
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
    this.getselectUserListApply()
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
    this.setData({
      pageNum: this.data.pageNum++
    })
    this.getselectUserListApply()
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
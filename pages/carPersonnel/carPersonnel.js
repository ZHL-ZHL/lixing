// pages/carRecord/carRecord.js
import Url from "../../utils/host.js"
import {
  selectUserListApply
} from "../../api/baiducard.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    online: Url.imghost,
    pageNum: 1,
    pageSize: 10,
    type: 1, //1公司用车   2私车
    currentIndex: 0,
    //公司用车
    companyCar: [],
    //私车公用
    private: [],
  },
  // 公司用车
  goCarComDetail(e) {
    // mileageStatus  0审核通过 1审核失败 2待审核 
    // drivingStatus  0未使用 1使用中 2已完成 
    if ((e.currentTarget.dataset.dstatus.mileageStatus == 2 && e.currentTarget.dataset.dstatus.mileageDrivingStatus == 0) || (e.currentTarget.dataset.dstatus.mileageStatus == 1 && e.currentTarget.dataset.dstatus.mileageDrivingStatus == 0)) {
      wx.navigateTo({
        url: '/pages/carApply/carApply?type=' + 3 + '&id=' + e.currentTarget.dataset.dstatus.id + '&brandName=' + e.currentTarget.dataset.dstatus.brandName + '&plateCar=' + e.currentTarget.dataset.dstatus.plateCar + '&carType=' + e.currentTarget.dataset.dstatus.dictName + '&end=' + e.currentTarget.dataset.dstatus.end + '&endLongitude=' + e.currentTarget.dataset.dstatus.endLongitude + '&starting=' + e.currentTarget.dataset.dstatus.starting + '&stratLatitude=' + e.currentTarget.dataset.dstatus.stratLatitude + '&reason=' + e.currentTarget.dataset.dstatus.reason + '&attachment=' + e.currentTarget.dataset.dstatus.attachment + '&userStratTime=' + e.currentTarget.dataset.dstatus.userStratTime + '&userEndTime=' + e.currentTarget.dataset.dstatus.userEndTime + '&alsoAttachment=' + e.currentTarget.dataset.dstatus.alsoAttachment + '&viaPoint=' + e.currentTarget.dataset.dstatus.viaPoint + '&companyId=' + e.currentTarget.dataset.dstatus.companyId,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.navigateTo({
        url: '/pages/comCarRecord/comCarRecord?type=' + 1 + '&id=' + e.currentTarget.dataset.dstatus.id + '&carId=' + e.currentTarget.dataset.dstatus.carId + '&brandName=' + e.currentTarget.dataset.dstatus.brandName + '&plateCar=' + e.currentTarget.dataset.dstatus.plateCar + '&carType=' + e.currentTarget.dataset.dstatus.dictName + '&end=' + e.currentTarget.dataset.dstatus.end + '&endLongitude=' + e.currentTarget.dataset.dstatus.endLongitude + '&starting=' + e.currentTarget.dataset.dstatus.starting + '&stratLatitude=' + e.currentTarget.dataset.dstatus.stratLatitude + '&reason=' + e.currentTarget.dataset.dstatus.reason + '&attachment=' + e.currentTarget.dataset.dstatus.attachment + '&mileageStatus=' + e.currentTarget.dataset.dstatus.mileageStatus + '&mileageDrivingStatus=' + e.currentTarget.dataset.dstatus.mileageDrivingStatus + '&userStratTime=' + e.currentTarget.dataset.dstatus.userStratTime + '&userEndTime=' + e.currentTarget.dataset.dstatus.userEndTime + '&viaPoint=' + e.currentTarget.dataset.dstatus.viaPoint + '&mileageNumber=' + e.currentTarget.dataset.dstatus.mileageNumber 
      })
    }
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
  pending(e) {
    if ((e.currentTarget.dataset.dstatus.mileageStatus == 2 && e.currentTarget.dataset.dstatus.mileageDrivingStatus == 0) || (e.currentTarget.dataset.dstatus.mileageStatus == 1 && e.currentTarget.dataset.dstatus.mileageDrivingStatus == 0)) {
      wx.navigateTo({
        url: '/pages/carApply/carApply?type=' + 4 + '&id=' + e.currentTarget.dataset.dstatus.id + '&end=' + e.currentTarget.dataset.dstatus.end + '&endLongitude=' + e.currentTarget.dataset.dstatus.endLongitude + '&starting=' + e.currentTarget.dataset.dstatus.starting + '&stratLatitude=' + e.currentTarget.dataset.dstatus.stratLatitude + '&reason=' + e.currentTarget.dataset.dstatus.reason + '&attachment=' + e.currentTarget.dataset.dstatus.attachment + '&userStratTime=' + e.currentTarget.dataset.dstatus.userStratTime + '&userEndTime=' + e.currentTarget.dataset.dstatus.userEndTime + '&viaPoint=' + e.currentTarget.dataset.dstatus.viaPoint + '&companyId=' + e.currentTarget.dataset.dstatus.companyId + '&ownerName=' + e.currentTarget.dataset.dstatus.ownerName,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else if (e.currentTarget.dataset.dstatus.mileageStatus == 0 && e.currentTarget.dataset.dstatus.mileageDrivingStatus == 0) {
      wx.navigateTo({
        url: '/pages/reviewPending/reviewPending?id=' + e.currentTarget.dataset.dstatus.id + '&end=' + e.currentTarget.dataset.dstatus.end + '&endLongitude=' + e.currentTarget.dataset.dstatus.endLongitude + '&starting=' + e.currentTarget.dataset.dstatus.starting + '&stratLatitude=' + e.currentTarget.dataset.dstatus.stratLatitude + '&reason=' + e.currentTarget.dataset.dstatus.reason + '&attachment=' + e.currentTarget.dataset.dstatus.attachment + '&userStratTime=' + e.currentTarget.dataset.dstatus.userStratTime + '&userEndTime=' + e.currentTarget.dataset.dstatus.userEndTime + '&mileageStatus=' + e.currentTarget.dataset.dstatus.mileageStatus + '&mileageDrivingStatus=' + e.currentTarget.dataset.dstatus.mileageDrivingStatus + '&viaPoint=' + e.currentTarget.dataset.dstatus.viaPoint
      })
    } else if (e.currentTarget.dataset.dstatus.mileageStatus == 0 && (e.currentTarget.dataset.dstatus.mileageDrivingStatus == 1 || e.currentTarget.dataset.dstatus.mileageDrivingStatus == 2 ) ){
      wx.navigateTo({
        url: '/pages/beenCompleted/beenCompleted?id=' + e.currentTarget.dataset.dstatus.id + '&end=' + e.currentTarget.dataset.dstatus.end + '&endLongitude=' + e.currentTarget.dataset.dstatus.endLongitude + '&starting=' + e.currentTarget.dataset.dstatus.starting + '&stratLatitude=' + e.currentTarget.dataset.dstatus.stratLatitude + '&reason=' + e.currentTarget.dataset.dstatus.reason + '&attachment=' + e.currentTarget.dataset.dstatus.attachment + '&userStratTime=' + e.currentTarget.dataset.dstatus.userStratTime + '&userEndTime=' + e.currentTarget.dataset.dstatus.userEndTime + '&mileageStatus=' + e.currentTarget.dataset.dstatus.mileageStatus + '&mileageDrivingStatus=' + e.currentTarget.dataset.dstatus.mileageDrivingStatus + '&mileageStartPic=' + e.currentTarget.dataset.dstatus.mileageStartPic + '&mileageEndPic=' + e.currentTarget.dataset.dstatus.mileageEndPic + '&costMoneys=' + e.currentTarget.dataset.dstatus.costMoney + '&otherMoney=' + e.currentTarget.dataset.dstatus.otherMoney + '&mileageReamrk=' + e.currentTarget.dataset.dstatus.mileageReamrk + '&subsidieMoney=' + e.currentTarget.dataset.dstatus.subsidieMoney + '&viaPoint=' + e.currentTarget.dataset.dstatus.viaPoint + '&mileageNumber=' + e.currentTarget.dataset.dstatus.mileageNumber,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(111111)
    // this.getselectUserListApply()
  },
  getselectUserListApply() {
    selectUserListApply({
      type: this.data.type,
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
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
      pageNum:this.data.pageNum++
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
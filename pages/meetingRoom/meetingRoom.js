// pages/meetingRoom/meetingRoom.js
import {
  meetingList,
  hotLease,
  selectByKeWord
} from "../../api/meeting.js"; 
import {
  leaseBanner
} from "../../api/banner.js"; 
import util from "../../utils/util";
import Url from "../../utils/host.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: '12:00',
    currentDate2: '12:00',
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 5 === 0);
      }

      return options;
    },
    priceList: [
      [0, 2000],
      [2000, 4000],
      [4000, 6000],
      [6000, 8000],
      [8000, 10000],
      [10000, '以上']
    ],
    areaList: [
      [0, 100],
      [100, 500],
      [500, 1000],
      [1000, '以上']
    ],
    perpleList: [
      [0, 500],
      [500, 1000],
      [1000, 1500],
      [1500, '以上']
    ],
    dayNumber: 1,
    date: '',
    showdate: false,
    showTime: false,
    showTime2: false,
    searchvalue: "",
    showMain: true,
    showAccurateSearch: false,
    hot: [],
    meetingRoom: [],
    indicatorDots: true, //小点
    indicatorColor: "white",
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 500, //滑动时间
    indicatorActiveColor: "#4D7AD2",
    onLine: Url.imghost,
    pageNum: 1,
    load: false,
    banner: [],
    low: 0,
    heigh: 0,
    lowHeigh: "",
    low1: 0,
    heigh1: 0,
    lowHeigh1: "",
    low2: 0,
    heigh2: 0,
    lowHeigh2: "",
    keywordList: [],
    keyword: "",
    allSearchCount: ""
  },
  changePrice(e) { 
    this.setData({
      low:e.currentTarget.dataset.item[0],
      heigh:e.currentTarget.dataset.item[1],
      lowHeigh:e.currentTarget.dataset.item[0]+'-'+e.currentTarget.dataset.item[1]
    }) 
    this.selectComponent("#zy-slider")._propertyLeftValueChange()
    this.selectComponent("#zy-slider")._propertyRightValueChange()
  },
  changeArea(e) {
    console.log(e.currentTarget.dataset.item)
    this.setData({
      low1:e.currentTarget.dataset.item[0],
      heigh1:e.currentTarget.dataset.item[1],
      lowHeigh1:e.currentTarget.dataset.item[0]+'-'+e.currentTarget.dataset.item[1]
    })
    this.selectComponent("#zy-slider1")._propertyLeftValueChange()
    this.selectComponent("#zy-slider1")._propertyRightValueChange()
  },
  changePeople(e) {
    console.log(e.currentTarget.dataset.item)
    this.setData({
      low2:e.currentTarget.dataset.item[0],
      heigh2:e.currentTarget.dataset.item[1],
      lowHeigh2:e.currentTarget.dataset.item[0]+'-'+e.currentTarget.dataset.item[1]
    })
    this.selectComponent("#zy-slider2")._propertyLeftValueChange()
    this.selectComponent("#zy-slider2")._propertyRightValueChange()
  },
  clearallSearchCount() {
    this.setData({
      allSearchCount: ""
    })
  },
  clearKeyword() {
    this.setData({
      keyword: ""
    })
  },
  clearEndTime() {
    this.setData({
      endTime: ""
    })
  },
  clearStartTime() {
    this.setData({
      startTime: ""
    })
  },

  lowValueChangeAction: function (e) {
    this.setData({
      low: e.detail.lowValue
    })
    this.setData({
      lowHeigh: this.data.low + '-' + this.data.heigh
    })
  }, 
  heighValueChangeAction: function (e) {
    this.setData({
      heigh: e.detail.heighValue
    })
    this.setData({
      lowHeigh: this.data.low + '-' + this.data.heigh
    })
  },

  lowValueChangeAction1: function (e) {
    this.setData({
      low1: e.detail.lowValue
    })
    this.setData({
      lowHeigh1: this.data.low1 + '-' + this.data.heigh1
    })
  },

  heighValueChangeAction1: function (e) {
    this.setData({
      heigh1: e.detail.heighValue
    })
    this.setData({
      lowHeigh1: this.data.low1 + '-' + this.data.heigh1
    })
  },
  lowValueChangeAction2: function (e) {
    this.setData({
      low2: e.detail.lowValue
    })
    this.setData({
      lowHeigh2: this.data.low2 + '-' + this.data.heigh2
    })
  },

  heighValueChangeAction2: function (e) {
    this.setData({
      heigh2: e.detail.heighValue
    })
    this.setData({
      lowHeigh2: this.data.low2 + '-' + this.data.heigh2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.setData({
      startDate: new Date().format("yyyy年MM月dd日 EEE").substr(5),
      endDate: new Date(util.getDateStr(new Date(),1)).format("yyyy年MM月dd日 EEE").substr(5),
      startDate1: new Date().format("yyyy年MM月dd日"),
      endDate1: new Date(util.getDateStr(new Date(),1)).format("yyyy年MM月dd日"),
    })
    this.getList()
    this.getBanner()
    this.getleaseAdv()
  },
  closeAccurateSearch() {
    this.setData({
      showAccurateSearch: false
    })
  },
  stopAccurateSearch(e) {
    // e.stopPropagation()
  },
  subAccurateSearch() {
    this.setData({
      showAccurateSearch: false,
      allSearchCount: this.data.low + '-' + this.data.heigh + '/' + this.data.low1 + '-' + this.data.heigh1 + '/' + this.data.low2 + '-' + this.data.heigh2
    })
  },
  showAccurateSearchBtn() {
    this.setData({
      showAccurateSearch: true,
      lowHeigh: this.data.low + '-' + this.data.heigh,
      lowHeigh1: this.data.low1 + '-' + this.data.heigh1,
      lowHeigh2: this.data.low2 + '-' + this.data.heigh2,
    })
  },
  showdateBtn() {
    this.setData({
      showdate: true
    });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  onInput2(event) {
    this.setData({
      currentDate2: event.detail,
    });
  },
  getTime1(event) {
    console.log(this.data.currentDate)
    this.setData({
      showTime: false,
      startTime: this.data.currentDate
    });
  },
  getTime2(event) {
    console.log(this.data.currentDate2)
    this.setData({
      showTime2: false,
      endTime: this.data.currentDate2
    });
  },
  showTimeBtn() {
    this.setData({
      showTime: true
    });
  },
  showTimeBtn2() {
    this.setData({
      showTime2: true
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      showdate: false,
      date: `${this.formatDate(start)} - ${this.formatDate(end)}`,
      startDate: new Date(start).format("yyyy年MM月dd日 EEE").substr(5),
      endDate: new Date(end).format("yyyy年MM月dd日 EEE").substr(5),
      startDate1: new Date(start).format("yyyy年MM月dd日"),
      endDate1: new Date(end).format("yyyy年MM月dd日"),
      dayNumber: util.getDaysBetween(start, end)
    });
  },
  ondateClose() {
    this.setData({
      showdate: false
    });
  },
  ondateClose1() {
    this.setData({
      showTime: false
    });
  },
  ondateClose2() {
    this.setData({
      showTime2: false
    });
  },
  onClickShow() {
    hotLease().then(res => {
      if (res.code == 200) {
        this.setData({
          keywordList: res.data
        })
      }
    })
    this.setData({
      showMain: false,
      searchvalue: ""
    });
  },
  keywordBtn(e) {
    this.setData({
      keyword: e.currentTarget.id,
      showMain: true
    });
  },
  onChange(e) {
    this.setData({
      searchvalue: e.detail,
    });
  },
  onSearch() {
    selectByKeWord(this.data.searchvalue).then(res => {
      this.setData({
        showMain: true,
        keyword: this.data.searchvalue
      });
    })
  },
  onCancel() {
    this.setData({
      showMain: true,
    });
  },
  onClose() {
    this.setData({
      showAccurateSearch: false
    })
  },
  getleaseAdv() {
    meetingList({
      referrals: 0,
      current: 1,
      size: 5
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          hot: res.data.records
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res,
        icon: "none"
      })
    })
  },
  getBanner() {
    leaseBanner({
      bannerType: 2,
      current: 1,
      size: 5,
      isDeleted: 0,
      notBanner: 0
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          banner: res.data.records
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res,
        icon: "none"
      })
    })
  },
  toAdvDeatil(e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/advDetail/advDetail?info=' + item,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  goDetail() {
    wx.navigateTo({
      url: '/pages/meetDetailList/meetDetailList?startDate=' + this.data.startDate1 + '&endDate=' + this.data.endDate1 + '&keyword=' + this.data.keyword + '&allSearchCount=' + this.data.allSearchCount + '&startTime=' + this.data.startTime + '&endTime=' + this.data.endTime,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  getList() {
    meetingList({
      referrals: 1,
      current: 1,
      size: 5
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          meetingRoom: res.data.records
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res,
        icon: "none"
      })
    })

    // meetingList({
    //   page: this.data.pageNum
    // }).then(res => {
    //   if (res.code == 200) {
    //     let list;
    //     this.data.pageNum == 1 ? list = res.page.list : list = this.data.meetingRoom.concat(res.page.list)
    //     let loadMore;
    //     this.data.pageNum < res.page.totalPage ? loadMore = true : loadMore = false;
    //     this.setData({
    //       load: loadMore,
    //       meetingRoom: list
    //     })
    //     console.log(this.data.meetingRoom)
    //   } 
    // }).catch(res => {
    //   wx.showToast({
    //     title: res,
    //   })
    // })
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
    this.setData({
      pageNum: 1
    })
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.load) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
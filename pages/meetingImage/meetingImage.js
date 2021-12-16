// pages/meetingImage/meetingImage.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    showImage: false,
    nav: ['全部'],
    // nav: ['全部', '会议室', '茶歇', '园区', '周边'],
    currentindex: 0,
    current: 1,
    size: 1000,
    load: false,
  },
  showBigImage(e) { 
    wx.previewImage({
      urls: [e.currentTarget.id],
      current: [e.currentTarget.id]
    })
    // this.setData({
    //   showImage: true,
    //   imageItem: e.currentTarget.id
    // })
  },
  onClickHide() {
    this.setData({
      showImage: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imageList: options.imageList.split(',')
    })
  },
  selNav: function (e) {
    let index = e.target.dataset.idx;
    this.setData({
      currentindex: index,
      current: 1,
    })
    this.getList()
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
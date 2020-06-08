// pages/evaluation/evaluation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [
      {
        flag: 1,
        bgImg: "../../images/icon/start2.png",
        bgfImg: "../../images/icon/start1.png"
      },
      {
        flag: 1,
        bgImg: "../../images/icon/start2.png",
        bgfImg: "../../images/icon/start1.png"
      },
      {
        flag: 1,
        bgImg: "../../images/icon/start2.png",
        bgfImg: "../../images/icon/start1.png"
      },
      {
        flag: 1,
        bgImg: "../../images/icon/start2.png",
        bgfImg: "../../images/icon/start1.png"
      },
      {
        flag: 1,
        bgImg: "../../images/icon/start2.png",
        bgfImg: "../../images/icon/start1.png"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  score: function (e) {
    var that = this;
    for (var i = 0; i < that.data.stars.length; i++) {
      var allItem = 'stars[' + i + '].flag';
      that.setData({
        [allItem]: 1
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars[' + i + '].flag';
      that.setData({
        [item]: 2
      })
    }
  }
})
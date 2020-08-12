// pages/eatDetail/eatDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showGG: false,
    eatList: [{
      name: "养生粥（绿豆/红枣...）",
      num: 350,
      price: 6,
      picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597209899287&di=54060209c6f9261d0f83b0e88fea70be&imgtype=0&src=http%3A%2F%2Fdimg.52bjw.cn%2Fimage%2Fupload%2F02%2Fb3%2F13%2F9c%2F02b3139c182c94c2360338ee3193da3b.jpg'
    }, {
      name: "养生粥（绿豆/红枣...）",
      num: 350,
      price: 6,
      picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597209899287&di=54060209c6f9261d0f83b0e88fea70be&imgtype=0&src=http%3A%2F%2Fdimg.52bjw.cn%2Fimage%2Fupload%2F02%2Fb3%2F13%2F9c%2F02b3139c182c94c2360338ee3193da3b.jpg'
    }, {
      name: "养生粥（绿豆/红枣...）",
      num: 350,
      price: 6,
      picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597209899287&di=54060209c6f9261d0f83b0e88fea70be&imgtype=0&src=http%3A%2F%2Fdimg.52bjw.cn%2Fimage%2Fupload%2F02%2Fb3%2F13%2F9c%2F02b3139c182c94c2360338ee3193da3b.jpg'
    }, {
      name: "养生粥（绿豆/红枣...）",
      num: 350,
      price: 6,
      picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597209899287&di=54060209c6f9261d0f83b0e88fea70be&imgtype=0&src=http%3A%2F%2Fdimg.52bjw.cn%2Fimage%2Fupload%2F02%2Fb3%2F13%2F9c%2F02b3139c182c94c2360338ee3193da3b.jpg'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  showggBtn() {
    this.setData({
      showGG: true
    })
  },
  closeshowGG() {
    this.setData({
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
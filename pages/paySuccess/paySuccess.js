// pages/paySuccess/paySuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    closeOrder:true, 
    countDownNum:3,
    timer:''
  },
// 倒计时效果
  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum; //获取倒计时初始值 
    that.setData({
      timer: setInterval(function () {  
        countDownNum--; 
        that.setData({
          countDownNum: countDownNum
        }) 
        if (countDownNum == 0) { 
          clearInterval(that.data.timer); 
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }, 1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options)
    if (options.type==1){
      this.setData({
        closeOrder:false
      })
    }
    this.countDown()
  },
  goBack(){
    wx.navigateTo({
      url: '/pages/index/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
    clearInterval(this.data.timer); 
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
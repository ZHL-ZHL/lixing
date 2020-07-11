// pages/investment/investment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true, //小点
    indicatorColor: "white",
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 500, //滑动时间
    indicatorActiveColor: "#4D7AD2",
    current: 0,
    banner: [{
      picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/9281dd8e1b7ea091c34c74b4b45a34cf.jpg'
      },
      {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/6799053cc3e039729f1318031677d5ef.jpg'
      },
      {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/30d4cbf1d8bd638411a6cdc1b039b34d.jpg'
      },
    ],
    indicatorDots1: true, //小点
    indicatorColor1: "white",
    autoplay1: true, //是否自动轮播
    interval1: 3000, //间隔时间
    duration1: 500, //滑动时间
    indicatorActiveColor1: "#4D7AD2",
    current1: 0,
    banner1: [{
      picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/a9f9bac05ef7a49524f29de689fdca7f.jpg'
      },
      {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/d1fc6812007cf44b543644b10a055958.jpg'
      },

      {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/e2056293310830094577425762796da1.jpg'
      },
    ],
    indicatorDots3: true, //小点
    indicatorColor3: "white",
    autoplay3: true, //是否自动轮播
    interval3: 3000, //间隔时间
    duration3: 500, //滑动时间
    indicatorActiveColor3: "#4D7AD2",
    current3: 0,
    banner3: [{
      picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/f94148942670754a7c25ac2d57ec0285.jpg'
      }, {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/0a480a106bb99825db28482734311d73.jpg'
      }, {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/6820cdd24e04cbe00e7df5c3978a508c.jpg'
      }
    ],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  freeTell: function() {
    wx.makePhoneCall({
      phoneNumber: '18634393815',
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
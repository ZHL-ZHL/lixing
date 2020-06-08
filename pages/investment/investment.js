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
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/7dee973c887a0344d7404a700927a4fc.jpg'
      },
      {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/65eaae794ff903ecf6597fe20c2ae954.jpg'
      },
      {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/dc65dc92b94b68cd86e47030e185ed07.jpg'
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
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/42a675d0eef4e7d56ec1f36da1c7b622.jpg'
      },
      {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/f31e4648a6e9d769d2da6970a366d0d3.jpeg'
      },

      {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/54681d0b370b899a36d555ce6e58601f.jpg'
      },
    ],
    indicatorDots2: true, //小点
    indicatorColor2: "white",
    autoplay2: true, //是否自动轮播
    interval2: 3000, //间隔时间
    duration2: 500, //滑动时间
    indicatorActiveColor2: "#4D7AD2",
    current2: 0,
    banner2: [{
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/c1e1f7c3eb426647b81cdcb6c61eff17.jpg'
      },
      {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/e30734fbcd247d43d2f3fba4b7150d2a.jpeg'
      },
      {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/38d28aee71db16afeb8c15c8a1453f84.jpeg'
      },
      {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/2fc4eb7ae7c2712b82a5bad516745825.jpeg'
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
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/229ee996f83489bf744a05be4a953b5f.jpeg'
      }, {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/a4fbb14e11206b72b09587af70dbd702.jpeg'
      }, {
        picture: 'http://aipark.zhongluwuliu.com/api/renren-fast/zlxcx/profile/55c69cc31aebe2077203b3d539510b47.jpeg'
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
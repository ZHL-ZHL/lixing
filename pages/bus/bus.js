// pages/bus/bus.js
import { busList, busUser, busaddCoord} from "../../api/bus.js"
import URL from "../../utils/host.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    ylink: URL.imgURL,
    type:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type
    })
    this.getList()
  },
  todetail(e){
    let id=e.currentTarget.dataset.id;
    let state = e.currentTarget.dataset.state;
    if (state){
      wx.navigateTo({
        url: '/pages/busDetail/busDetail?id=' + id,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      if(this.data.type==1){
        wx.showToast({
          title: '等待发车',
          icon: "none"
        })
      }else{
        
      }
    }
    
  },
  getList(){
    busList().then(res=>{
       if(res.code==0){
          this.setData({
            list:res.list
          })
       }else{
         wx.showToast({
           title: res.msg,
           icon:"none"
         })
       }
    }).catch(res=>{
      wx.showToast({
        title: res.msg,
        icon: "none"
      })
    })
  },
  starUser(e){
    console.log(e)
    var that = this
    let id = e.currentTarget.dataset.id;
    let state = e.currentTarget.dataset.state;
    busUser({ id, state: 'true' }).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: state ? '结束用车' : '开始用车',
          mask: true,
          success: function (res) {
            that.getList()
          },
          fail: function (res) { },
          complete: res => {

            wx.startLocationUpdate({
              success(res) {
                wx.startLocationUpdateBackground({
                  success(res) {
                    wx.onLocationChange(res1 => {
                      console.log({
                        id,
                        coordinate: res1.latitude + ',' + res1.longitude
                      })
                      wx.request({
                        url: URL.host + '/renren-fast/bus/regular/addCoord',
                        data: {
                          id: id,
                          lat: res1.latitude,
                          lon: res1.longitude,
                          token: wx.getStorageSync("token")
                        },
                        header: {},
                        method: 'GET',
                        dataType: 'json',
                        responseType: 'text',
                        success: res2 => {
                          console.log(res2)
                        },
                        fail: function (res) { },
                        complete: function (res) { },
                      })
                    })
                  },
                  fail(res) {
                    console.log('开启后台定位失败', res)
                  }
                })
              },
              fail(res) {
                console.log('开启后台定位失败', res)
              }
            })
          },
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: "none"
      })
    })
  },
  stopUser(e){
    console.log(e)
    var that = this
    let id = e.currentTarget.dataset.id;
    let state = e.currentTarget.dataset.state;
    busUser({ id, state: 'false' }).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: '结束用车' ,
          mask: true,
          success: res=> { 
            console.log(res)
            that.getList()
          },
          fail: function (res) { },
          complete: res => {
           
          },
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: "none"
      })
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
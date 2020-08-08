// pages/myvisitors/myvisitors.js
import { visitorsList} from "../../api/visitors.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
     pageNum:1,
     load:false,
     wechatUserId:"",
     list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      wechatUserId: wx.getStorageSync("userInfo").wechatUserId
    })
    this.getList()
  },
  getList(){
    visitorsList({ page: this.data.pageNum, wechatUserId: this.data.wechatUserId}).then(res=>{
        if(res.code==200){
           console.log(res)
          let list;
          this.data.pageNum == 1 ? list = res.page.list : list = this.data.meetingRoom.concat(res.page.list)
          let loadMore;
          this.data.pageNum < res.page.totalPage ? loadMore = true : loadMore = false;
          this.setData({
            load: loadMore,
            list: list
          })
        }else{
          wx.showToast({
            title: res.desc,
            icon: 'none'
          })
        }
    }).catch(res=>{
      wx.showToast({
        title:res,
        icon:'none'
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
     this.setData({
       pageNum:1
     })
     this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     if(this.data.load){
       this.setData({
         pageNum: this.data.pageNum++
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
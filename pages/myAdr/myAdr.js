// pages/myadr/myadr.js
import { addressList } from "../../api/my.js"
import { address} from "../../api/my.js"
import { addressDel } from "../../api/my.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adrList: [],
    _type: "",
    queS: true,
    pageNum:1

  },
  onLoad: function (options) {
    this.setData({
      userid: wx.getStorageSync('userInfo').wechatUserId,
      type:options.type
    })
    this.getAdrList()
  },
  touchstart: function (e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
    })
  },
  touchmove: function (e) {
    var that = this,
      idx = e.currentTarget.dataset.idx, //当前索引
      index = e.currentTarget.dataset.index,
      adrList = that.data.adrList,
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
          X: touchMoveX,
          Y: touchMoveY
        });
    adrList.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      adrList: adrList
    })
  },
  Toque: function (e) {
    if(this.data.type==2){
      console.log(e)
      var item = e.currentTarget.dataset.item;
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.setData({
        address: item,
      })
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  //更新数据


  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  getAdrList() {
    this.setData({
      queS: true
    })
    addressList({ page: this.data.pageNum, userid: this.data.userid}).then(res=>{
       if(res.code==0){
         
         if(res.data){
           console.log(2)
           this.setData({
             adrList: res.data
           })
         }else{
           console.log(1)
           this.setData({
             queS: false
           })
         }
          
       }else{
         wx.showToast({
           title: res.desc,
           icon: 'none'
         })
       }
    }).catch(res=>{
      wx.showToast({
        title: res,
        icon:'none'
      })
    })
  },
  toedit: function (e) {
    var addId = e.currentTarget.dataset.id;
    var additem = e.currentTarget.dataset.item;
    var additemJson = JSON.stringify(additem)
    wx.navigateTo({
      url: '/pages/myadrAdd/myadrAdd?add_Id=' + addId + '&item=' + additemJson,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
    this.getAdrList()
  },
  delAdr: function (e) {
    var that=this;
    console.log(e)
    let idx = e.currentTarget.dataset.idx
    wx.showModal({
      title: '提示',
      content: '确定删除该条地址？',
      showCancel: true,
      success: res=>{
        if(res.confirm){
          addressDel({ id: e.currentTarget.dataset.id}).then(res=>{
             if(res.code==0){
               wx.showToast({
                 title: '删除成功！',
                 success:function(){
                   let address = that.data.adrList
                   address.splice(idx, 1)
                   that.setData({
                     adrList: address
                   })
                 }
               })
             }else{
               wx.showToast({
                 title: res.desc,
                 icon: "none"
               })
             }
          }).catch(res=>{
             wx.showToast({
               title: res,
               icon:"none"
             })
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  getDefault: function (id) {
   
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
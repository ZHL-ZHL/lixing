// pages/myCollect/myCollect.js
import { collectList} from "../../api/collect.js"
import Url from "../../utils/host.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    queS: true,
    type:"",
    wechatUserId:"",
    page:1,
    load:false,
    online: Url.imghost,
    queS:true
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      wechatUserId: wx.getStorageSync("userInfo").wechatUserId,
      type: options.type
    })
    if(options.type==1){
       wx.setNavigationBarTitle({
         title: '会议室租赁',
       })
      
    }else{
        wx.setNavigationBarTitle({
          title: '维修服务',
        })
    }
    this.getList()
    
  },
  getList(){
    this.setData({
      queS:true
    })
    collectList({ wechatUserId: this.data.wechatUserId, itmeType: this.data.type,page:this.data.page}).then(res=>{
       if(res.code==0){
         if (res.data.totalCount==0){
           this.setData({
             queS: false
           })
         }else{
           let list;
           this.data.page == 1 ? list = res.data.list : list = this.data.list.concat(res.data.list);
           let loadMore;
           this.data.page < res.data.totalPage ? loadMore = true : loadMore = false;
           this.setData({
             load: loadMore,
             list: list
           })
         }
          
       }else{
          wx.showToast({
            title: res.desc,
            icon:"none"
          })
       }
    }).catch(res=>{
      wx.showToast({
        title: res,
        icon: "none"
      })
    })
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
      listItem = that.data.listItem,
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
    console.log(that.data)
    listItem.forEach(function (v, i) {
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
    // console.log(listItem)
    //更新数据
    that.setData({
      listItem: listItem
    })
  },
  //更新数据


  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  getCollect() {

  
  },
  delCollect: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var idx = e.currentTarget.dataset.idx;
    var listItem = that.data.listItem;
    wx.request({
      url: url.URl + 'my/collect/del',
      data: { id: id },
      method: 'POST',
      header: {
        'Authorization': token
      },
      success: function (res) {
        var imgs = res.data
        console.log(res)
        var msg = res.data.msg
        if (res.data.code == 200) {
          wx.showToast({
            title: msg,
            icon: 'success',
            duration: 2000,
            success: function () {
              listItem.splice(idx, 1)
              that.setData({
                listItem: listItem
              })
              if (listItem.length == 0) {
                that.setData({
                  queS: true
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
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
    this.getList()
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
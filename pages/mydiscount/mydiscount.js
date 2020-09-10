// pages/mydiscount/mydiscount.js
import { myYe } from "../../api/discount.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yeE:"",
    cardNum:""
  },
  getYuE(e){
    console.log(e)
    let data={}
    data.appId="wxc35575f7a176ae3c"
    data.openId=wx.getStorageSync('openId')
    myYe(data).then(res=>{
      if (res.code == 200) {
        this.setData({
           yeE:res.data.balance,
           cardNum:res.data.cardNum
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    }).catch(res=>{

    })
  },
  selNav(e){
    console.log(e)
    let idx = e.currentTarget.dataset.idx
     this.setData({
       list:[],
       current: idx
     })
     if(idx==0){
       this.getAllList()
     }else{
       this.getMyList()
     }
  },
  getAllList(){
    this.setData({
      queS: true
    })
    discountAllList({ wechatUserId: this.data.wechatUserId}).then(res=>{
       if(res.code==200){
          if(res.data){
            this.setData({
              list: res.data
            })
          }else{
            this.setData({
              queS:false
            })
          }
          
       }else{
         wx.showToast({
           title: res.msg,
           icon: "none"
         })
       }
    }).catch(res=>{
      wx.showToast({
        title: res,
        icon: "none"
      })
    })
  },
  getCard(e){

  },
  getMyList() {
    this.setData({
      queS: true
    })
    discountMyList({ wechatUserId: this.data.wechatUserId }).then(res => {
      if (res.code == 200) {
        if(res.data){
          this.setData({
            list: res.data
          })
        }else{
          this.setData({
            queS: false
          })
        }
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    }).catch(res => {
       wx.showToast({
         title: res,
         icon:"none"
       })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getYuE()
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
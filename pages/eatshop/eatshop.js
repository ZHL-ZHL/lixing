// pages/eatshop/eatshop.js
import { eatshopOrder, eatshopAccept, eatshopDelivery, eatshopFinish, eatRefuseOrder, eatCancelAgreeOrder, eatCancelRefuseOrder, eatshopfinishFood} from "../../api/eat.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activetab:0,
    navBar:[
      { name: "新订单", id: "3" },
      { name: "待配送", id: "4" },
      { name: "配送中", id: "5" },
      { name: "自提", id: "99" },
      { name: "取消订单", id: "85" },
      { name: "已完成", id: "6" },
      { name: "售后", id: "8" },
      { name: "全部订单", id: "0" },
    ],
    page:1,
    load:false,
    list:[],
    isFixed:""
  },
  onChange(e){
    this.setData({
      activetab:e.detail.index,
      page:1,
      list:[]
    })
    this.getList()
  },
  onScroll(e) {
    this.setData({
      isFixed: e.detail.isFixed
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getList(){
    let data = {}
    data.pageNum =this.data.page
    data.shopState = this.data.navBar[this.data.activetab].id
    data.pageSize=15
    eatshopOrder(data).then(res=>{
      if(res.code==0){

        let totalPage;
        let last_page = parseInt((res.page.total / 15));
        parseInt((res.page.total % 15)) ? totalPage = last_page + 1 : totalPage = last_page;
        let list;
        this.data.page == 1 ? list = res.page.data : list = this.data.list.concat(res.page.data);
        if (this.data.page < totalPage) {
          this.setData({
            load: true
          })
        } else {
          this.setData({
            load: false
          })
        }
        this.setData({
          list: list
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    }).catch(res=>{
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
    })
  },
  onLoad: function (options) {
    this.getList()
   
  },
  toCall(e){
    let phone=e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  toDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/eatOrderDetail/eatOrderDetail?type=2&id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 接单
  toaccept(e){
    eatshopAccept({ orderId:e.currentTarget.dataset.id}).then(res=>{
      if (res.code == 0) {
        this.getList()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
    })
  },
  toDelivery(e){
    eatshopDelivery({ orderId: e.currentTarget.dataset.id }).then(res => {
      if (res.code == 0) {
        this.getList()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
    })
  },
  tofinish(e){
    eatshopFinish({ orderId: e.currentTarget.dataset.id }).then(res => {
      if (res.code == 0) {
        this.getList()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
    })
  },
  toRefuse(e){
    
    wx.showModal({
      title: '提示',
      content: '确定要拒绝这个单子吗？',
      showCancel: true,
      cancelText: '我再想想',
      confirmText: '确定',
      success: res=> {
        if(res.confirm){
          eatRefuseOrder({ orderId: e.currentTarget.dataset.id }).then(res => {
            if (res.code == 0) {
              this.getList()
            } else {
              wx.showToast({
                title: res.msg,
                icon: 'none',
              })
            }
          }).catch(res => {
            wx.showToast({
              title: res.msg,
              icon: 'none',
            })
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toRefuseCancel(e){
    eatCancelRefuseOrder({ orderId: e.currentTarget.dataset.id }).then(res => {
      if (res.code == 0) {
        this.getList()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
    })
  },
  toAgreeCancel(e) {
    wx.showModal({
      title: '提示',
      content: '确定要同意这个单子取消吗？',
      showCancel: true,
      cancelText: '我再想想',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          eatCancelAgreeOrder({ orderId: e.currentTarget.dataset.id }).then(res => {
            if (res.code == 0) {
              this.getList()
            } else {
              wx.showToast({
                title: res.msg,
                icon: 'none',
              })
            }
          }).catch(res => {
            wx.showToast({
              title: res.msg,
              icon: 'none',
            })
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tofoodfinish(e){
    
    eatshopfinishFood({ orderId: e.currentTarget.dataset.id }).then(res => {
      if (res.code == 0) {
        this.getList()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none',
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
       page:1
     })
     this.getList()
     wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.load){
      
      this.setData({
        page:this.data.page +1
      })
      console.log(this.data.page)
      this.getList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/my_dingdan/my_dingdan.js
import { orderList} from "../../api/order.js"
import Url from "../../utils/host.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBar: [
      { name: '全部',id:null },
      { name: '待收货',id:1}, 
      { name: '历史订单',id:2}
    ],
    type: ['会议室租赁', '我要吃饭','停车'],
    typeIdx:"",
    orderList:[],
    wechatUserId:"",
    itemType:0,
    load:false,
    page:1,
    online: Url.imghost,
    activetab:0,
    noContent:false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.status){
      this.setData({
        activetab: options.status
      })
    }
    this.getList()
    this.setData({
      wechatUserId:wx.getStorageSync("userInfo").wechatUserId
    })
  },
  onChange(e){
    this.setData({
      activetab: e.detail.index,
      orderList:[],
      page:1
    })
    this.getList()
  },
  typeChange(e){
    console.log(e)
    this.setData({
      typeIdx: e.detail.value,
      page:1,
      orderList: [],
      itemType: parseInt(e.detail.value)+1
    })
    this.getList()
  },
  getList(){
    let data={}
    this.setData({
      noContent: false
    })
    let status = this.data.activetab;
    
    if (status==0){
      status = null
    }
    
    if (this.data.itemType){
      data.itemType = this.data.itemType;
    }
    if (status){
      data.status = status
    }
    
    data.wechatUserId = this.data.wechatUserId;
    data.pageNum = this.data.page;
    data.pageSize = 10
    
    orderList(data).then(res=>{

       if(res.code==200){
         console.log(res.data)
         if (res.data && res.data.total>0 ){
           let list;
           this.data.page == 1 ? list = res.data.records : list = this.data.orderList.concat(res.data.records);
           let loadMore;
           this.data.page < res.data.pages ? loadMore = true : loadMore = false;
           this.setData({
             load: loadMore,
             orderList: list
           })
           
         }else{
           console.log("qqq")
           this.setData({
             noContent: true
           })
         }
         
       }else{
         wx.showToast({
           title: res.desc,
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
    if (this.data.load){
      this.setData({
        page:this.data.page+1
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
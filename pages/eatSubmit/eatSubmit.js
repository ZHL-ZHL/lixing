// pages/eatSubmit/eatSubmit.js
import { eatSbumit, eatCarList,shopInfo} from "../../api/eat.js"
var util = require('../../utils/util.js');
// console.log(util)

import URL from "../../utils/host.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    peis: ["到店自取", "外卖配送"],
    qy:["园区内","园区外"],
    peiIndex:null,
    disabled:true,
    qyIndex:null,
    date:"",
    time:"",
    totalPrice:"",
    eatList:[],
    bzTotalPrice:"",
    totalPrice:"",
    rtShop:"",
    delivers:"",
    address:"",
    remark:"",
    heji:"",
    orderPhone:"",
    starTime:"",
    peisFee:"",
    heji1:"",
    endTime:"",
    ylink: URL.imgURL,
    nameInput:""
  },
  bindDateChange(e){
    this.setData({
      time: e.detail.value
    })
  },
  nameInput(e){
    this.setData({
      nameInput: e.detail.value
    })
  },
  bindChangePsStyle(e){
    if (e.detail.value==1){
      this.setData({
        heji1: (parseFloat(this.data.heji) + parseFloat(this.data.peisFee)).toFixed(2)
      })
    }
     this.setData({
       peiIndex:e.detail.value
     })

  },
  bindChangeYq(e){
    if (e.detail.value==1){
      this.setData({
        disabled: true,
        peiIndex:0
      })
    }else{
      this.setData({
        disabled: false,
        peiIndex: null
      })
    }
    this.setData({
      qyIndex: e.detail.value
    })
  },
  getInfo(){
    shopInfo({ id: 1 }).then(res => {
      if (res.code == 200) {
        this.setData({
          rtShop: res.rtShop,
          delivers: res.delivers,
          peisFee: res.delivers[0].deliverPrice,
          endTime: res.rtShop.orderEndTime.slice(0, 5)
        })
        console.log("222222")
        console.log(res.code, res.rtShop.orderEndTime.slice(0, 5),"sdsdsd")
        console.log("222222")
        // if (res.delivers.length!=0){
        //   this.setData({
        //     peisFee: res.delivers[0].deliverPrice
        //   })
        // }
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
  getList(){
    eatCarList().then(res=>{
      if(res.code==200){
        let cartIdArray=res.data.map(v=>{
          return v.id
        })
          this.setData({
            eatList:res.data,
            cartIds:cartIdArray
          })
      }else{
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    }).catch(res=>{
       wx.showToast({
         title:res.msg,
         icon:"none"
       })
    })
  },
  toAddress(){
    if(this.data.peiIndex==1){
      wx.navigateTo({
        url: '/pages/eatAddress/eatAddress?type=2',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.default.dayTime(new Date());
    console.log(time)
    this.getInfo()
    this.getList()
    this.setData({
      bzTotalPrice: options.bzTotalPrice,
      orderPhone: wx.getStorageSync("userInfo").phone,
      nameInput:wx.getStorageSync("userInfo").nickName,
      totalPrice:options.totalPrice,
      heji: (parseFloat(options.totalPrice) + parseFloat(options.bzTotalPrice) ).toFixed(2) ,
      starTime: time
      
    })
    
  },
  phoneInput(e){
    this.setData({
      orderPhone:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toSubmit(){
    if (this.data.qyIndex==null){
      wx.showToast({
        title: '请先选择园区',
        icon:"none"
      })    
    } else if (this.data.peiIndex==null){
      wx.showToast({
        title: '请先选择配送方式',
        icon: "none"
      })  
    } else if (this.data.peiIndex == 0 && this.data.nameInput.length ==0){
      wx.showToast({
        title: '请填写收货人姓名',
        icon: "none"
      })
    } else if (this.data.peiIndex == 0 && this.data.orderPhone.length!=11){
      wx.showToast({
        title: '请填写收货人手机号',
        icon: "none"
      }) 
    }else if(this.data.time.length==0){
      wx.showToast({
        title: '请选择时间',
        icon: "none"
      }) 
    } else if (this.data.peiIndex == 1 && this.data.address.length ==0) {
      wx.showToast({
        title: '请填写收货人手机号',
        icon: "none"
      })
    }else {
      let data = {}
      data.orderShopId = 1;

      data.orderType = parseInt(this.data.peiIndex) + 1;

      data.orderAppointmentTime = this.data.time

      // data.orderPrice = this.data.heji

      data.orderPackagePrice = this.data.bzTotalPrice;
      data.orderPayNum = 1;

      if (this.data.peiIndex == 0) {
        data.orderAddress = this.data.rtShop.address;
        data.orderPhone = this.data.orderPhone
        data.orderTotalPrice = this.data.heji;
        data.orderUserName=this.data.nameInput
      } else {
        data.orderAddressId = this.data.address.id;
        data.orderDeliverPrice = this.data.delivers[0].deliverPrice;
        data.orderTotalPrice = this.data.heji1;
        data.orderDeliver = this.data.delivers[0].id;
      }

      data.orderInvoiceNum = 1;
      data.orderInvoiceCompany = 1;
      data.orderRemark = this.data.remark;
      data.cartIds = this.data.cartIds.join(",")
      
      eatSbumit(data).then(res => {
        if (res.code == 200) {
          let data = JSON.parse(res.data)
          console.log(data)
          let pay_info = JSON.parse(data.pay_info)
          console.log(pay_info)

          wx.requestPayment({
            // 'appId': data,
            'timeStamp': pay_info.timeStamp,
            'nonceStr': pay_info.nonceStr,
            'package': pay_info.package,
            'signType': pay_info.signType,
            'paySign': pay_info.paySign,
            'success': function (res) {
              console.log(res)
              wx.showToast({
                title: "支付成功",
                icon: 'success',
                duration: 2000,
                success: function () {
                   wx.showModal({
                     title: '提示',
                     content: '支付成功！',
                     showCancel: false,
                     confirmText: '好的',
                     success: res=> {
                       if(res.confirm){
                         wx.requestSubscribeMessage({
                           tmplIds: ['bt9asUd8TPrd1mPclDlZt081erTxNeFTRKDLvZSKZtE',  'bt9asUd8TPrd1mPclDlZt3XbyJ050k6j6Gk0Iw36010', 'DhnivrzRuqHWq-vOO4wEiBu2Jk0_QC9565UqX9eDhPk'],
                           success: res => {
                              wx.navigateTo({
                                url: '/pages/paySuccess/paySuccess?type==1',
                                success: function (res) { },
                                fail: function (res) { },
                                complete: function (res) { },
                              })
                           },
                           fail: res => {
                             console.log(res)
                           }
                         })
                       }
                     },
                     fail: function(res) {},
                     complete: function(res) {},
                   })
                }
              })
            },
            fail: function (res1) {
              console.log(res1)
              wx.navigateTo({
                url: '/pages/eatOrder/eatOrder',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })

              wx.requestSubscribeMessage({
                tmplIds: ['bt9asUd8TPrd1mPclDlZt081erTxNeFTRKDLvZSKZtE', 'bt9asUd8TPrd1mPclDlZt3XbyJ050k6j6Gk0Iw36010', 'DhnivrzRuqHWq-vOO4wEiBu2Jk0_QC9565UqX9eDhPk'],
                success: res => {

                },
                fail: res => {
                  console.log(res)
                }
              })
            }
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
     
      
    }
    
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
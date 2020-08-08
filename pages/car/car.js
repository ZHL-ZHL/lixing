const app = getApp()
import { carList } from "../../api/repair.js"
import { delCar } from "../../api/repair.js"
import Url from "../../utils/host.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listItem: [],
    hasList: false, // 列表是否有数据
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: false, // 全选状态，默认全选
    startX: 0, //开始坐标
    startY: 0,
    isTouchMove: false,
    token: "",
    page: 1,
    totalNum: 0,
    queS: true,
    onLine: Url.imghost,
  },
  touchstart: function(e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
    })
  },
  touchmove: function(e) {
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
    listItem.forEach(function(v, i) {
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
      listItem: listItem
    })
  },
  //更新数据


  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.getCartList()
  },
  getCartList() {
    carList({pageNum:this.data.page,pageSize:10}).then(res=>{
       if(res.code==200){
          this.setData({
            listItem:res.data.list
          })
       }else{

       }
    }).catch(res=>{
       wx.showToast({
         title: res,
         icon:none
       })
    })
  },
  delCar: function(e) {
    var that = this;
    var listItem = that.data.listItem;
    var idx = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    delCar({id:id}).then(res=>{
      if(res.code==200){
        listItem.splice(idx, 1)
        that.setData({
          listItem: listItem
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    }).catch(res=>{
      wx.showToast({
        title: res,
        icon: 'none'
      })
    })
  },

  getTotalPrice() {
    let carts = this.data.listItem; // 获取购物车列表
    let total = 0;
    let totalNum = 0;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].selected) { // 判断选中才会计算价格
        totalNum += carts[i].num;
        total += carts[i].num * carts[i].itemPrice; // 所有价格加起来
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      listItem: carts,
      totalPrice: total.toFixed(2),
      totalNum: totalNum
    });
  },
  selectList(e) {
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let carts = this.data.listItem; // 获取购物车列表
    const selected = carts[index].selected; // 获取当前商品的选中状态
    carts[index].selected = !selected; // 改变状态
    this.setData({
      listItem: carts
    });
    var selectedO = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        selectedO += 1
      }
    }
    if (selectedO < carts.length) {
      this.setData({
        selectAllStatus: false,
      });
    } else {
      this.setData({
        selectAllStatus: true,
      });
    }
    // console.log(selectedO)
    this.getTotalPrice(); // 重新获取总价
  },
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.listItem;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus; // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      listItem: carts
    });
    this.getTotalPrice(); // 重新获取总价
  },
  calculateTotal: function() {
    var that = this;
    var carts = that.data.listItem;
    let cartSelected = carts.filter(function(v) {
      if (v.selected == true) {
        return true;
      } else {
        return false;
      }
    }).map(function(v) {
      return v;
    });

    if (cartSelected.length == 0) {
      wx.showToast({
        title: '请选择商品',
        icon: "none"
      })
    } else {
      var jsonData = JSON.stringify(cartSelected)
      wx.navigateTo({
        url: '/pages/tjMeeting/tjMeeting?info=' + jsonData + '&isCart=1&orderType=2',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })

    }
    console.log(cartSelected)
  },
  plus: function(e) {
    // console.log(e)
    const index = e.currentTarget.dataset.index;
    let storage = e.currentTarget.dataset.storage
    let carts = this.data.listItem;
    let num = carts[index].num;
    // console.log(storage)
    if (storage <= num) {
      wx.showToast({
        title: '不能再大了',
        icon: 'none',
      })
    } else {
      num = num + 1;
    }


    // console.log(num);
    carts[index].num = num;
    this.setData({
      listItem: carts
    });
    this.getTotalPrice();
  },
  minus: function(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.listItem;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      listItem: carts
    });
    this.getTotalPrice();
  },
  change: function() {
    // console.log(event.detail)

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
    this.setData({
      page:1
    })
    this.getCartList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      selectAllStatus: false
    })
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
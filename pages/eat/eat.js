// pages/eat/eat.js
import {
  eatList,
  shopInfo,
  classification,
  foodList,
  eatCar,
  eatCarList,
  eatgroupList,
  eatpingjiaList
} from "../../api/eat.js"
import URL from "../../utils/host.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    eatList: [{
      name: '宫保鸡丁',
      show: true,
    }, {
      name: '鱼香肉丝',
      show: true,
    }, {
      name: '土豆牛肉',
      show: false,
    }, {
      name: '小炒肉',
      show: false,
    }],
    showTitle: false,
    showGG: false,
    activetab: 0,
    x: 400,
    y: 550,
    scale: 2,
    ylink: URL.imgURL,
    banner1: [{
      picture: "/images/banner/banner.png"
    }],
    indicatorDots: false, //小点
    indicatorColor: "white",
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 500, //滑动时间
    indicatorActiveColor: "#FFE400",
    swiperIndex: 0,
    navBar: [{
        name: '点菜',
        id: 0
      },
      {
        name: '预定',
        id: 1
      },
      {
        name: '商家',
        id: 2
      },
    ],
    menNav: [],
    isFixed: false,
    cartList: [],
    totalPrice: 0,
    totalNum: 0,
    menuList: [],
    current: 0,
    rtShop: "",
    page: 1,
    foodGroupId: "",
    bzTotalPrice: "",
    peiSf: "",
    pingjiaList: [],
    addid: "",
    item: "",
    show: false,
    ids: [],
    load: false,
    news: []
  },
  onChange(e) {
    this.setData({
      activetab: e.detail.index
    })
    if (e.detail.index == 1) {
      this.setData({
        page: 1
      })
      this.getpingJia()
    }
  },
  showTitleBtn() {
    this.setData({
      showTitle: !this.data.showTitle
    })
  },
  addEatList() {

  },
  changeColor(e) {
    for (let i = 0; i < this.data.eatList.length; i++) {
      const item = this.data.eatList[i];
      if (item.name == e.currentTarget.dataset.item.name) {
        item.show = !e.currentTarget.dataset.item.show
        break
      }
    }
    let num = 0;
    for (let i = 0; i < this.data.eatList.length; i++) {
      const item = this.data.eatList[i];
      if (item.show) {
        num++
      }
    }

    if (num > 2) {
      for (let i = 0; i < this.data.eatList.length; i++) {
        const item = this.data.eatList[i];
        if (item.show && item.name != e.currentTarget.dataset.item.name) {
          item.show = false
          break
        }
      }
    }


    this.setData({
      eatList: this.data.eatList
    })
    console.log(this.data.eatList)
  },
  toDetail() {
    wx.navigateTo({
      url: '/pages/eatDetail/eatDetail',
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  closeshowGG() {
    this.setData({
      showGG: false
    })
  },
  selNav(e) {
    let idx = e.currentTarget.dataset.idx;
    let id = e.currentTarget.dataset.id;
    this.setData({
      current: idx,
      page: 1,
    })
  },
  toCall(e) {
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  onScroll(e) {
    this.setData({
      isFixed: e.detail.isFixed
    })
  },
  showggBtn() {
    this.setData({
      showGG: true
    })
  },
  showCar() {
    this.setData({
      show: true
    })
  },
  hideCar() {
    this.setData({
      show: false
    })
  },
  goodsAdd(e) {
    console.log(e)
    let item = e.currentTarget.dataset.item;
    let groupList = this.data.groupList
    let idx = e.currentTarget.dataset.idx
    let addid = e.currentTarget.dataset.id
    let foodCount = e.currentTarget.dataset.foodcount
    if (foodCount == 0) {
      wx.showToast({
        title: '菜品不足！',
      })
    } else {
      groupList.forEach((good) => {
        if (good.children && good.children.length > 0) {
          good.children.forEach((food) => {
            if (food.id == addid) {
              if (!food.num) {
                food.num = 1
              } else {
                console.log(foodCount, food.num)
                if (foodCount > food.num) {

                  food.num += 1
                } else {
                  wx.showToast({
                    title: '菜品不足！',
                  })
                }
              }
            }
          })
        }
      })
    }

    this.selectFoods(item)
    // 优化体验，异步传递当前点击文档节点
    this.setData({
      groupList
    })
  },
  goodsDel(e) {
    let item = e.currentTarget.dataset.item;
    let groupList = this.data.groupList
    let idx = e.currentTarget.dataset.idx
    let addid = e.currentTarget.dataset.id

    groupList.forEach((good) => {
      if (good.children && good.children.length > 0) {
        if (good.children.length > 0) {
          good.children.forEach((food) => {
            if (food.id == addid) {
              food.num -= 1
            }
          })
        }
      }

    })
    this.selectFoods(item)
    // 优化体验，异步传递当前点击文档节点
    this.setData({
      groupList
    })
  },
  selectFoods(item) {
    let num = 0;

    let cartList = this.data.cartList;
    let ids = this.data.ids;
    let josnCartList = JSON.stringify(cartList)
    let groupList = this.data.groupList;
    let foods = []
    groupList.forEach((good) => {
      if (good.children && good.children.length > 0) {
        good.children.forEach((food) => {
          if (food.num > 0) {
            if (ids.indexOf(food.id) != -1) {
              let index = cartList.findIndex(item1 => {
                return item1.id == food.id
              })
              cartList[index] = food
            } else {
              cartList.push(food)
              ids.push(food.id)
            }
          } else if (food.num == 0) {
            if (ids.indexOf(food.id) != -1) {
              let index = cartList.findIndex(item1 => {
                return item1.id == food.id
              })
              console.log(index)
            }
          }
        })
      }
    })

    this.setData({
      cartList,
      ids
    })
    console.log(cartList)
    this.totalCount()
  },
  totalCount() {
    let total = 0
    let totalPrice = 0;
    let bzTotalPrice = 0
    this.data.cartList.forEach((food) => {
      total += food.num;
      totalPrice += food.foodPrice * food.num
      bzTotalPrice += food.foodPakagePrice * food.num
    })
    this.setData({
      totalPrice: totalPrice.toFixed(2),
      totalNum: total,
      bzTotalPrice: bzTotalPrice.toFixed(2)
    })
    if (this.data.totalNum == 0) {
      this.setData({
        show: false
      })
    }
  },
  getpingJia() {
    eatpingjiaList({
      shopId: 1,
      pageNum: this.data.page,
      pageSize: 15
    }).then(res => {
      if (res.code == 200) {


        let totalPage;
        let last_page = parseInt((res.page.total / 15));
        parseInt((res.page.total % 15)) ? totalPage = last_page + 1 : totalPage = last_page;
        let pingjiaList;
        this.data.page == 1 ? pingjiaList = res.page.data : pingjiaList = this.data.pingjiaList.concat(res.page.data);
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
          pingjiaList: pingjiaList
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
  getCarList() {
    let cartList = this.data.cartList;
    let menuList = this.data.menuList;

    let cartArray = menuList.filter(function (v) {
      if (v.num != 0) {
        return true;
      } else {
        return false;
      }
    }).map(function (v) {
      return v;
    });
    // if
    this.setData({
      cartList: cartArray
    })
  },


  getTotalNum() {
    let menuList = this.data.menuList; // 获取购物车列表
    let total = 0;
    let bzTotal = 0;
    let totalNum = 0;
    for (let i = 0; i < menuList.length; i++) { // 循环列表得到每个数据
      totalNum += menuList[i].num;
      total += menuList[i].num * menuList[i].foodPrice; // 所有价格加起来
      bzTotal += menuList[i].num * menuList[i].foodPakagePrice
    }
    this.setData({ // 最后赋值到data中渲染到页面
      totalPrice: total.toFixed(2),
      totalNum: totalNum,
      bzTotalPrice: bzTotal.toFixed(2)
    });
  },
  toSubmit() {
    if (this.data.totalNum == 0) {
      wx.showToast({
        title: '请选择你要购买的饭饭！',
        icon: "none",
      })
    } else {


      let cartList = this.data.cartList
      let dataArray = cartList.filter(v => {
        if (v.num == 0) {
          return false
        } else {
          return true
        }
      }).map(v => {
        let data = {}
        data.cartShopId = v.foodShop;
        data.cartFoodName = v.id;
        data.cartFoodPrice = v.foodPrice;
        data.cartFoodCount = v.num
        return data
      })
      console.log(dataArray)
      eatCar({
        rtCarts: JSON.stringify(dataArray)
      }).then(res => {
        if (res.code == 200) {
          wx.navigateTo({
            url: '/pages/eatSubmit/eatSubmit?&totalPrice=' + this.data.totalPrice + '&bzTotalPrice=' + this.data.bzTotalPrice,
            success: function (res) {},
            fail: function (res) {},
            complete: function (res) {},
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
  toOrder() {
    wx.navigateTo({
      url: '/pages/eatOrder/eatOrder',
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getcarLists()
    this.getgroupList()
    this.getInfo()
    this.getClassification()

  },
  getgroupList() {
    eatgroupList({
      shopId: 1
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          groupList: res.list
        })
        // this.selectFoods()
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

  getList() {
    foodList({
      foodGroup: this.data.foodGroupId,
      page: this.data.page
    }).then(res => {
      if (res.code == 200) {
        let menuList = res.page.list;
        let menuarray = menuList.map(v => {
          return Object.assign({}, v, {
            num: 0
          })
        })
        this.setData({
          menuList: menuarray
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
  getInfo() {
    shopInfo({
      id: 1
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          rtShop: res.rtShop
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
  getClassification() {
    classification({
      code: 'rt-food-goup'
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          menNav: res.data
        })
        console.log(res.data)
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


  getcarLists() {

    eatCarList().then(res => {

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
    if (this.data.load) {

      this.setData({
        page: this.data.page + 1
      })
      console.log(this.data.page)
      this.getpingJia()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
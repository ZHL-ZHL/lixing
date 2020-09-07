// pages/eat/eat.js
import {
  eatList,
  shopInfo,
  classification,
  foodList,
  eatCar,
  eatCarList,
  eatgroupList,
  eatreserveList,
  eatpingjiaList
} from "../../api/eat.js"
import URL from "../../utils/host.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listfoodName: "",
    specificationList: [],
    detailObj: {},
    shopInfoMsg: {},
    eatList: [],
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
    reserveList: [],
    totalPrice: 0,
    totalPriceDiscount: 0,
    totalNum: 0,
    totalPrice1: 0,
    totalPriceDiscount1: 0,
    bzTotalPrice1: 0,
    totalNum1: 0,
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
    ids1: [],
    load: false,
    news: [],
    menuItem:""
  },
  onChange(e) {
    this.setData({
      current: 0,
      activetab: e.detail.index
    })
    if (e.detail.index == 1) {
      this.setData({
        page: 1
      })
      // this.getpingJia()
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
    console.log(this.data.eatList)
    let pidx=e.currentTarget.dataset.pidx
    let idx=e.currentTarget.dataset.idx
    let specificationList=this.data.specificationList
    let list=specificationList[pidx].specificationListnew
   
    console.log(e)
    console.log(list)
    let selNum=list.filter(function (v) {
      if (v.show) {
        return true;
      } else {
        return false;
      }
    })
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item.name == e.currentTarget.dataset.item.name) {
        console.log(selNum.length)
        console.log(specificationList.num)
        console.log(selNum.length==specificationList[pidx].num)
        console.log(selNum.length==!item.show)
        if(!item.show&&(selNum.length==specificationList[pidx].num)){
            wx.showToast({
              title: '选'+specificationList[pidx].num+'个'+specificationList[pidx].categoryName+'菜',
              icon:"none"
            })
        }else{
          item.show = !e.currentTarget.dataset.item.show
          break
        }
       
      }
    }
    specificationList[pidx].specificationListnew=list
    this.setData({
      specificationList
    })
  },
  
  tocarr(){
    let item=this.data.menuItem
    let groupList = this.data.activetab == 0 ? this.data.groupList : this.data.eatreserveList
    // let foodCount = e.currentTarget.dataset.limitCount
    groupList.forEach((good) => {
      if (good.coodVo && good.coodVo.length > 0) {
        good.coodVo.forEach((food) => {
          if (food.id == item.id) {
            let tcArray=[]
            let tc=[]
            this.data.specificationList.forEach(item => {
              item.specificationListnew.forEach(item1 => {
                if(item1.show){
                  tc.push(item1.name)
                }
              });
            });
            tcArray.push({specificationList:tc})
            if (!food.num) {
              food.num = 1
              food.specificationList=tcArray
            } else {
              food.num += 1
              food.specificationList=food.specificationList.concat(tcArray)
            }
            console.log(food)
          }
        })
      }
    })
    this.selectFoods(item)
    // 优化体验，异步传递当前点击文档节点
    if (this.data.activetab == 0) {
      this.setData({
        groupList: groupList,
        showGG:false
      })
    } else {
      this.setData({
        eatreserveList: groupList
      })
    }
  },
  toDetail(e) {
    let info = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/eatDetail/eatDetail?info=' + JSON.stringify(info),
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
  showggBtn(e) {
    console.log(e)
    this.setData({
      listfoodName: e.currentTarget.dataset.item.name,
      specificationList: e.currentTarget.dataset.item.specificationDetail,
      menuItem:e.currentTarget.dataset.item
    })
    this.setData({
      showGG: true,
    })
    console.log(this.data.specificationList)
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
    let item = e.currentTarget.dataset.item;
    let groupList = this.data.activetab == 0 ? this.data.groupList : this.data.eatreserveList
    let idx = e.currentTarget.dataset.idx
    let addid = e.currentTarget.dataset.id
    let foodCount = e.currentTarget.dataset.limitCount
    if (foodCount == 0 || !foodCount) {
      groupList.forEach((good) => {
        if (good.coodVo && good.coodVo.length > 0) {
          good.coodVo.forEach((food) => {
            if (food.id == addid) {
              if (!food.num) {
                food.num = 1
              } else {
                if (!foodCount || foodCount > food.num) {
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
    } else {

    }
    this.selectFoods(item)
    // 优化体验，异步传递当前点击文档节点
    if (this.data.activetab == 0) {
      this.setData({
        groupList: groupList
      })
    } else {
      this.setData({
        eatreserveList: groupList
      })
    }
  },
  goodsDel(e) {
    let item = e.currentTarget.dataset.item;
    let groupList = this.data.activetab == 0 ? this.data.groupList : this.data.eatreserveList
    let idx = e.currentTarget.dataset.idx
    let addid = e.currentTarget.dataset.id
    groupList.forEach((good) => {
      if (good.coodVo && good.coodVo.length > 0) {
        if (good.coodVo.length > 0) {
          good.coodVo.forEach((food) => {
            if (food.id == addid) {
              food.num -= 1
            }
          })
        }
      }
    })
    this.selectFoods(item)
    // 优化体验，异步传递当前点击文档节点
    if (this.data.activetab == 0) {
      this.setData({
        groupList: groupList
      })
    } else {
      this.setData({
        eatreserveList: groupList
      })
    }

  },
  selectFoods(item) {
    let num = 0;
    let cartList = this.data.activetab == 0 ? this.data.cartList : this.data.reserveList;
    let ids = this.data.activetab == 0 ? this.data.ids : this.data.ids1;
    let josnCartList = JSON.stringify(cartList)
    let groupList = this.data.activetab == 0 ? this.data.groupList : this.data.eatreserveList
    let foods = []
    groupList.forEach((good) => {
      if (good.coodVo && good.coodVo.length > 0) {
        good.coodVo.forEach((food) => {
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
    cartList.forEach((item, index) => {
      if (item.num == 0) {
        cartList.splice(index, 1)
        ids.splice(index, 1)
      }
    });
    if (this.data.activetab == 0) {
      this.setData({
        cartList: cartList,
        ids: ids
      })
      this.totalCount()
    } else {
      this.setData({
        reserveList: cartList,
        ids1: ids
      })
      this.totalCount1()
    }
  },
  totalCount() {
    let total = 0
    let totalPrice = 0;
    let totalPriceDiscount = 0;
    let bzTotalPrice = 0
    this.data.cartList.forEach((food) => {
      total += food.num;
      totalPriceDiscount += food.discount ? food.discount * food.num : food.price * food.num
      totalPrice += food.price * food.num
      bzTotalPrice += food.packagePrice * food.num
    })
    this.setData({
      totalPrice: totalPrice.toFixed(2),
      totalNum: total,
      bzTotalPrice: bzTotalPrice.toFixed(2),
      totalPriceDiscount: totalPriceDiscount
    })
    if (this.data.totalNum == 0) {
      this.setData({
        show: false
      })
    }
  },
  totalCount1() {
    let total = 0
    let totalPrice = 0;
    let totalPriceDiscount = 0;
    let bzTotalPrice = 0
    this.data.reserveList.forEach((food) => {
      total += food.num;
      totalPriceDiscount += food.discount ? food.discount * food.num : food.price * food.num
      totalPrice += food.price * food.num
      bzTotalPrice += food.packagePrice * food.num
    })
    this.setData({
      totalPrice1: totalPrice.toFixed(2),
      totalNum1: total,
      bzTotalPrice1: bzTotalPrice.toFixed(2),
      totalPriceDiscount1: totalPriceDiscount
    })
    if (this.data.totalNum1 == 0) {
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
  toSubmit(e) {
    console.log(e.currentTarget.id)
    let info = {
      type: e.currentTarget.id ? e.currentTarget.id : 0,
      list: this.data.activetab == 0 ? this.data.cartList : this.data.reserveList,
      bzTotalPrice: this.data.activetab == 0 ? this.data.bzTotalPrice : this.data.bzTotalPrice1,
      peiSf: this.data.activetab == 0 ? this.data.peiSf : this.data.peiSf1,
      totalPrice: this.data.activetab == 0 ? this.data.totalPrice : this.data.totalPrice1,
      totalPriceDiscount: this.data.activetab == 0 ? this.data.totalPriceDiscount : this.data.totalPriceDiscount1,
    }
    wx.navigateTo({
      url: '/pages/eatListPay/eatListPay?info=' + JSON.stringify(info),
    })
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
    this.getInfo()
    // this.getcarLists()
    this.getgroupList()
    // this.getClassification()

  },
  getgroupList() {
    eatreserveList().then(res => {
      if (res.code == 200) {
        
        this.setData({
          eatreserveList:res.data
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
    eatgroupList().then(res => {
      if (res.code == 200) {
        let list=res.data
        for(let i=0;i<list.length;i++){
          let coodVo=list[i].coodVo
          for(let j=0;j<coodVo.length;j++){
            
            
            if(coodVo[j].type==1&&(coodVo[j].specificationDetail&&coodVo[j].specificationDetail.length>0)){
              coodVo[j].specificationDetail.forEach(item => {
                console.log(i,j)
                item.specificationListnew = item.specificationListnew ? item.specificationListnew : [] 
                item.specificationList.forEach(item1 => {
                  let obj = {
                    name: item1,
                    show: false,
                  }
                  item.specificationListnew.push(obj)
                });
              });
            }
          }
          
        }
        this.setData({
          groupList: list
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
    shopInfo().then(res => {
      if (res.code == 200) {
        this.setData({
          shopInfoMsg: res.data
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
    if (this.data.detailObj.id) {
      let groupList = this.data.activetab == 0 ? this.data.groupList : this.data.eatreserveList
      let cartList = this.data.activetab == 0 ? this.data.cartList : this.data.reserveList
      let ids = this.data.activetab == 0 ? this.data.ids : this.data.ids1
      groupList.forEach(item => {
        if (item.coodVo && item.coodVo.length > 0) {
          item.coodVo.forEach(item1 => {
            if (item1.id == this.data.detailObj.id) {
              item1.num = this.data.detailObj.num
              if (cartList.length == 0) {
                cartList.push(this.data.detailObj)
                ids.push(this.data.detailObj.id)
              } else {
                if (ids.indexOf(this.data.detailObj.id) == -1) {
                  ids.push(this.data.detailObj.id)
                  cartList.push(this.data.detailObj)
                }
              }
              cartList.forEach((item, index) => {
                if (item.id == this.data.detailObj.id) {
                  item.num = this.data.detailObj.num
                  if (this.data.detailObj.num == 0) {
                    cartList.splice(index, 1)
                    ids.splice(index, 1)
                  }
                }
              });
            }
          });
        }

      });
      if (this.data.activetab == 0) {
        this.setData({
          groupList: groupList
        })
      } else {
        this.setData({
          eatreserveList: groupList
        })
      }







      if (this.data.activetab == 0) {
        this.setData({
          cartList: cartList,
          ids: ids
        })
        this.totalCount()
      } else {
        this.setData({
          reserveList: cartList,
          ids1: ids
        })
        this.totalCount1()
      }
    }
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
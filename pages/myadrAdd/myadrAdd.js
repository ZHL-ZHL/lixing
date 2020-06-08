import { addressAdd } from "../../api/my.js"
import { addressEdit} from "../../api/my.js"
import { companyList} from "../../api/company.js"
import { eatAddressSave} from "../../api/eat.js"
Page({
  data: {
    region:['北京市','北京市','东城区'],
    moren: 0,
    token: "",
    check: false,
    addressInfo: "",
    addressList: true,
    add_Id:"",
    type:"",
    index:""
  },
  

  //生命周期函数--监听页面初次渲染完成
  onReady: function (e) {
    var that = this;
    //请求数据
  },
  onShow() {
    var that = this;
  },

  onReachBottom: function () {
  },
  nono: function () { },
  switchChange: function (e) {
    var that = this;
    console.log('switchChange发生change事件，携带value值为：', e.detail.value);
    var b = e.detail.value;
    if (b) {
      that.setData({
        moren: 1
      })
    } else {
      that.setData({
        moren: 0
      })
    }
  },
  getList(){
    companyList().then(res=>{
      if(res.code==0){
         this.setData({
           companyList:res.page
         })
      }else{
        wx.showToast({
          title: res.msg,
          icon:"none"
        })
      }
    }).catch(res=>{
      wx.showToast({
        title: res.msg,
        icon: "none"
      })
    })
  },
  bindChangeCompany(e){
     this.setData({
       index:e.detail.value
     })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    console.log(options)
    if (options.add_Id) {
      this.setData({
        add_Id: options.add_Id,
        addressInfo: JSON.parse(options.item),
        region: JSON.parse(options.item).provinces.split(",")
      })
    }
    this.setData({
      type:options.type
    })
    if(options.type==2){
      this.getList()
    }
    console.log(this.data.addressInfo)
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindSave: function (e) {
    var that = this;
    console.log(e.detail.value)
    let value = e.detail.value;
    
    if (value.name.length == 0) {
      wx.showToast({
        title: '收货人不能为空',
        mask: true,
        icon:"none"
      })
    } else if (value.phone.length == 0 || value.phone.length !== 11) {
      wx.showToast({
        title: '手机号长度有误',
        mask: true,
        icon:"none"
      })
    } else if (value.address.length == 0){
      wx.showToast({
        title: '填写详细地址',
        mask: true,
        icon:"none"
      })
    } else if(this.data.type==2){
      console.log(value)
      
      let updata={}
      updata.addrArea = value.addrArea;
      updata.addrName = value.name;
      updata.addrPhone = value.phone;
      updata.addrCompanyId = this.data.companyList[this.data.index].id;
      updata.addrTotaladdr = value.address;
      eatAddressSave(updata).then(res=>{
        if (res.code == 0) {
          wx.showToast({
            title: '添加成功',
            success: function () {
              console.log(1)
              wx.navigateBack({
                delta: 1,
              })
            }
          })
        } else {
          wx.showToast({
            title: res.desc,
            icon: 'none'
          })
        }
      }).catch(res => {
        wx.showToast({
          title: res,
          icon: 'none'
        })
      })
    }else{
      console.log(!this.data.add_Id)
      if (!this.data.add_Id) {
        value.tag = this.data.moren;
        value.provinces = this.data.region.join(",")
        value.wechatUserId = wx.getStorageSync("userInfo").wechatUserId;
        addressAdd(value).then(res => {
          if (res.code == 0) {
            wx.showToast({
              title: '添加成功',
              success: function () {
                console.log(1)
                wx.navigateBack({
                  delta: 1,
                })
              }
            })
          } else {
            wx.showToast({
              title: res.desc,
              icon: 'none'
            })
          }
        }).catch(res => {
          wx.showToast({
            title: res,
            icon: 'none'
          })
        })
      } else {

        value.tag = this.data.moren;
        value.provinces = this.data.region.join(",")
        value.id = this.data.addressInfo.id
        addressEdit(value).then(res => {
          if (res.code == 0) {
            wx.showToast({
              title: '修改成功',
              success: function () {
                console.log(1)
                wx.navigateBack({
                  delta: 1,
                })
              }
            })
          } else {
            wx.showToast({
              title: res.desc,
              icon: 'none'
            })
          }
        }).catch(res => {
          wx.showToast({
            title: res,
            icon: 'none'
          })
        })
      }
    }
  },

})
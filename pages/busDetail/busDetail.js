// pages/busDetail/busDetail.js
import { busInfo, busgetCoord} from "../../api/bus.js";
import URL from "../../utils/host.js"

var getC;
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:"",
    latitude:"",
    polyline:[],
    includePoints:[],
    steps: [],
    busStops:[],
    active:0,
    busId:"",
    busRegular:"",
    markers: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'gcj02',
      success:res=> {
        console.log(res)
        // "Lat": 37.824985053262,
        //   "Lng": 112.556369262174,
        //   "BLat": 37.83184382,
        //   "BLng": 112.56905202,
        //   "MLat": 37.82550317,
        //   "MLng": 112.56264597
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
    this.setData({
      busId:options.id
    })
    this.getDetail()
    
  },
  getCoord(){
    var that=this;

    wx.request({
      url: URL.host + '/renren-fast/bus/regular/getCoord',
      data: {
        id: that.data.busId ,
        token: wx.getStorageSync("token")
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: res => {
        console.log(res.data)
        if (res.data.code == 0) {
          let busStops = that.data.busStops;

          console.log(busStops)
          let data = res.data.data.busLine;
          let current;
          for (let i = 0; i < busStops.length; i++) {
            console.log(i)
            if (busStops[i].stopName == data[0].stopName) {
              current = i
            }
          }

          let marker = {
            id: 99,
            latitude: res.data.data.lat,
            longitude: res.data.data.lon,
            iconPath: "../../images/che.png"
          }
          let markers = that.data.markers
          markers[busStops.length] = marker
          console.log(that.data.markers)
          that.setData({
            markers,
            active: current
          })
          console.log(that.data)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      },
      fail: function (res) { 
        wx.showToast({
          title: res,
          icon: "none"
        })
      },
      complete: function (res) { },
    })
  },
  getDetail(){
    var that=this;
    busInfo({id:this.data.busId}).then(res=>{
      if(res.code==0){
        console.log(res)
        let busStops = res.busRegular.busStops;
        let originCoord = JSON.parse(res.busRegular.originCoord)
        console.log(originCoord)
        let terminusCoord = JSON.parse(res.busRegular.terminusCoord)
        console.log(terminusCoord)
        busStops.unshift(originCoord)
        busStops.push(terminusCoord)
        console.log(busStops)
        let busRegularArraY = [] 
        let steps=[] 
        let makers=[]
        busStops.map((v, index )=>{
          if(v.lat){
            let array = {
              latitude: v.lat,
              longitude: v.lon,
            }
            busRegularArraY.push(array)
          }
          let maker={
            id: v.id,
            latitude: v.lat,
            longitude: v.lon,
            label: {
              content: v.stopName,
              bgColor: "#ffffff",
              padding: 3,
              borderRadius: 2,
              textAlign: 'center',
              anchorX: -24,
              anchorY: -48
            },
          }
          makers.push(maker)
          if(v.stopName){
            let array1 = {
              text: v.stopName,
              // desc: '预计到站时间' + v.stopTime
            }
            steps.push(array1)
          }

          
        })
        let polyline=[
          {
            points: busRegularArraY,
            color: "#4D7AD2",
            width: 2,
            dottedLine: true
          },
        ]
        console.log(busRegularArraY)
        this.setData({
          busStops,
          includePoints: busRegularArraY,
          polyline,
          steps,
          busRegular: res.busRegular,
          markers:makers
        })
        that.getCoord()
        timer = setInterval(res=>{
          console.log(1)
          that.getCoord()
          console.log(2)
        },10000)
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
    if(timer){
      clearInterval(timer)
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getDetail()
    wx.stopPullDownRefresh()
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
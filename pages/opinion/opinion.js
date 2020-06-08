// pages/opinion/opinion.js
var context = null;// 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
//获取系统信息
wx.getSystemInfo({
  success: function (res) {
    canvasw = res.windowWidth;//设备宽度
    // canvash = res.windowWidth * 7 / 15;
    canvash = res.windowHeight
  }
});
import { updateCheck } from "../../api/contract.js";
import { upLoadIMg } from "../../utils/upload.js"
import URL from "../../utils/host.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "",
    type: "",
    checkLevel: "",
    contractId: "",
    checkMan: "",
    content: "",
    id: "",
    contractType: "",
    checkId: '',
    filesAz: ""
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  //开始
  canvasStart: function (event) {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);
    //context.moveTo(event.changedTouches[0].x, event.changedTouches[0].y);

  },
  toContent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  //过程
  canvasMove: function (event) {
    if (isButtonDown) {
      arrz.push(1);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
      // context.lineTo(event.changedTouches[0].x, event.changedTouches[0].y);
      // context.stroke();
      // context.draw()

    };

    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i])
      } else {
        context.lineTo(arrx[i], arry[i])
      };

    };
    context.clearRect(0, 0, canvasw, canvash);

    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
    context.stroke();

    context.draw(false);
  },
  canvasEnd: function (event) {
    isButtonDown = false;
  },
  cleardraw: function () {
    //清除画布
    arrx = [];
    arry = [];
    arrz = [];
    context.clearRect(0, 0, canvasw, canvash);
    context.draw(true);
  },
  //导出图片
  getimg: function () {
    var that = this
    
    //生成图片
    that.updata()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type == 1) {
      wx.setNavigationBarTitle({
        title: '拒绝',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '同意',
      })
      context = wx.createCanvasContext('canvas');
      context.beginPath()
      context.setStrokeStyle('#000000');
      context.setLineWidth(4);
      context.setLineCap('round');
      context.setLineJoin('round');
    }
    console.log(options)
    this.setData({
      type: options.type,
      checkLevel: options.checkLevel,
      contractId: options.contractId,
      checkMan: options.checkMan,
      id: options.id,
      contractType: options.contractType,
      checkId: options.checkId
    })

  },

  updata() {
    let data = {};
    // let imgUrl = URL.imgURL + this.data.filesAz.replace('D:/Game', '/wyl/profile');
    let imgUrl = URL.imgURL + this.data.filesAz;
    data.signature = imgUrl;//签名 imgUrl
    data.checkStatus = this.data.type;//审核状态
    data.checkManId = this.data.checkMan;//审核人id
    data.checkRemark = this.data.content;//备注
    data.checkId = this.data.checkId; //被审核id
    data.id = this.data.id;
    data.contractType = this.data.contractType;
    data.checkLevel = this.data.checkLevel;

    if (this.data.contractType == 0) {
      data.contractId = this.data.contractId;
    } else if (this.data.contractType == 1) {
      data.feeId = this.data.contractId;
    } else if (this.data.contractType == 2) {
      data.surrenderId = this.data.contractId;
    }
    updateCheck(data).then(res => {
      if (res.code == 0) {
        wx.navigateBack({
          delta: 2,
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
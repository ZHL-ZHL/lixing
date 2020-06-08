var Fly = require("flyio.js")//引入路径根据自己放置的目录配置
var fly = new Fly;
fly.interceptors.request.use((request) => {
  request.timeout = 30000;
  wx.showLoading({
    title: "加载中",
    mask: true,
  });
  if (wx.getStorageSync('token')) {//检查本地缓存是否有token存在没有则重新获取
    request.headers = {//设置请求头
      'content-type': 'application/json',
      "Authorization": "Bearer "+wx.getStorageSync('token')
    }
    return request;
  } else {
    // fly.lock();//锁住请求
    // return app.Load().then(res => {//重新获取token
    //   request.timeout = 30000,
    //     request.headers = {//设置请求头
    //       "content-type": "application/json",
    //       "cld.stats.page_entry": wx.getStorageSync('scene'),
    //       "version": app.globalData.version,
    //       "token": wx.getStorageSync('token')
    //     }
    //   wx.showLoading({
    //     title: "加载中",
    //     mask: true,
    //   });
    //   fly.unlock();//解锁请求
    //   return request;//继续之前的请求
    // })
    return
  }
})

fly.interceptors.response.use(
  (response) => {
    wx.hideLoading();
    return response.data;//请求成功之后将返回值返回
  },
  (err) => {
    //请求出错，根据返回状态码判断出错原因
    console.log(err)
    wx.hideLoading();
    if (err.status == 500) {
      return "网络连接异常"
    } else if (err.status == 1) {
      return "网络连接超时"
    } else if (err.status == 401) {
      wx.showToast({
        title: '未登录，请登录',
        icon: 'none',
        image: '',
        mask: true,
        success: function(res) {
          wx.clearStorage()
          wx.navigateTo({
            url: '/pages/login/login',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      return
    } else {
      if (err.response.data.message) {
        return err.response.data.message
      } else {
        return '请求数据失败,请稍后再试'
      }
    };
    // Do something with response error
  }
)
export default {
  fly: fly
}
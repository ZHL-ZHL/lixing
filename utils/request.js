var Fly = require("flyio.js") //引入路径根据自己放置的目录配置
var fly = new Fly;
fly.interceptors.request.use((request) => {
  request.timeout = 30000;
  wx.showLoading({
    title: "加载中",
  });
  request.headers = { //设置请求头
    'content-type': 'application/x-www-form-urlencoded',
    "Authorization": "Basic d2VjaGF0OndlY2hhdF9zZWNyZXQ=",  
  }
  console.log(wx.getStorageSync('token'))
  if (wx.getStorageSync('token')) { //检查本地缓存是否有token存在没有则重新获取 
    request.headers = { //设置请求头
      'content-type': 'application/json;charset=UTF-8',
      "Authorization": "Basic d2VjaGF0OndlY2hhdF9zZWNyZXQ=", 
      "Blade-Auth": 'bearer '+wx.getStorageSync('token')
    }
    const mark = request.url.indexOf('?') > -1 ? '&' : '?'
    request.url = request.url + mark
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
    if (response.data.code == 401) { 
      wx.showToast({
        title: '未登录，请登录',
        icon: 'none',
        image: '',
        mask: true,
        success: function(res) {
          wx.clearStorage()
          wx.switchTab({
            url: '/pages/my/my',
          })
          wx.hideLoading();

        },
        fail: function(res) {},
        complete: function(res) {},
      })
      return
    } else {
      wx.hideLoading();
      return response.data; //请求成功之后将返回值返回
    }

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
          wx.switchTab({
            url: '/pages/my/my',
          })
          wx.hideLoading();

        },
        fail: function(res) {},
        complete: function(res) {},
      })
      return
    } else {
      console.log(err.response.data.msg)
      if (err.response.data.msg) {
        return err.response.data.msg
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
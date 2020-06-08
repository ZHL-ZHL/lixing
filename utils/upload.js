import URL from "/host.js"


export function upLoadIMg(data) {
  var token = wx.getStorageSync("token");
  return new Promise(function (resolve, reject) {
    // var jsonData = JSON.stringify(data)
    // console.log(jsonData)
    wx.uploadFile({
      url: URL.host + '/renren-fast/zlxcx/uploads',
      filePath: data[0],
      name: 'file',
      formData: {},
      header: {
        "Content-Type": "multipart/form-data",
        'Authorization': "Bearer "+wx.getStorageSync('token')
      },
      success: res => {
        console.log(res.data)
        var data = JSON.parse(res.data)
        console.log(data)
        if (data.code==0){
          console.log(data)
          resolve(data.data[0])
          
        }else{
        }
        
      }, fail: err=>{
        reject(err)
        console.log(err)
      }
    });
  })
}
export default {
  upLoadIMg
}
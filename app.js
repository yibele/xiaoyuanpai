//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var that = this;
    //检测用户登陆
    wx.login({
      success : function (res) {
        if(res.code) {
          //获取用户信息
          wx.getUserInfo({
            success : function(res) {
              //将用户信息保存在全局变量中
              that.globalData.userInfo = res.userInfo;
              wx.request({
                url: 'http://localhost:8888/v1/user/find/'+res.userInfo.nickName,
                success: function (res) {
                  if(res.data.code === 40001) {
                    wx.request({
                      url: 'http://localhost:8888/v1/user/',
                      method: 'POST',
                      header : {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      data: {
                        nickName: res.userInfo.nickName,
                        avatarUrl: res.userInfo.avatarUrl,
                        phone: "",
                        gender:res.userInfo.gender
                      },
                      success: function (res1) {
                        if(res1.code === 10001) {
                          wx.request({
                            url: 'http://localhost:8888/v1/user/find/'+res.userInfo.nickName,
                            success : function (res2) {
                              wx.setStorage({
                                key: 'user',
                                data: 'res2.data.data',
                                success : function () {
                                  console.log('add new user success');
                                }
                              })
                            }
                          })
                        }              
                      }
                    })
                    console.log(res.data.code);
                  } else {
                    //将用户信息储存在 ’user' 键中
                    wx.setStorage({
                      key: 'user',
                      data: res.data.data,
                      success: function () {
                        var tmp = wx.getStorageSync('user');
                        console.log(tmp);
                      }
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})

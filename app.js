//app.js
/**
 * 这里我们做了两件事情
 * 1 事情是从数据库中获取用户信息，如果用户
 * 信息不存在，就插入用户信息。
 * 2 将获取的用户信息存在全局变量userData中，其中包括用户信息和用户参加的互动信息as
 */
App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        var that = this;
        //检测用户登陆
        wx.login({
            success: function(res) {
                if (res.code) {
                    //获取用户信息
                    wx.getUserInfo({
                        success: function(res) {
                            //将用户信息保存在全局变量中
                            that.globalData.userInfo = res.userInfo;
                            wx.request({
                                url: 'http://localhost:8888/v1/user/find/' + res.userInfo.nickName,
                                success: function(res3) {
                                    if (res3.data.code === 40001) {
                                        wx.request({
                                            url: 'http://localhost:8888/v1/user/',
                                            method: 'POST',
                                            header: {
                                                'content-type': 'application/x-www-form-urlencoded'
                                            },
                                            data: {
                                                nickName: res.userInfo.nickName,
                                                avatarUrl: res.userInfo.avatarUrl,
                                                phone: "",
                                                gender: res.userInfo.gender
                                            },
                                            success: function(res1) {
                                                if (res1.code === 10001) {
                                                    wx.request({
                                                        url: 'http://localhost:8888/v1/user/find/' + res.userInfo.nickName,
                                                        success: function(res2) {
                                                            that.globalData.userData = res2.data.data;
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    } else {
                                        //将用户信息储存在 ’user' 键中
                                        /**
                                        wx.setStorage({
                                          key: 'user',
                                          data: res.data.data,
                                          success: function () {
                                            var tmp = wx.getStorageSync('user');
                                            console.log(tmp);
                                          }
                                        })
                                        */
                                        that.globalData.userData = res3.data.data;
                                    }
                                }
                            })
                        }
                    })
                }
            }
        })
    },
    getUserData: function() {
        return this.globalData.userData;

    },
    globalData: {
        userInfo: null,
        userData: null,
    }
})

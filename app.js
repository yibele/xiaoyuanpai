const request = require('./utils/request.js');
/**
 * 这里我们做了两件事情
 * 1 事情是从数据库中获取用户信息，如果用户
 * 信息不存在，就插入用户信息。
 * 2 将获取的用户信息存在全局变量userData中，其中包括用户信息和用户参加的互动信息as
 */
App({
    onLaunch: function() {
        //获取用户信息 并将获取到的信息缓存
        this.getUserInfo(this.initStorage);
    },

    initStorage: function(userInfo) {
        var that = this
        wx.getStorageInfo({
            success: function(res) {
                //初始化用户
                that.initUser(res, userInfo);
            }
        })
    },

    /**
     * 用户登录
     */
    getUserInfo: function(cb) {
        var that = this
        wx.login({
            success: function() {
                wx.getUserInfo({
                    success: function(res) {
                        that.globalData.userInfo = res.userInfo
                        typeof cb == "function" && cb(that.globalData.userInfo)
                    }
                })
            }
        })
    },

    /**
     *   初始化用户信息
     */

    initUser: (res, userInfo) => {
        var keys = res.keys;
        console.log(res);
        if (keys.indexOf('userInfo') == -1) {
            console.log('用户不存在与storage');
            //从数据库中查找用户， 如果用户存在
            request.getUser('find', userInfo.nickName)
                .then(d => {
                    console.log(d);
                    if (d.code != 40001) {
                        wx.setStorageSync('userInfo', d.data.user);
                        wx.setStorageSync('uid', d.data.user.user_id);
                        wx.setStorageSync('userAct', d.data.act);
                        wx.setStorageSync('actCount',d.data.actCount);
                    } else {
                        //从数据库中查找用户不存在
                        console.log('用户不存在于数据库中');
                        console.log('将添加用户到数据库中');
                        var data = {
                            nickName: userInfo.nickName,
                            avatarUrl: userInfo.avatarUrl,
                            phone: "",
                            gender: userInfo.gender
                        }
                        //请求添加用户到数据库中
                        wx.request({
                            url: 'http://www.yibele.com/v1/user/create',
                            method: "POST",
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            data: data,
                            success: d => {
                                wx.setStorageSync('userInfo', d.data.user);
                                wx.setStorageSync('uid', d.data.user.user_id);
                                wx.setStorageSync('userAct', d.data.act);
                                wx.setStorageSync('actCount',d.data.actCount);
                            },
                        })
                    }
                })
        }
    },
    globalData: {
        userInfo: null,
        userData: null,
    }
})

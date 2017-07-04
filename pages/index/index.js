
Page({
    data: {
        toView: 'red',
        scrollTop: 100,
        des: "狼人杀活动 \n 星期日 19:00",
        user: {},
        user_act: null,
        act_count: '',
        index_data: {}
    },
    onLoad: function() {
        //获取用户数据和活动信息
        this.getUser();
        this.getActivity();
    },
    toDetail: function() {
        wx.navigateTo({
            url: '/pages/detail/detail',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    //获取用户信息，并将用户信息存入变量当中
    getUser: function() {
        var that = this;
        var app = getApp();
        var userData = app.getUserData();
        if(userData != null) {
            that.setData({
                user: userData.user,
                act_count: userData.actCount,
                user_act: userData.act
            });
        } else {

        }
        /**
        wx.getStorage({
          key: 'user',
          success: function(res) {
              console.log(res);
            that.setData({
              user :res.data.user,
              user_act : res.data.act,
              act_count : res.data.actCount
            })
            console.log('set index data success');
          },
          fail: function(res) {
              console.log('get Data fail');
          },
          complete: function(res) {},
        })
        */
    },
    //获取首页活动信息
    getActivity: function() {
        var that = this
        wx.request({
            url: 'http://localhost:8888/v1/activity/index',
            success: function(res) {
                console.log(res.data);
                if (res.data.code == 10004) {
                    that.setData({
                        index_data: res.data.data
                    })
                }
            }
        })
    }
})

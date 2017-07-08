
const request = require('../../utils/request.js');
var app = getApp();
Page({
    data: {
        user: {},
        user_act: null,
        act_count: '',
        index_data: {},
        uid : ''
    },
    onLoad: function() {
        this.getActivity();
    },
    onShow: function() {
        this.setData({
            user: wx.getStorageSync('userInfo'),
            user_act: wx.getStorageSync('userAct'),
            act_count: wx.getStorageSync('actCount'),
            uid : wx.getStorageSync('uid')
        })
    },
    toDetail: function(e) {
         var id = e.currentTarget.dataset.id;
         wx.navigateTo({
             url: '/pages/detail/detail?id='+id
         })
    },
    //获取首页活动信息
    getActivity: function() {
        request.getAct('index','').then(d=>{
            this.setData({
                index_data : d.data
            })
        })
        /**
        var that = this
        wx.request({
            url: 'http://www.yibele.com/v1/activity/index',
            success: function(res) {
                console.log(res.data);
                if (res.data.code == 10004) {
                    that.setData({
                        index_data: res.data.data
                    })
                }
            }
        })
        */
    }
})

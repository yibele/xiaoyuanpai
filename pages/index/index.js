var app = getApp();
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    des: "狼人杀活动 \n 星期日 19:00",
    user : {},
    user_act : [],
    act_count : ''
  },
  onLoad : function () {
    //获取用户数据和活动信息
    this.getUser();
  },
  toDetail : function () {
    wx.navigateTo({
      url: '/pages/detail/detail',
      success: function(res) {
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getUser: function () {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        console.log(res.data);
        that.setData({
          user :res.data.user,
          user_act : res.data.act,
          act_count : res.data.actCount
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})

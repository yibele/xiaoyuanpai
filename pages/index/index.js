var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    des: "狼人杀活动 \n 星期日 19:00"
  },
  toDetail : function () {
    wx.navigateTo({
      url: '/pages/detail/detail',
      success: function(res) {
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})

// pages/user/user.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : null,
    actCount : null,
    userAct : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initAct();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData.refreshTag);
    if(app.globalData.refreshTag == true) {
      this.initAct();
      app.globalData.refreashTag = false;
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 初始化活动，人物
   * 
   */

  initAct : function () {
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo);
    var actCount = wx.getStorageSync('actCount');
    console.log(actCount);
    var userAct = wx.getStorageSync('userAct');
    console.log(userAct);
    this.setData({
      userInfo: userInfo,
      actCount: actCount,
      userAct: userAct
    })
  },
  /**
   * 转到活动详情页面
   */
  toAct: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/act/act?id=' + id,
    })
  }
})
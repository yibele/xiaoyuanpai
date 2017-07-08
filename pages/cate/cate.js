const request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      type : 'cate',
      cate_data : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      request.getAct(this.data.type).then(
          d=>{
              this.setData({
                  cate_data : d.data
              })
          }
      )
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
   * 转到互动列表页面
   */
  toDetail: function (e) {
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
          url: '/pages/detail/detail?id='+id
      })
  }
})

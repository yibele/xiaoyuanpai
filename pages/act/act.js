const request = require('../../utils/request.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        act: '',
        users: '',
        loading: true,
        subtitle: '加载中...',
        tag : false,
        signTag : false,
        uid : ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initData(options);
        this.getAct(options,this);
    }
    ,

    initData : function(options){
        var uid = wx.getStorageSync('uid');
        var count = wx.getStorageSync('actCount');
        this.setData({
            uid : uid
        })

        if(count >=2) {
            this.setData({
                signTag : true
            })
        }
    },

    /**
    * 获取活动报名页面
    */
    getAct : (options,that)=> {
        request.getAct('show/' + options.id + '/user/' + that.data.uid, '').then(
            d => {
                if(d.code === 10007) {
                    that.setData({
                        act : d.data.act,
                        users : d.data.user,
                        tag : d.data.tag
                    })
                }
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
     * 用户报名
     */
     signUp : function() {
         console.log('tpa')
         var data = {
             act_id : this.data.act.id,
             user_id : this.data.uid
         }
         //添加活动
         request.postAct('userAddAct',data).then(d=>{
             if(d.code != 40005) {
                 this.setData({
                    tag : true
                 })

                 //更新缓存
                 request.getUser('find',app.globalData.userInfo.nickName).then(d=>{
                     wx.setStorageSync('userInfo', d.data.user);
                     wx.setStorageSync('uid', d.data.user.user_id);
                     wx.setStorageSync('userAct', d.data.act);
                     wx.setStorageSync('actCount',d.data.actCount);
                     app.globalData.refreshTag = true;
                 })

                 
             }
         })

     },
     /**
      * 用户退出活动
      */

      signOut : function () {
          var data = {
              act_id : this.data.act.id,
              user_id : this.data.uid
          }
          request.postAct('userDelAct',data).then(d=>{
              console.log(d);
              if(d.code == 10009) {
                  this.setData({
                      tag : false
                  })
                  //更新缓存
                  request.getUser('find',app.globalData.userInfo.nickName).then(d=>{
                      wx.setStorageSync('userInfo', d.data.user);
                      wx.setStorageSync('uid', d.data.user.user_id);
                      wx.setStorageSync('userAct', d.data.act);
                      wx.setStorageSync('actCount',d.data.actCount);
                      app.globalData.refreshTag = true;
                  })

                 
              }
          })

      }
})

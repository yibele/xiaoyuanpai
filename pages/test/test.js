const request = require('../../utils/request.js');
// pages/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: 'cate',
        cata_data: null,
        code: 10005
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        /**
        request.get(this.data.type).then(d => {
            if (d.code === this.data.code) {
                this.setData({
                    cate_data: d.data
                })
            } else {
                console.log(d);
            }
        })
        */
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})

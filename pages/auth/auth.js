// pages/auth/auth.js
import { request } from "../../requests/index.js";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loginParam: {}
    },
    getUserInfo(e) {
        // 获取用户信息
        if (e.detail.cloudID) {
            const { encryptedData, iv, rawData, signature } = e.detail
                // 获取code
            wx.login({
                timeout: 10000,
                success: (result) => {
                    const code = result.code
                    const loginParam = {
                        encryptedData,
                        iv,
                        rawData,
                        signature,
                        code
                    }
                    this.setData({
                            loginParam
                        })
                        // 获取token值
                    wx.request({
                        url: 'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',
                        method: "POST",
                        data: this.data.loginParam,
                        success: (res) => {
                            console.log(res);
                        },
                    });
                },

            });
            // 返回上一步
            wx.navigateBack({
                delta: 1
            });

        } else {
            wx.showToast({
                title: '没有获取授权',
                success: (result) => {}
            });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
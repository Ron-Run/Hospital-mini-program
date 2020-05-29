// pages/car/car.js
import { request } from "../../requests/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {

        },
        car: [],
        totalPrice: 0,
        totalNum: 0
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
        let address = wx.getStorageSync("address");
        let car = wx.getStorageSync("car") || []
            // 过滤后的购物车数组
        car = car.filter(v => v.checked === true)
        let totalPrice = 0;
        let totalNum = 0
        car.forEach(v => {
            totalPrice += v.goods_price * v.num
            totalNum += v.num
        });
        // 重新添加回 data 和数据缓存中
        this.setData({
            car,
            totalPrice,
            totalNum,
            address
        })
    },
    toPay() {
        wx.requestPayment({
            timeStamp: '',
            nonceStr: '',
            package: '',
            signType: '',
            paySign: '',
            success: (result) => {

            },
            fail: (e) => { e },
            complete: () => {}
        });

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
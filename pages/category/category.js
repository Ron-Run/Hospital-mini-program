// pages/category/category.js
import { request } from "../../requests/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftCategory: [],
        rightCategory: [],
        currentIndex: 0,
        location: 0
    },
    // 接口的返回数据
    cates: [],
    /**
     * 生命周期函数--监听页面加载
     */
    handleTap(e) {
        // console.log(e.currentTarget.dataset.index);
        let index = e.currentTarget.dataset.index
        let rightCategory = this.cates[index].children
        this.setData({
            currentIndex: index,
            rightCategory,
            location: 0
        })
    },
    onLoad: function(options) {

        // 使用缓存技术
        const store = wx.getStorageSync('cate')

        if (!store) {
            // 没有数据时发请求拿数据
            this.getApiData()
        } else {
            // 有旧的数据时，过期了发请求，没过期继续使用
            // 定义过期时间  3天
            if (Date.now() - store.time > 1000 * 60 * 60 * 24 * 3) {
                this.getApiData()
            } else {
                // 可以使用旧数据
                // console.log("旧数据");
                this.cates = store.data;
                let leftCategory = this.cates.map(item => item.cat_name)
                let rightCategory = this.cates[0].children
                this.setData({
                    leftCategory,
                    rightCategory
                })

            }
        }


    },
    getApiData() {
        request({
            url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",

        }).then(res => {
            // console.log(res);
            this.cates = res.data.message

            // 把接口数据存进本地存储
            wx.setStorageSync("cate", {
                time: Date.now(),
                data: this.cates
            })

            let leftCategory = this.cates.map(item => item.cat_name)
            let rightCategory = this.cates[0].children
            this.setData({
                leftCategory,
                rightCategory
            })

        })
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
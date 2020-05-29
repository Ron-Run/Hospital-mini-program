// pages/good-list/good-list.js
import { request } from "../../requests/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabList: [{
            id: 0,
            title: "综合",
            isActive: true
        }, {
            id: 1,
            title: "销量",
            isActive: false
        }, {
            id: 2,
            title: "价格",
            isActive: false
        }],
        dataList: [],
        // 总页数：
        totalPage: 1

    },
    getValue(e) {
        let index = e.detail.index;
        let tabList = this.data.tabList
        tabList.forEach(item => {
            if (item.id === index) {
                item.isActive = true
            } else {
                item.isActive = false
            }
        });
        this.setData({
            tabList
        })
    },
    // 接口要的数据
    ApiData: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },

    getApiData() {
        request({
            url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",

        }).then(res => {

            // 总条数
            let total = res.data.message.total //57445
                // 当前页
            let pagenum = res.data.message.pagenum
                // 总页数
            let totalPage = Math.ceil(total / this.ApiData.pagesize)
            this.setData({
                // 数组拼接
                dataList: [...this.data.dataList, ...res.data.message.goods],
                totalPage
            })

            // 关闭等待提示
            wx.stopPullDownRefresh()
                // 把接口数据存进本地存储
                /*   wx.setStorageSync("cate", {
                      time: Date.now(),
                      data: this.cates
                  }) */

        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getApiData()
            // console.log(options);  页面参数
        this.ApiData.cid = options.cid

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
        // 重置数组数据
        this.setData({
                dataList: []
            })
            // 重置页码
        this.ApiData.pagenum = 1
            // 重新发送请求
        this.getApiData()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function(e) {
        // 判断还有没有下一页数据
        if (this.ApiData.pagenum >= this.totalPage) {
            wx.showToast({
                title: '没有下一页',
                icon: 'none',
            });

        } else {
            this.ApiData.pagenum++
                this.getApiData()
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
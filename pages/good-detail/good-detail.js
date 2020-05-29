// pages/good-detail/good-detail.js
import { request } from "../../requests/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods_id: 0,
        detailObj: {

        },
        isActive: false,
        detailInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let goods_id = options.goods_id
        this.setData({
            goods_id
        })
        this.getApiData()
    },
    getApiData() {
        request({
            url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id=${this.data.goods_id}`,

        }).then(res => {
            this.setData({
                detailObj: {
                    pics: res.data.message.pics,
                    goods_price: res.data.message.goods_price,
                    goods_name: res.data.message.goods_name,
                    goods_introduce: res.data.message.goods_introduce,
                    goods_id: res.data.message.goods_id
                },
                detailInfo: res.data.message
            })
        })
    },
    collection() {
        this.setData({
            isActive: !this.data.isActive
        })
    },
    scaleImage(e) {
        let urls = this.data.detailObj.pics
        let currentUrl = e.currentTarget.dataset.url
        const urlArr = urls.map(v => v.pics_mid)
        wx.previewImage({
            current: currentUrl,
            urls: urlArr,
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    addToCar(e) {
        // 1.获取缓存中的购物车数组
        let car = wx.getStorageSync("car") || [];
        // 判断商品对象是否存在购物车中
        let index = car.findIndex(v =>
            v.goods_id === this.data.detailInfo.goods_id
        )
        console.log(index);

        if (index === -1) {
            // 不存在
            this.data.detailInfo.num = 1;
            this.data.detailInfo.checked = true
            car.push(this.data.detailInfo)
        } else {
            // 存在 ++
            car[index].num++
        }
        // 把购物车添加回缓存中
        wx.setStorageSync("car", car);
        // 弹框提示
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true,
        });
    },
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
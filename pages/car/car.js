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
        allChecked: false,
        totalPrice: 0,
        totalNum: 0
    },
    addAdress() {

        //  2获取用户对小程序所授予获取地址的权限状态scope
        //  确定：authsetting scope.address 为true  取消：false  没点：undefined
        wx.getSetting({
            success: (result) => {
                if (result.authSetting["scope.address"] === false) {
                    wx.openSetting({
                        success: (rest) => {
                            // 选择地址
                            wx.chooseAddress({
                                success: (result2) => {
                                    result2.all = result2.provinceName + result2.cityName + result2.countyName + result2.detailInfo
                                    wx.setStorageSync("address", result2);

                                },
                            });
                        },
                    });
                } else {
                    wx.chooseAddress({
                        success: (result1) => {
                            result1.all = result1.provinceName + result1.cityName + result1.countyName + result1.detailInfo
                            wx.setStorageSync("address", result1);
                        },
                    });
                }
            },
        });

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
        this.setData({
            address
        })
        let car = wx.getStorageSync("car") || []
            // 设置价格 数量
        this.setPriceNum(car)
    },
    goodsChange(e) {
        let car = this.data.car
        let id = e.currentTarget.dataset.id
            // 找到被修改的商品对象
        let index = car.findIndex(v => v.goods_id === id)
            // 商品的选中状态取反
        car[index].checked = !car[index].checked
            // 重新填回data中和缓存中
        this.setData({
            car
        })
        wx.setStorageSync("car", car);
        // 设置价格 数量
        this.setPriceNum(car)
    },
    // 设置全选 反选
    allCheckedChange() {
        let { car, allChecked } = this.data
        allChecked = !allChecked
        car.forEach(v => v.checked = allChecked)
        this.setPriceNum(car)
    },
    // 商品数量编辑
    numChange(e) {
        const { id, edit } = e.currentTarget.dataset
        const car = this.data.car
        const index = car.findIndex(v => v.goods_id === id)
            // 如果 数量为 1 并点击 - 操作 则删除
        if (car[index].num === 1 && edit === -1) {
            wx.showModal({
                title: '删除商品',
                content: '确认删除该商品？',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: 'salmon',
                success: (result) => {
                    if (result.confirm) {
                        // 确定则删除
                        car.splice(index, 1)
                        this.setPriceNum(car)
                    } else {

                    }
                },

            });
        } else {
            car[index].num += edit
            this.setPriceNum(car)
        }
    },
    // 点击结算
    toPay() {
        const { address, car } = this.data
        if (!address.userName) {
            wx.showToast({
                title: '您还没有添加收货地址',
                icon: 'none',
                // image: '../../icon/提 示.png',
                duration: 1500,
            });
        } else if (car.length === 0) {
            wx.showToast({
                title: '您还没有添加商品',
                icon: 'none',
                // image: '../../icon/提 示.png',
                duration: 1500,
            });
        } else {
            wx.navigateTo({
                url: '../../pages/pay/pay',
                success: (result) => {

                },

            });
        }
    },

    // 设置价格 数量
    setPriceNum(car) {
        // every 方法：当数组内所有元素都为true时返回true，只要有一个为false都返回false，空数组返回true
        let allChecked = false
        allChecked = car.length > 0 ? car.every(v => v.checked) : false
        let totalPrice = 0;
        let totalNum = 0
        car.forEach(v => {
            if (v.checked) {
                totalPrice += v.goods_price * v.num
                totalNum += v.num
            }
        });
        // 重新添加回 data 和数据缓存中
        this.setData({
            car,
            allChecked,
            totalPrice,
            totalNum
        })
        wx.setStorageSync("car", car);
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
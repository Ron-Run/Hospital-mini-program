//Page Object
import { request } from "../../requests/index.js";
const db = wx.cloud.database()
const todo = db.collection("swiperList")
Page({
    data: {
        swiperList: [],
        navList: [],
        floorList: []
    },
    //options(Object)
    onLoad: function(options) {
        this.getCloudData("getData", e => {

            this.setData({
                swiperList: e.result.data
            })
        });
        this.getCloudData("getNavigators", e => {
            this.setData({
                navList: e.result.data
            })
        });
        this.getCloudData("getFloor", e => {
                this.setData({
                    floorList: e.result.data[0].message
                })
            })
            /* request({
                url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",

            }).then(res => {
                console.log(res);
            }) */
    },
    getCloudData(cloudName, callback) {
        wx.cloud.callFunction({
            name: cloudName,
            success: callback,
            fail: function(e) {
                console.log(e);
            }
        })
    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});
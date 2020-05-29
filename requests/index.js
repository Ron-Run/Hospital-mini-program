let ajaxTime = 0
export const request = (params) => {
    ajaxTime++
    // 显示加载中
    wx.showLoading({
        title: "加载中",
        mask: true,
    });


    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            success: function(res) {
                resolve(res)
            },
            fail: function(err) {
                reject(err)
            },
            complete: () => {
                ajaxTime--;
                if (ajaxTime === 0) {
                    wx.hideLoading();
                }


            }
        })
    })
}
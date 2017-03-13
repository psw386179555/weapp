// pages/category/category.js
Page({
    data: {
        currentId: '0',
        inputShowed: false,
        section: [],
        enterload: false,
        loadimg: false,
        loadagain: true,
    },
    onLoad: function () {
        //请求tab和轮播图
        var that = this;
        wx.request({
            url: 'https://wx.eshandz.cn/index/index/getCategory',
            data: {},
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/json'
            }, // 设置请求的 header
            success: function (res) {
                // console.log(res);
                if (res.data) {
                that.setData({
                    section: res.data,
                    currentId: res.data[0]['id']
                });
                    setTimeout(function () {
                        that.setData({
                            enterload: true,
                            loadimg: true,
                        });
                    }, 1000);
                } else {
                    that.setData({
                         loadimg: true,
                        loadagain: false,
                    });
                }

            },
            fail: function () {
                wx.showToast({
                    title: '网络连接失败',
                    icon: 'loading',
                    duration: 3000
                });
            },
            complete: function () {
            }
        });
    },
    catClick: function (e) {
        // console.log(e);
        this.setData({
            currentId: e.currentTarget.id,
        });
    }

});

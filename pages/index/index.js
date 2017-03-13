//index.js
var pre = 0;
var goodAll;
var app = getApp()
Page({
    data: {
        loadMore: true,
        loadMoreEnd: true,
        enterload: false,
        loadimg: false,
        loadagain: true,
        scrollTop: 0,
        imgUrls: [
            'http://ohy7djn2s.bkt.clouddn.com/bnr2.png',
            'http://ohy7djn2s.bkt.clouddn.com/28386.JPG',
            'http://ohy7djn2s.bkt.clouddn.com/16_158sucai.jpg'],
        tuijianImg: [
            { img: '/img/tuijian1.png', text: '精品推荐',name:'精品推荐',id:"1001" },
            { img: '/img/tuijian2.png', text: '旺季热销 ',name:'旺季热销',id:"1002" },
            { img: '/img/tuijian3.png', text: '完美搭配',name:'完美搭配',id:"1003"},
            { img: '/img/tuijian4.png', text: '新款推送',name:'新款推送',id:"1004" },
        ],
        good: [],
        animationTopData: {},
    },
    onLoad: function () {
        var that = this;//请求首页默认商品
        wx.request({
            url: 'https://wx.eshandz.cn/index/index/index',
            data: {
                pre: pre
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/json'
            }, // 设置请求的 header
            success: function (res) {

                goodAll = res.data;
                if (res.data) {
                    that.setData({
                        good: res.data,
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
                // wx.showToast({
                //     title: '网络连接失败',
                //     icon: 'loading',
                //     duration: 2000
                // });
                 that.setData({
                         loadimg: true,
                        loadagain: false,
                    });
            },
            complete: function () {
            }
        });//请求商品      

    },

    LoadMore: function (e) {
        pre = pre + 1;
        // console.log(pre);
        this.setData({
            loadMore: false,
        })
        var that = this;
        wx.request({
            url: 'https://wx.eshandz.cn/index/index/index',
            data: {
                pre: pre
            },
            method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/json'
            }, // 设置请求的 header
            success: function (res) {
                goodAll = goodAll.concat(res.data);
                if (res.data.length != 0) {
                    that.setData({
                        good: goodAll,
                    });
                } else {
                    that.setData({
                        loadMore: true,
                        loadMoreEnd: false
                    });
                }
                // console.log(res.data.length==0);

            },
            fail: function () {
                wx.showToast({
                    title: '连接失败',
                    icon: 'loading',
                    duration: 2000
                });
            },
            complete: function () {
            }
        });//请求商品    


    },


    //滚动监听，出现置顶按钮
    bindScroll: function (e) {
        var that = this;
        var animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 500,
            timingFunction: "ease",
            delay: 0
        });
        that.animation = animation;
        // console.log(e.detail.scrollTop);
        if (e.detail.scrollTop > 600) {
            that.animation.translate(0, -70).step({ duration: 1000 });
            that.setData({
                animationTopData: that.animation.export()
            });
        } else {
            that.animation.translate(0, 70).step({ duration: 500 });
            that.setData({
                animationTopData: that.animation.export()
            });
        }
    },

    //点击置顶
    clickTotop: function () {
        this.setData({
            scrollTop: 0,
        });
    }


})

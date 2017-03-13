// pages/categorylist/categorylist.js
Page({
  data: {
    goods: []
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options['name'] + "-e衫订制"
    })
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(options);
    var pcate = options['id'];
    //  var name = options['name'];
    var that = this;//请求首页默认商品
    wx.request({
      url: 'https://wx.eshandz.cn/index/index/getCategoryGoods?pcate=' + pcate,
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        // console.log(res);
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
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
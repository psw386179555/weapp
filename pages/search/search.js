// pages/search/search.js
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    searchword: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var value = wx.getStorageSync('searchwords');
    // console.log(value);  

    this.setData({
      inputShowed: true,
      searchword: value
    });
  },

  searchGoods: function (e) {
    var data = [];
    var val = [];
    //  console.log(e);
    var value = wx.getStorageSync('searchwords');
    if (value == "") {
      val = e.currentTarget.dataset.searchword;
      data = [{ val }];
    } else {
      val = e.currentTarget.dataset.searchword;
      val = [{ val }];
      data = value.concat(val);
    }
    wx.setStorageSync('searchwords', data);
  },
  clearStorage: function () {
    wx.removeStorageSync('searchwords');
    var value = wx.getStorageSync('searchwords');
    this.setData({
      searchword: value
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
    })
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
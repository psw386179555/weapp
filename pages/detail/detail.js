// pages/detail/detail.js
var sliderWidth = 100; // 需要设置slider的宽度，用于计算中间位置
var goodId;
var colorId;
var sizeId;
var thumb;
var nums;
var price;
var title;
Page({
  data: {
    tabs: ["商品", "详情", "参数"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    imgUrls: [],
    currentSizeId: 0,
    currentColorId: 0,
    goodsdetail: [],
    animationOption: {},
    animationShade: {},
    shade: true,
    optionimg: [],
    Number: 1,
    confirmId: '',
    optionSize: [],
    optionColor: [],
    optionColorTitle: [],
    optionSizeTitle: [],
    notice:''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(options['id']);
    goodId = options['id'];
    var that = this;
    wx.request({
      url: 'https://wx.eshandz.cn/index/index/getGoodsdetail', //仅为示例，并非真实的接口地址
      data: {
        id: options['id'],
      },
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          imgUrls: res.data.thumb_url,
          goodsdetail: res.data
        })
      }
    });

    wx.request({
      url: 'https://wx.eshandz.cn/index/index/getOption', //仅为示例，并非真实的接口地址
      data: {
        id: goodId,
      },
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data['content'][0]);
        that.setData({
          optionColorTitle: res.data['titles'][0],
          optionSizeTitle: res.data['titles'][1],
          optionimg: res.data['content'][0][0]['thumb'],
          optionColor: res.data['content'][0],
          optionSize: res.data['content'][1],
        })
      }
    });



    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2 + 10,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    // console.log(goodId);
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  showOption: function () {
    var that = this;
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    });
    that.animationOption = animation;
    that.animationOption.translate(0, -450).step();
    that.setData({
      animationOption: that.animationOption.export(),
      shade: false
    });
  },
  clickTiyan: function (e) {
    this.setData({
      confirmId: 1,
    });
    this.showOption();

  },
  addCart: function (e) {
    this.setData({
      confirmId: 2,
    });
    this.showOption();
  },
  clickPay: function (e) {
    this.setData({
      confirmId: 3,
    });
    this.showOption();
  },
  confirm: function (e) {   
    if(e.currentTarget.dataset.size==0){
      this.setData({
        notice:"请输入尺寸！"
      })
    }else if(e.currentTarget.dataset.color==0){
       this.setData({
        notice:"请输入颜色！"
      })
    }else{
       console.log(e);
    }
  },
  optionDel: function () {
    var that = this;
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    });
    that.animationOption = animation;
    that.animationOption.translate(0, 440).step();
    that.setData({
      animationOption: that.animationOption.export(),
      shade: true
    });
  },

  minNum: function (e) {
    var that = this;
    // console.log(e);
    //  console.log(e.currentTarget.dataset);
    if (e.currentTarget.dataset.num <= 1) {

    } else {
      that.setData({
        Number: e.currentTarget.dataset.num - 1
      });
    }
  },
  maxNum: function (e) {
    this.setData({
      Number: e.currentTarget.dataset.num + 1
    });
  },

  chooseSpec: function (e) {
    var that = this;
    // console.log(e.currentTarget.dataset);
    if (e.currentTarget.dataset.title == '0') {
      if (colorId != e.currentTarget.dataset.id) {
        colorId = e.currentTarget.dataset.id;
        that.setData({
          currentColorId: colorId,
          optionimg: e.currentTarget.dataset.thumb,
        });
      } else {
        colorId = 0;
        that.setData({
          currentColorId: colorId,
        });
      }
    } else if (e.currentTarget.dataset.title == '1') {
      if (sizeId != e.currentTarget.dataset.id) {
        sizeId = e.currentTarget.dataset.id;
        that.setData({
          currentSizeId: sizeId,
        });
      } else {
        sizeId = 0
        that.setData({
          currentSizeId: sizeId,
        });
      }
    }


  },
  previewImg: function (e) {
    // console.log(e);
    wx.previewImage({
      current: e.currentTarget.dataset.thumb, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.thumb] // 需要预览的图片http链接列表
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


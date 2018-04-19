const productApi = require('../../utils/controller/product')
const appconfig  = require('../../utils/appconfig')



Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerNoticeData: {
      bannerData: [],
      noticeData: [],
      goodsLabelData: {},
      isFinish: false,
    },  //banner, 公告, 导航数据
    productData: {
      productListData: [],
      isFinish: false
    },
    productDetailData : [], //商品详情数据
    productDataList: [], //所有列表商品
    pageIndex: 1,
    productRecommendData: [], //推荐商品列表
    productNewData:[],  //新款商品列表
    productHotData:[],  //热销商品列表
    productPromotionData:[], //特价商品列表,

    indicatorDots: true,
    indicatorActiveColor: "#007aff",
    indicatorColor: "rgba(0, 0, 0, .3)",
    autoplay: true,
    interval: 3000,
    duration: 100,


  },
  // 初次加载执行逻辑
  init: function () {
    this.getPageMsg();
    //判断数据加载完成时,关闭loading
    if(this.data.bannerNoticeData.isFinish && this.productData.isFinish) {
      wx.hideToast();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.init();
  },
  onMyEvent: function (e) {
    console.log(e)
    e.detail;
  },
  clickNoticeItem: function(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/message/noticeMessage/noticeMessage?id='+id
    })
  },
  getPageMsg: function() {
    var _this = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      // duration: 10000,
      mask: true
    })
    _this.setData({
      'productData.isFinish' : false,
      'bannerNoticeData.isFinish': false,
    })
    _this.data.productData.productListData.splice(0, _this.data.productData.productListData.length);
    _this.data.bannerNoticeData.bannerData.splice(0, _this.data.bannerNoticeData.bannerData.length);
    productApi.getBannerNotice(_this, {}, (result)=>{
      _this.setData({
        'bannerNoticeData.isFinish' : true,
      })
      _this.dealBannerNotice(result);
    }, (result) => {
      _this.setData({
        'bannerNoticeData.isFinish': true
      })
    });
    _this.getProductListMsg();
  },
  getProductListMsg: function () {
    this.getSalesRecommend();
    // this.getSalesPromotion();
    // this.getSalesHot();
    // this.getSalesNew();
  },
  dealBannerNotice: function(result) {
    this.setData({
      'bannerNoticeData.bannerData' : result.banner,
      'bannerNoticeData.noticeData' : result.notice,
      'bannerNoticeData.goodsLabelData' : result.goodsLabel,
      'bannerNoticeData.goodsLabelData.allLabel' : '全部商品',
      'bannerNoticeData.goodsLabelData.collectionLabel': '收藏商品'
    })
    // console.log(this.data.bannerNoticeData.noticeData)
  },
  /*-- 获取推荐 --*/
  getSalesRecommend: function(){
    var _this=this;
    _this.setData({
      'productData.isFinish': false
    })
    productApi.getIndexProductList(this, {
      isRecommend: 1,
      includeOOS: 1,
      orderSelect: 2,
      pageIndex: _this.data.pageIndex,
      pageSize: appconfig.pagesize,
    },function(result) {
      _this.setData({
        'productRecommendData': result.slice(0,4),
        'productData.isFinish' : true
      })
    }, function(result) {
      _this.setData({
        'productData.isFinish': true
      })
    });
  },
  /*-- 获取特卖 --*/
  getSalesPromotion: function(){
    var _this=this;
    _this.setData({
      'productData.isFinish': false
    })
    productApi.getIndexProductList(this, {
      isPromotion:1,
      includeOOS: 1,
      orderSelect: 2,
      pageIndex: _this.data.pageIndex,
      pageSize: appconfig.pagesize,
    },function(result) {
      _this.setData({
        'productPromotionData' : result.slice(0,4),
        'productData.isFinish': true
      })
    }, function(result) {
      _this.setData({
        'productData.isFinish' : true
      })
    });
  },
  /*-- 获取热销 --*/
  getSalesHot: function(){
    var _this=this;
    _this.setData({
      'productData.isFinish': false
    })
    productApi.getIndexProductList(this, {
      isHot:1,
      includeOOS: 1,
      orderSelect: 2,
      pageIndex: _this.data.pageIndex,
      pageSize: appconfig.pagesize,
    }, function(result) {
      _this.setData({
        'productHotData' : result.slice(0, 4),
        'productData.isFinish': true
      })
    }, function(result) {
      _this.setData({
        'productData.isFinish': true
      })
    });
  },
  /*-- 获取新品 --*/
  getSalesNew: function(){
    var _this=this;
    _this.setData({
      'productData.isFinish': false
    })
    productApi.getIndexProductList(this, {
      isNew:1,
      includeOOS: 1,
      orderSelect: 2,
      pageIndex: _this.data.pageIndex,
      pageSize: appconfig.pagesize,
    }, function(result) {
      _this.setData({
        'productNewData' : result.slice(0,4),
        'productData.isFinish': true
      })
    }, function(result) {
      _this.setData({
        'productData.isFinish' : true
      })
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // Do something when pull down.
    wx.showNavigationBarLoading();  //在当前页面显示导航条加载动画
    this.getPageMsg();
    wx.hideNavigationBarLoading();  //完成停止加载
    wx.stopPullDownRefresh();  //停止下拉刷新
    //
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      // return custom share data when user share.
  }
})
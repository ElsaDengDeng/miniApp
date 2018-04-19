// pages/product/productDetail/productDetail.js
var storage = require('../../../utils/storage');
var productApi = require('../../../utils/controller/product')
var WxParse = require('../../../wxParse/wxParse')
var authLib = require('../../../utils/authstorage')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId: 0,
    productDetailData:[],
    relevanceProductData: [], //相关商品
    showRelevanceProduct: false,
    saleStyle: "",
    flag: 0,
    rules: "",
    skusList: [],
    skusAll: [],
    promotions: [],
    promotionsAll: [],
    showStockQty: storage.getShowStockQty(),
    scrollTop: 0,
    indicatorDots: true,
    indicatorActiveColor: "#007aff",
    indicatorColor: "rgba(0, 0, 0, .3)",
    autoplay: false,
    interval: 5000,
    duration: 1000,

    current: 0,
    isChangeSlider: true, //默认显示图文详情
    swiper: {
      indicatorDots: false,
      autoplay: false,
      interval: 0,
      duration: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (ret) {
    var id = ret.id;
    console.log(id)
    if(id != this.data.productId) {
      this.doInitPage(id);
    }
    wx.hideTabBar(); //商品详情页隐藏tabBar
  },
  GoBack: function () {
    wx.navigateBack({
      delta: 2
    })
  },
  doInitPage: function (id) {
    if (this.data.productId != id) {
      this.setData({
        "productId" : id
      })
      this.getProductDetailMsg(id);
      this.getRelevanceProductMsg(id);
      if (authLib.checkIsAuthed()) {
        productApi.getAddBrowsingRecord(this, {productId: id});
      }
    }
  },
  getProductDetailMsg: function (id) {
    productApi.getProductDetail(this,{productId: id}, (result)=>{
      this.dealProductDetail(result)
    })
  },
  dealProductDetail: function (result) {
    this.setData({
      'productDetailData': result
    })
    result.promotions = result.promotions.reverse()
    var article = result.description; // html代码
    WxParse.wxParse('article', 'html', article, this, 0);
    if(result.promotions.length) {
      this.setData({
        "promotionsAll": result.promotions
      })
      if(result.promotions.length <= 3) {
        this.setData({
          "promotions": result.promotions
        })
      } else {
        this.setData({
          "promotions": result.promotions.slice(0,3)
        })
      }
    } else {
      this.setData({
        "promotions": []
      })
    }
    console.log(this.data.promotions)

  },
  getRelevanceProductMsg: function (id) {
    productApi.getRelevanceProduct(this, {productId: id}, (result) => {
      this.setData({
        "relevanceProductData": result.data
      })
      console.log(this.data.relevanceProductData)
    })
  },
  switchSlider: function (e) {
    this.setData({
      current: e.target.dataset.index
    })
    if(this.data.current == 0){
      this.setData({
        isChangeSlider: true
      })
    } else {
      this.setData({
        isChangeSlider: false
      })
    }
  },
  clickGoProductDetail: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/product/productDetail/productDetail?id='+id
    })
  },
  clickPopueCollect: function () {
    if(this.data.productDetailData.isCollected){
      productApi.getCancelFavorite(this, {productId: this.data.productDetailData.id}, ()=>{
        wx.showToast({
          title: '取消收藏成功!',
          icon: "none",
          duration: 1000
        })
        this.setData({
          "productDetailData.isCollected": false
        })
      })
    } else {
      productApi.getFavorite(this, {
        productId: this.data.productDetailData.id,
        price: this.data.productDetailData.tradePrice
      }, ()=>{
        wx.showToast({
          title: '收藏成功！',
          icon: "none",
          duration: 1000
        })
        this.setData({
          "productDetailData.isCollected": true
        })
      })
    }
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
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
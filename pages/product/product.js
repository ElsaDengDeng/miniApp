// pages/product/product.js
var productApi = require('../../utils/controller/product')
var appconfig = require('../../utils/appconfig')
var vm  = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showBigProductList: false,
    loading: false, //处理是否显示无数据的动画
    pageIndex: 1,
    pageSize: appconfig.pagesize,
    hasMoreData: true,
    productData: [],  //商品数据
    productDetailData: [],
    queryData: {},
    refresh: false,
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options); //option 为首页点击更多传值过来的数据  为search组件传值过来的searchValue
    // 两种情况  一种是监听从子组件navType传值过来的option.detail
    this.doInitPage(options);
    // this.dealMessage('正在加载数据...')
  },
  doInitPage: function (options) {
    if(options.detail) {
      var detail = options.detail
      this.dealMergeObj(detail, this.data.queryData, true)
      this.getProductListMsg(detail)
    } else {
      this.setData({
        'queryData': options
      })
      var queryData = this.data.queryData;
      var query  = {};
      if (queryData.classId) query.classId = queryData.classId;
      if (queryData.keyWord) query.keyWord = queryData.keyWord;
      if (queryData.brandId) query.brandId = queryData.brandId;
      if (queryData.minPrice) query.minPrice = queryData.minPrice;
      if (queryData.maxPrice) query.classId = queryData.maxPrice;
      if (queryData.isSalesPromotion) query.isSalesPromotion = queryData.isSalesPromotion;
      if (queryData.isNew) query.isNew = queryData.isNew;
      if (queryData.isHot) query.isHot = queryData.isHot;
      if (queryData.isPromotion) query.isPromotion = queryData.isPromotion;
      if (queryData.isRecommend) query.isRecommend = queryData.isRecommend;
      if (queryData.includeOOS) query.includeOOS = queryData.includeOOS;
      if (queryData.orderSelect) query.orderSelect = queryData.orderSelect;
      this.getProductListMsg(query)
    }
  }
  ,
  // 页面内加载反馈信息
  dealMessage: function (message, query) {
    this.getProductListMsg(query)
  },
  getProductListMsg(query) {
    productApi.getProductList(this, query, appconfig.pagesize, this.data.pageIndex, (result)=>{
      this.dealProductListMsg(result)
    })
  },
  dealProductListMsg: function (result) {
    //当下拉的时候pageIndex先更改为1,然后去查询数据,当查询数据成功时.如果pageIndex为1,就将获取到的数据直接赋值给productData, 如果页数大于1的话,就将请求的数据追加在productData后面.这样就实现分页加载的功能了
    var contentlistTem = this.data.productData;
    if (this.data.pageIndex==1){
      contentlistTem = []
    }
    var contentlist = result;
    if (contentlist.length < this.data.pageSize){
      this.setData({
        'productData': contentlistTem.concat(contentlist),
        'hasMoreData': false
      })
    } else {
      this.setData({
        'productData': contentlistTem.concat(contentlist),
        'hasMoreData': true,
        'pageIndex': this.data.pageIndex +1
      })
    }
    console.log(this.data.productData)
  },

  dealMergeObj: function (obj1, obj2, isSaveSameKey) {
    for (let key in obj2) {
      if(isSaveSameKey) {
        if (obj1.hasOwnProperty(key)) continue;
      }
      obj1[key] = obj2[key];
    }
    return obj1;
  },
  changeBigProduct: function (e) {
    this.setData({
      'showBigProductList':!e.detail.showBigProductList
    })
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
    wx.showNavigationBarLoading(); //在导航栏中显示加载
    this.setData({
      'pageIndex': 1
    })
    this.dealMessage('正在刷新数据...',this.data.queryData)
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.dealMessage('加载更多数据',this.data.queryData)
    } else {
      wx.showToast({
        title: '没有更多数据了'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
// pages/product/product.js
var productApi = require('../../utils/controller/product')
var appconfig = require('../../utils/appconfig')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showBigProductList: false,
    productData: [],
    loading: false, //处理是否显示无数据的动画
    pageIndex: 1,
    productDetailData: [],
    queryData: {},
    refresh: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options); //option 为首页点击更多传值过来的数据  为search组件传值过来的searchValue
    if (options.hasOwnProperty("keyWord")) {
      this.setData({
        'queryData': options
      })
    }
    if (options.hasOwnProperty("label")) {
      this.setData({
        'queryData': options
      })
    }
    this.setData({
      'pageIndex': 1
    })
    this.getProductListMsg(this.data.queryData, true)

    let queryArr = Object.keys(options);
    let queryDataArr = Object.keys(this.data.queryData);
    //初始参数与已经存在的参数个数相等且属性名相等
    if (queryArr.length>0&&queryArr.length==queryDataArr.length&&queryArr.join()==queryDataArr.join()){
        this.doInitPage(options, true)
    }
  },
  getProductListMsg(queryData, needLoader) {

    productApi.getProductList(this, queryData, appconfig.pagesize, this.data.pageIndex, needLoader, (result, pageCount)=>{
      this.dealProductListMsg(result, pageCount)
    })
  },
  dealProductListMsg: function (result, pageCount) {
    if (this.data.pageIndex==1) {
      this.setData({
        'productData': result
      })
    } else {
      for (var i=0;i<result.length;i++) {
        this.productData.push(result[i]);
      }
    }
    var pageIndex = this.data.pageIndex++;
    this.setData({
      'pageIndex': pageIndex
    })
  },
  // 排序字段 0 默认排序 1 销量 2 上架时间 3 价格升级 4 价格降序
  doInitPage: function (options) {
    if (options.detail) {
      let query = options.detail;
      let needLoader = query.needLoader;
      let orderSelect = query.isOrderSelect;
      if (orderSelect) {
        this.dealMergeObj(query, this.data.queryData, true);
        console.log(query)
        wx.navigateTo({
          url: '/pages/product/product?query='+query
        })
      } else {
        this.setData({
          'queryData': query,
          'pageIndex': 1
        })
        this.getProductListMsg(this.data.queryData, needLoader)
      }
    }
    if (options) {
      var query = options;
      console.log(query)
      // if (orderSelect) {
      //   this.dealMergeObj(query, this.data.queryData, true);
      //   console.log(query)
      // }
    }
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
    this.getProductListMsg(this.data.queryData, true);
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    },1500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('加载更多')
    this.getProductListMsg(this.data.queryData, true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
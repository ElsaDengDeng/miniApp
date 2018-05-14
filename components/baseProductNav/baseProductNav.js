// components/baseProductNav/baseProductNav.js
var productControls = require('../../utils/behaviors/product-behaviors')
Component({
  behaviors: [productControls],
  /**
   * 组件的属性列表
   */
  properties: {
    // showBigProductList: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    state: 0,
    priceSortClass: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    doChangeList: function () {
      this.data.showBigProductList=!this.data.showBigProductList
      this.setData({
        'showBigProductList':this.data.showBigProductList
      })
      var detail = {showBigProductList: this.data.showBigProductList}
      this.triggerEvent('change-big-product', detail)
    },
    clickChangeNav: function (e) {
      var state = e.currentTarget.dataset.state;
      if(this.data.state == state) {
        if (state == 3){
          var priceSortClass = !this.data.priceSortClass;
          this.setData({
            "priceSortClass": priceSortClass
          })
          console.log(this.data.priceSortClass)
          if(this.data.priceSortClass){
            this.doNavReq(3)
          } else {
            this.doNavReq(4)
          }
        }
      } else {
        this.setData({
          "state": state
        })
        if(!this.data.priceSortClass && state == 3) {
          state = 4;
        }
        this.doNavReq(state)
      }
    },
    doNavReq: function (id) {
      var detail = {orderSelect:id}
      this.triggerEvent('do-nav-req',detail)
    },
    clickGoProductScreen: function () {
      var queryData = this.data.queryData;
      var query = {};
      if (queryData.brandId) query.brandId = queryData.brandId;
      if (queryData.minPrice) query.minPrice = queryData.minPrice;
      if (queryData.maxPrice) query.classId = queryData.maxPrice;
      if (queryData.isSalesPromotion) query.isSalesPromotion = queryData.isSalesPromotion;
      if (queryData.isNew) {
        query.isNew = queryData.isNew;
        query.newsLabel = queryData.label;
      }
      if (queryData.isHot) {
        query.isHot = queryData.isHot;
        query.hotLabel = queryData.label;
      }
      if (queryData.isPromotion) {
        query.isPromotion = queryData.isPromotion;
        query.promotionLabel = queryData.label;
      }
      if (queryData.isRecommend) {
        query.isRecommend = queryData.isRecommend;
        query.recommendLabel = queryData.label;
      }
      if (queryData.includeOOS) query.includeOOS = queryData.includeOOS;
      wx.navigateTo({
        url: '/pages/product/productScreen/productScreen?query'
      })
    }
  }
})

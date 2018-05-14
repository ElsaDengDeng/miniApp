var scankit = require('../../utils/cordovascankit')
var lib = require('../../utils/util')
var storage = require('../../utils/storage')
var behaviorsControls = require('../../utils/behaviors/product-behaviors')
Component({
  behaviors: [behaviorsControls],
  /**
   * 组件的属性列表
   */
  properties: {
    showCart: {
      type: Boolean,
      value: false
    },
    showBack: {
      type: Boolean,
      value: false
    },
    showCategory: {
      type: Boolean,
      value: false
    },
    showScreen: {
      type: Object
    },
    isShowScreen: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenText: []
  },
  ready: function () {
    this.showScreen();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showScreen: function () {
      var obj = this.data.showScreen;
      if (obj){
        if (obj.label) {
          this.data.screenText.push(obj.label);
          this.dealPush();
        }
        if (obj.keyWord){
          this.data.screenText.push(obj.keyWord);
          this.dealPush();
        }
        if (obj.classId) {
          this.data.screenText.push(obj.className);
          this.dealPush()
        }
        if (obj.includeOOS == 0) {
          this.data.screenText.push('不显示缺货')
          this.dealPush()
        }
        if (obj.minPrice && !obj.maxPrice) {
          this.data.screenText.push(obj.minPrice);
          this.dealPush();
        } else if(obj.maxPrice && !obj.minPrice) {
          this.data.screenText.push(obj.maxPrice)
          this.dealPush();
        } else if(obj.minPrice && obj.maxPrice) {
          this.data.screenText.push(obj.minPrice+"-"+obj.maxPrice);
          this.dealPush()
        }

        if (obj.brandId && obj.brandId.indexOf(",")===-1) {
          this.data.screenText.push(obj.brandName);
          this.dealPush()
        } else if(obj.brandId && obj.brandId.indexOf(",")>-1) {
          if (typeof (obj.brandName) != "object") obj.brandName = obj.brandName.split(",");
          for (let i=0; i<obj.brandName.length; i++) {
            this.data.screenText.push(obj.brandName[i]);
            this.dealPush()
          }
        }
      }
    },
    //统一处理向screenText push的方法
    dealPush: function () {
      var screenText = this.data.screenText;
      this.setData({
        'screenText': screenText,
        'isShowScreen': true
      })
    },
    doScan: function () {
      scankit.scanCode(this.goSearchByKey)
    },
    goSearchByKey: function (key) {
      if (!lib.func.strIsNullOrEmpty(key)){
        var tkey = storage.setSearchHistoryData(key);
        wx.navigateTo({
          url: '/pages/product/product?includeOOS==1&keyWord='+tkey
        })
      }else {
        wx.showToast({
          title: '没有读取到数据',
          icon: 'none'
        })
      }
    },
    goBack: function () {
      wx.navigateBack({
        delta: 2
      })
    },
    showCategory: function () {
      wx.navigateTo({
        url: '/pages/product/productClass/productClass'
      })
    },
    wxSearchTab: function () {
      wx.navigateTo({
        url: '/pages/product/search/search'
      })
    },
    getTypeName: function (type) {
      switch (type) {
        case "isRecommend":
          var screenText = this.data.screenText.push("推荐");
          this.setData( {"screenText":screenText} )
          break;
        case "isPromotion":
          var screenText = this.data.screenText.push("促销");
          this.setData( {"screenText":screenText} )
          break;
        case "isNew":
          var screenText = this.data.screenText.push("新品");
          this.setData( {"screenText":screenText} )
          break;
        case "isHot":
          var screenText = this.data.screenText.push("热卖");
          this.setData( {"screenText":screenText} )
          break;
      }
    }
  }
})
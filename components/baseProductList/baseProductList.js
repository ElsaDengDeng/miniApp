// components/baseProductList/baseProductList.js
var storage = require('../../utils/storage');
var productControls = require('../../utils/behaviors/product-behaviors')
Component({
  behaviors: [productControls],
  /**
   * 组件的属性列表
   */
  properties: {
    marginTop: Number,
    listData: {
      type: Array,
      value: []
    },
    // showBigProductList: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgHeight: '',
    showStockQty: storage.getShowStockQty()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    clickProductList(e) {
      var id = e.currentTarget.id; //每个product对用的id
      wx.navigateTo({
        url: '/pages/product/productDetail/productDetail?id='+id
      })
    },
    clickBuyProduct(e) {
      var detail = {id:e.currentTarget.dataset.id,skuId:e.currentTarget.dataset.skuId}
      this.triggerEvent('get-product-detail-msg', detail)
    }
  }
})

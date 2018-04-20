// components/baseProductList/baseProductList.js
var storage = require('../../utils/storage');
var behaviorsControls = require('../../utils/behaviors/product-behaviors')
Component({
  behaviors: [behaviorsControls],
  /**
   * 组件的属性列表
   */
  properties: {
    marginTop: Number,
    // showBigProductList: Boolean,
    listData: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgHeight: '',
    showStockQty: storage.getShowStockQty()
  },
  ready:function () {
    console.log(this.data.showBigProductList)
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
    clickBuyProduct(id, skuId) {

    },
    binddata(e) {
      console.log(e)
    },
    onTap: function(){
      // var myEventDetail = {} // detail对象，提供给事件监听函数
      // var myEventOption = {} // 触发事件的选项
      // this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})

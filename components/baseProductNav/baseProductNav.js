// components/baseProductNav/baseProductNav.js
var behaviorsControls = require('../../utils/behaviors/product-behaviors')
Component({
  behaviors: [behaviorsControls],
  /**
   * 组件的属性列表
   */
  properties: {
    // showBigProductList: Boolean, //抽出为behaviors公共属性
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
        this.triggerEvent('changeBigProduct', detail)
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
      this.triggerEvent('doNavReq',detail)
    },
    clickGoProductScreen: function () {
      console.log(this.data.query)
    }
  }
})

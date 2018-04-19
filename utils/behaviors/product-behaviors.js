module.exports = Behavior({
  behaviors: [],
  properties: {
    myBehaviorProperty: {
      type: String
    },
    showBigProductList: {
      type: Boolean
    },
    //product的组件 header,nav,productList共享从product onLoad(options)的数据
    queryData: {
      type: Object
    }
  },
  data: {
    myBehaviorData: {}
  },
  attached: function () { },
  methods: {
    myBehaviorMethod: function () { },
    showBigProductList: function () {
      if (this.data.showBigProductList) {
        this.setData({
          "showBigProductList": false
        })
      } else {
        this.setData({
          "showBigProductList": true
        })
      }
    },
  }
})
module.exports = Behavior({
  behaviors: [],
  properties: {
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

  }
})
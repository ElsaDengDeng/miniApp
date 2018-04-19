// components/baseHeader/baseHeader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    canBack: Boolean,
    rightShow: Boolean,
    rightMsg: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onBack: function () {
      wx.navigateBack({
        delta: 2
      })
    },
    onRightClick: function () {
      this.triggerEvent('onRightClick');  //触发引用该组件父组件的方法
    }
  }
})

// pages/login/login.js
const appconfig = require('../../utils/appconfig')
const lib = require('../../utils/util')
const loginAction = require('../../utils/controller/login')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: appconfig.app.appname,
    subTitle: appconfig.app.subtitle,
    userName: 'dxm003',
    password: 'dxm003',
    isAutoLogin: false,
    bindToWx: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindusername: function (e) {
    this.setData({
      'userName': e.detail.value
    })
  },
  bindpassword: function (e) {
    this.setData({
      'password': e.detail.value
    })
  },
  doLogin: function (e) {
    if (lib.func.strIsNullOrEmpty(this.data.userName)) {
      wx.showToast({
        title: '请输入登录账号'
      })
      return
    }
    if (lib.func.strIsNullOrEmpty(this.data.password)) {
      wx.showToast({
        title: '请输入登录密码'
      })
      return
    }
    var reg = /^\w+$/;
    if (!reg.test(this.data.userName)) {
      wx.showToast({
        title: '登录账号只能是字母、数字或下划线'
      })
      return
    }
    loginAction.doPassAuth(this, this.data.bindToWx, app)
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
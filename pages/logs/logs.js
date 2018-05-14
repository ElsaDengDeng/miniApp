const appconfig = require('../../utils/appconfig.js');
const lib = require('../../utils/util');
const loginAction = require('../../utils/controller/login.js');

var vm = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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


// Page({
//   data: {
//     title: appconfig.app.appname,
//     subtitle: appconfig.app.subtitle,
//     userName: "",
//     password: "",
//     isAutoLogin: false,
//     bindToWx: true
//   },
//
//   onLoad: function (ret) {
//     vm = this;
//     console.log(ret);
//     loginAction.doAutoLogin(vm, ()=>{
//       this.setData({
//         'isAutoLogin': true
//       })
//     })
//   },
//   bindloginname: function(event) {
//     console.log(event)
//     vm.setData({
//         "userName": event.detail.value
//     });
//   },
//   bindpassword: function(event) {
//     vm.setData({
//       "password" : event.detail.value
//     });
//   },
//
//   //登录验证
//   doLogin: function() {
//     if (lib.func.strIsNullOrEmpty(vm.data.userName)) {
//       wx.showToast({
//         title: '请输入登录账号',
//       });
//       return;
//     }
//     if(lib.func.strIsNullOrEmpty(vm.data.password)) {
//       wx.showToast({
//         title: '请输入登录密码',
//       });
//       return;
//     }
//     var reg = /^\w+$/;
//     if(!reg.test(vm.data.userName)){
//       wx.showToast({
//         title: '登录账号只能是字母、数字或下划线'
//       });
//       return;
//     }
//     loginAction.doPassAuth(vm, vm.data.bindToWx);
//   },
// })

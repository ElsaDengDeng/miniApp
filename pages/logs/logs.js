const loginApi  = require('../../utils/apipath.js');
const config = loginApi.getApiConfig();
const appconfig = require('../../utils/appconfig.js');
const lib = require('../../utils/util');
const loginAction = require('../../utils/controller/login.js');


var vm = null;

Page({
  data: {
    title: appconfig.app.appname,
    subtitle: appconfig.app.subtitle,
    userName: "",
    password: "",
    isAutoLogin: false,
    bindToWx: true
  },

  onLoad: function (ret) {
    vm = this;
    console.log(ret);
    loginAction.doAutoLogin(vm, ()=>{
      vm.isAutoLogin = true;
    })
  },
  bindloginname: function(event) {
    vm.setData({
        "userName": event.detail.value
    });
  },
  bindpassword: function(event) {
    vm.setData({
      "password" : event.detail.value
    });
  },

  //登录验证
  doLogin: function() {
    if (lib.func.strIsNullOrEmpty(vm.data.userName)) {
      wx.showToast({
        title: '请输入登录账号',
      });
      return;
    }
    if(lib.func.strIsNullOrEmpty(vm.data.password)) {
      wx.showToast({
        title: '请输入登录密码',
      });
      return;
    }
    var reg = /^\w+$/;
    if(!reg.test(vm.data.userName)){
      wx.showToast({
        title: '登录账号只能是字母、数字或下划线'
      });
      return;
    }
    loginAction.doPassAuth(vm, vm.data.bindToWx);
  },
})

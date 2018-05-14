const lib = require('../util');
const appconfig = require('../appconfig');
const loginApi = require('../apipath')
const accountMethod  = require('./account')
const system = require('../system')

function doAutoLogin(vm, autoLoginCallback) {
  var wxOpenId = lib.auth.getWXOpenID();
  if(lib.auth.checkIsAuthed()){
    //演示账套,自动退出
    const lname = lib.auth.getLoginName();
    if (appconfig.demoAccounts.indexOf(lname) != -1) {
      lib.auth.signOut()
    };
    this.toBackUrl(vm)
  } else {
    this.doWXAuth(vm, autoLoginCallback)
  }
}

function doWXAuth(vm, autoLoginCallback) {
  //获取微信授权
  var wxOpenId = lib.auth.getWXOpenID();
  if (lib.func.strIsNullOrEmpty(wxOpenId)) {
    autoLoginCallback();
    var getcode = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appconfig.wx.appid + "&redirect_uri=" + appconfig.wx.redirect_uri +
      "&response_type=code&scope=snsapi_base&state=" + appconfig.wx.state + "#wechat_redirect";
    wx.redirectTo({
      url: 'getcode'
    })
  }
}

function doPassAuth(vm, bindToWx, app) {
 if (lib.auth.checkIsAuthed()) {
   this.toBackUrl(vm);
 } else {
   var lname = vm.data.userName;
   var lpass = vm.data.password;
   var _this = this;
   lib.http.postWidthPreloader(vm, loginApi.getApiConfig().login, {
     userName: lname,
     password: lpass
   }, function (response) {
     lib.auth.setAuthToken(response.data.token);
     lib.auth.setProfileID(response.data.profileId);
     lib.auth.setLoginName(lname);
     system.getGlobalInfo(vm, app);
     if (bindToWx && appconfig.demoAccounts.indexOf(lname) == -1) {
       var resOpenId = response.data.openId;
       var authOpenId = lib.auth.getWXOpenID();
       _this.bindToWx(vm, resOpenId, authOpenId);
     } else {
       _this.toBackUrl(vm);
     }
   }, null, "正在登录");
 }
}

function bindToWx(vm, resOpenId, authOpenId) {
  let _this=this
  if(lib.func.strIsNullOrEmpty(resOpenId) && !lib.func.strIsNullOrEmpty(authOpenId)) {
    accountMethod.doBindWX(vm, authOpenId, (res)=>{
      _this.toBackUrl(vm);
    }, ()=>{
      _this.toBackUrl(vm)
    })
  } else {
    _this.toBackUrl(vm)
  }
}

function toBackUrl(vm) {
  var url  = lib.auth.getBackURL();
  lib.auth.setBackURL('');
  if(lib.func.strIsNullOrEmpty(url)) {
    wx.switchTab({
      url: '/pages/index/index',
    })
  } else {
    wx.navigateBack({
      delta: 2
    })
  }
}

module.exports = {
  doAutoLogin: doAutoLogin,
  doWXAuth: doWXAuth,
  doPassAuth: doPassAuth,
  bindToWx: bindToWx,
  toBackUrl:toBackUrl
}
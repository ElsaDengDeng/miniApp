//app.js
var storage = require('./utils/authstorage')
var system = require('./utils/system')
App({
  onLaunch: function () {
    Object.defineProperty(Array.prototype,'filter',{
      writable:true,
      configurable:true,
      enumerable:false,
      value:function(){
        var arr=this
        var fn=arguments[0]
        var laterArr=[]
        for(var i=0;i<arr.length;i++){
          var item=arr[i]
          fn.call(this,item,i)?laterArr.push(item):''
        }
        return laterArr
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //判断自动登录
    if (!storage.checkIsAuthed()) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }else {
      var vm=this
      system.loadGlobalInfo(this,function(vm){
        wx.setTabBarBadge({
          'index': 1,
          text: vm.globalData.cartCount.toString()
        })
      })
    }
  },
  globalData: {
    userInfo: null,
    isFirstIn: true,
    messageCount: 0,
    cartCount: 0,
    cartItemData: []
  }
})
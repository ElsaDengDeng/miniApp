const lib = require('./util')
const storage = require('./storage')
const systemApi = require('./apipath')

// var appInstance = this.getApp()
// console.log(appInstance)
// var isFirstIn = app.globalData.system.isFirstIn;
// var messageCount = app.globalData.system.messageCount;

function getGlobalInfo(vm, app,success) {
  lib.http.post(vm, systemApi.getApiConfig().getGlobalInfo, {}, (result)=>{
    storage.setShowStockQty(result.data.showStockQty);
    storage.setAllowExceedStock(result.data.allowExceedStock);
    var mallname = result.data.mallName;
    var barTitle = lib.func.strIsNullOrEmpty(mallname) ? '章鱼侠云订货':mallname;
    wx.setNavigationBarTitle({
      title: barTitle
    })
    if (app.globalData.isFirstIn) {
      app.globalData.isFirstIn = false;
    }
    app.globalData.messageCount = result.data.messageCount;
    app.globalData.cartCount=result.data.cartCount;
    success(app)
    // console.log(app.globalData.cartCount)
  })
}
function loadGlobalInfo(app,success) {
  this.getGlobalInfo('',app,success);
}
module.exports = {
  getGlobalInfo: getGlobalInfo,
  loadGlobalInfo: loadGlobalInfo
}

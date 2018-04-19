const systemApi = require('../apipath')
const storage = require('../storage')
const lib = require('../util')

function getGlobalInfo(sender) {
  lib.http.post(sender, systemApi.getApiConfig().getGlobalInfo, {}, (result) => {
    storage.setShowStockQty(result.data.showStockQty);
    storage.setAllowExceedStock(result.data.allowExceedStock);
    var mallname = result.data.mallName;
    lib.func.strIsNullOrEmpty(mallname) ? '章鱼侠云订货' : mallname;
  } )
}

module.exports = {
  getGlobalInfo: getGlobalInfo
}
// 以下是本地存储当前的用户信息

const func = require('./functionutils')
const auth = require('./authstorage')

function isFirstIn() {
  var isFirstIn = auth.getStorageSync("isFirstIn");
  if (func.strIsNullOrEmpty(isFirstIn)) {
    return true;
  }
  return isFirstIn === 'true'
}

function setFirstIn(value) {
  this.auth.setStorageSync("isFirstIn", value);
}

function isShowStockQty() {
  var showStockQty = auth.getStorageSync("showStockQty");
  if (func.strIsNullOrEmpty(showStockQty)) {
    return false;
  }
  return showStockQty = true;
}

function getShowStockQty() {
  return auth.getStorageSync("showStockQty");
}

function setShowStockQty(value) {
  auth.setStorageSync("showStockQty", value);
}

function isAllowExceedStock() {
  var allowExceedStock = auth.getStorageSync("allowExceedStock");
  return allowExceedStock
}

function setAllowExceedStock(value) {
  auth.setStorageSync("allowExceedStock", value);
}

function getSearchHistoryData() {
  let searchHistory = [];
  let value = wx.getStorageSync('searchHistory')
  if(value) {
    searchHistory = value.split(',');
  }
  return searchHistory;
  //返回数组格式的搜索历史
  console.log(searchHistory);
}
function setSearchHistoryData(val, _searchHistoryData) {
  let searchHistoryData = _searchHistoryData;
  if(!_searchHistoryData) {
    searchHistoryData = this.getSearchHistoryData();
  }
  let dealVal = func.trim(val);
  if (dealVal) {
    if(searchHistoryData.toString().indexOf(dealVal) > -1) {
      for (let i = 0; i< searchHistoryData.length; i++) {
        if (searchHistoryData[i] == dealVal) {
          searchHistoryData.splice(i, 1);
        }
      }
    }
    searchHistoryData.unshift(dealVal);
    wx.setStorageSync('searchHistory', searchHistoryData);
  }
  //返回经过处理的搜索值
  console.log(val)
  return val;
}
module.exports = {
  isFirstIn: isFirstIn,
  setFirstIn: setFirstIn,
  isShowStockQty: isShowStockQty,
  getShowStockQty: getShowStockQty,
  setShowStockQty: setShowStockQty,
  isAllowExceedStock: isAllowExceedStock,
  setAllowExceedStock: setAllowExceedStock,
  getSearchHistoryData: getSearchHistoryData,
  setSearchHistoryData: setSearchHistoryData

}




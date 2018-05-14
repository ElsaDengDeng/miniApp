var lib = require('../../utils/util')
var func = require('../../utils/functionutils')
var storage = require('../../utils/storage')
var cartApi = require('../../utils/apipath')

// function getCartProducts(sender, callback) {
//   lib.http.postWidthPreloader(sender, cartApi.getApiConfig().getCartProductList, {}, (response) =>{
//     if (callback != undefined) {
//       callback()
//     }
//   })
// }
function showToast(value) {
  wx.showToast({
    title: value,
    icon: 'none'
  })
}
function  addToCart(vm, app, products, callback) {
  lib.http.postWidthPreloader(vm, cartApi.getApiConfig().addCart, {
    detailData: JSON.stringify(products)
  }, (response) => {
    this.dealAddToCart(vm, app, products);
    if (callback == undefined)
      this.showToast('加入购物车成功')
    else
      callback(response)
  }, null, '正在提交')
}
function dealAddToCart(vm, app, data) {
  var count = app.globalData.cartCount;
  var products = app.globalData.cartItemData;
  var c=app.globalData.test

  c=2
  for (var i=0; i<data.length; i++) {
    var item = data[i];
    var record = products.filter(function (p) {
      return p.ptypeId===item.ptypeId && p.skuId===item.skuId && p.unitId===item.unitId
    })
    if (record.length == 0) {
      products.push({
        ptypeId: item.ptypeId,
        skuId: item.skuId,
        unitId: item.unitId,
        qty: item.qty,
        unit: item.unit,
        code: item.code,
        fullName: item.fullName,
        properties: item.properties,
        discountPrice: item.discountPrice,
        picUrl: item.picUrl,
        isBaseUnit: item.isBaseUnit,
        baseUnit: item.baseUnit,
        rate: item.rate,
        stockQty: item.stockQty,
        price: 0.0,
        discount: 0.0,
        minQty: 0.0,
        isDisplay: true
      });
    } else {
      record[0].qty = func.add(record[0].qty, item.qty);
    }
    count = func.add(count, item.qty)
  }
  console.log(app.globalData.test)
  app.globalData.cartCount=count
  wx.setTabBarBadge({
    'index': 1,
    text: app.globalData.cartCount.toString()
  })
}
module.exports = {
  showToast: showToast,
  addToCart: addToCart,
  dealAddToCart: dealAddToCart
}
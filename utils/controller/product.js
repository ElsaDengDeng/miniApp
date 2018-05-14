const lib = require('../../utils/util')
const productApi = require('../../utils/apipath')
const storage= require('../../utils/storage')
const config = require('../../utils/appconfig')
const picUrl = '../../static/img/default.png';

function getBannerNotice(sender, data, callback, failback, bizError) {
  lib.http.post(sender, productApi.getApiConfig().bannerNotice, data, (result) => {
    if(result.banner.length === 0) {
      result.banner[0]={}
      result.banner[1]={}
      result.banner[0].picPath = require('../../static/img/index_banner_1.jpg');
      result.banner[1].picPath = require('../../static/img/index_banner_2.jpg');
      result.banner[0].mobileUrl ='javascript:void(0)'
      result.banner[1].mobileUrl ='javascript:void(0)'
    } else {
      for (let i=0; i<result.banner.length; i++) {
        result.banner[i].mobileUrl=result.banner[i].mobileUrl?
          result.banner[i].mobileUrl:'javascript:void(0)'
      }
    }
    for(let i = 0; i<result.notice.length; i++) {
      result.notice[i].marginTop = 0;
    }
    callback(result);
  }, (result) => {
    failback(result.status + result.statusText);
  }, (result) => {
    wx.hideToast()
  });
}

// 处理库存显示方式公用
function howToShowStockQty(msg) {
  for (let i = 0; i < msg.length; i++) {
    if (storage.getShowStockQty()==1) {
      msg[i].unit ? msg[i].howToShowStockQty = +msg[i].stockQty + msg[i].unit : msg[i].howToShowStockQty =   msg[i].stockQty;
    } else if(storage.getShowStockQty()==2) {
      msg[i].stockQty > 0 ? msg[i].howToShowStockQty = "有货" : msg[i].howToShowStockQty = "无货";
    }else{
      msg[i].howToShowStockQty=''
    }
  }
  return msg;
}

//单属性库存显示单独处理
function noMultiPropShowStockQty(stockQty, unit) {
  if (storage.getShowStockQty()==1) {
    return stockQty + unit;
  } else if(storage.getShowStockQty()==2) {
    return stockQty > 0 ? "有货" : "无货";
  }else{
    return ''
  }
}

 //商品列表lazyload处理
function dealNullImg(msg) {
  for (let i = 0; i < msg.length; i++) {
    if (!msg[i].picUrl) {
      msg[i].picUrl = picUrl;
    }
  }
}
//首页商品列表
function getIndexProductList(sender, data, callback, failback, bizError) {
  lib.http.post(sender, productApi.getApiConfig().productlist, data, (result) => {
    let msg = this.howToShowStockQty(result.data);
    // this.dealNullImg(msg);
    for(var i=0; i<msg.length; i++){
      if (msg[i].picUrl == '' || msg[i].picUrl == undefined) {
        msg[i].picUrl = picUrl;
      }
    }
    console.log(msg);
    callback(msg);
  }, (result) => {
    failback(result.status + result.statusText);
  }, (result) => {
    wx.hideToast();
  });
}
//商品列表
function getProductList(sender, data, pageSize, pageIndex, callback) {
  let initData = {};
  if (data) {
    if (data.classId) initData.classId = data.classId;
    if (data.isSalesPromotion) initData.isSalesPromotion = parseInt(data.isSalesPromotion);
    if (data.isNew) initData.isNew = parseInt(data.isNew);
    if (data.isHot) initData.isHot = parseInt(data.isHot);
    if (data.isPromotion) initData.isPromotion = parseInt(data.isPromotion);
    if (data.isRecommend) initData.isRecommend = parseInt(data.isRecommend);
    if (data.keyWord) initData.keyWord = data.keyWord;
    if (data.brandId) initData.brandId = data.brandId;
    if (data.minPrice) initData.minPrice = data.minPrice;
    if (data.maxPrice) initData.maxPrice = data.maxPrice;
    if (data.includeOOS) initData.includeOOS = data.includeOOS;
    if (data.orderSelect) initData.orderSelect = parseInt(data.orderSelect);
  }
  initData.pageSize = pageSize;
  initData.pageIndex = pageIndex;
  lib.http.post(sender, productApi.getApiConfig().productlist, initData, (result) => {
    let msg = this.howToShowStockQty(result.data);
    this.dealNullImg(msg);
    callback(msg);
  }, null, null, true);
}
// 获取组合促销data
function getCombinePromotion(sender, callback) {
  lib.http.post(sender, productApi.getApiConfig().getCombinePromotion, {promotionId:sender.$data.promotionId}, (result) => {
    callback(result.data);
  },'','',true)
}
//商品详情
function getProductDetail(sender, data, callback, skuId) {
  lib.http.postWidthPreloader(sender, productApi.getApiConfig().productdetail, data, (result) => {
    let msg = result.data;
    msg.howToShowStockQty = this.noMultiPropShowStockQty(msg.stockQty, msg.unit);
    msg.skus = this.howToShowStockQty(msg.skus);

    let arr = [];
    let typeArr = [];
    msg.batchData = [];
    msg.batchType = [];
    //如果允许超库存isAllowExceedStock，则总库存设置为skus之和
    msg.initStockQty = msg.stockQty;
    if (storage.isAllowExceedStock()) {
      if (!msg.isMultiProp) {
        msg.stockQty = config.maxmunber;
      } else {
        msg.stockQty = msg.skus.length * config.maxmunber;
      }
    }
    //如果skuid为0,订过商品单属性设置默认购买数量为1
    if (skuId == 0 && !msg.isMultiProp && msg.stockQty > 0) {
      msg.setNoMultiPropUserInput = true;
      console.log(msg)
    }

    if(msg.skus.length>=1){
      if(!msg.skus[0].propName2){
        msg.hasPropNameTwo=false
      }else{
        msg.hasPropNameTwo=true
      }
    }

    for (let i = 0; i < msg.skus.length; i++) {
      msg.skus[i].isShow = false;
      msg.skus[i].userInput = 0;
      msg.skus[i].initStockQty = msg.skus[i].stockQty;
      //如果允许超库存isAllowExceedStock，则所有sku库存设置为最大值
      if (storage.isAllowExceedStock()) {
        msg.skus[i].stockQty = config.maxmunber;
      }
      //如果有skuid，默认该属性起始购买数量为1
      if (skuId && skuId == msg.skus[i].skuId && msg.skus[i].stockQty > 0){
        msg.skus[i].userInput = 1;
      }
      if (arr.indexOf(msg.skus[i].propName1) === -1) {
        arr.push(msg.skus[i].propName1);
        typeArr.push({
          propName1: msg.skus[i].propName1
        });
      }
    }
    let hasActive = false;
    for (let i = 0; i < typeArr.length; i++) {
      typeArr[i].active = false;

      if(i==0){
        typeArr[0].active=true
      }

      typeArr[i].isEnough = false;
      for (let j = 0; j < msg.skus.length; j++) {
        if (typeArr[i].propName1 != msg.skus[j].propName1) {
          continue;
        }
        //如果有skuid，默认该属性的颜色默认选中
        if (skuId && skuId == msg.skus[j].skuId){
          typeArr[0].active=false
          typeArr[i].active = true;
        }
        if (msg.skus[j].stockQty > 0) {
          typeArr[i].isEnough = true;
          if (!skuId) break;
        }
      }
      if (skuId && typeArr[i].active) {
        msg.noBatchType = typeArr[i].propName1;
        hasActive = true;
      }
      if (!skuId && typeArr[i].isEnough && !hasActive) {
        if(i<1){
          typeArr[i].active = true;
        }
        msg.noBatchType = typeArr[i].propName1;
        hasActive = true;
      }
    }
    for (let i = 0; i < typeArr.length; i++) {
      for (let j = 0; j < msg.skus.length; j++) {
        if (typeArr[i].active) {
          if (typeArr[i].propName1 == msg.skus[j].propName1) {
            msg.skus[j].isShow = true;
          }
        }
      }
    }
    msg.isBatchChoose = false;
    msg.noRepeatTypeArray = typeArr;

    if (msg.picData.length === 0) {
      msg.picData[0] = "../../../static/img/default.png";
    }
    if (!msg.picUrl) {
      msg.picUrl = picUrl;
    }

    msg.initUnitBase = msg.units.filter(function(unit) {
      return unit.isBase === true;
    })[0];

    var stockOutArray = msg.units.filter(function(unit) {
      return unit.isStockOut === true&&unit.isEnable===true;
    });

    if(stockOutArray.length > 0){
      msg.selectedUnitName = stockOutArray[0].unitName;
      msg.selectedUnitId = stockOutArray[0].unitId
      msg.marketPrice = stockOutArray[0].marketPrice;
      msg.tradePrice = stockOutArray[0].tradePrice;
    }else{
      msg.selectedUnitName = msg.initUnitBase.unitName;
      msg.selectedUnitId = msg.initUnitBase.unitId;
      msg.marketPrice = msg.initUnitBase.marketPrice;
      msg.tradePrice = msg.initUnitBase.tradePrice;
    }

    callback(msg);
  });
}
function getAddBrowsingRecord(sender, data) {
  lib.http.post(sender, productApi.getApiConfig().addBrowsingRecord, data, (result) => {});
}
//关联商品
function getRelevanceProduct(sender, data, callback) {
  lib.http.post(sender, productApi.getApiConfig().relevanceproduct, data, (result) => {
    this.howToShowStockQty(result.data);
    var msg = result.data;
    for(var i=0; i<msg.length; i++){
      if (msg[i].picUrl == '' || msg[i].picUrl == undefined) {
        msg[i].picUrl = "../../../static/img/default.png";
      }
    }
    callback(result);
  });
}
//收藏商品
function getFavorite(sender, data, callback) {
  lib.http.postWidthPreloader(sender, productApi.getApiConfig().favorite, data, (result) => {
    callback(result);
  });
}
//取消收藏商品
function getCancelFavorite(sender, data, callback) {
  lib.http.postWidthPreloader(sender, productApi.getApiConfig().cancelfavorite, data, (result) => {
    callback(result);
  });
}
//商品分类一级
function getFirstLevelClass(sender, data, callback) {
  lib.http.postWidthPreloader(sender, productApi.getApiConfig().firstLevelClass, data, (result) => {
    if (result.data.length !== 0) {
      for (let i = 0; i < result.data.length; i++) {
        if (i === 0) {
          result.data[i].active = true;
        } else {
          result.data[i].active = false;
        }
      }
    }
    callback(result.data);
  });
}
//商品分类二三级
function getOtherLevelClass(sender, data, callback) {
  lib.http.post(sender, productApi.getApiConfig().otherLevelClass, data, (result) => {
    callback(result.data);
  });
}
function getBrandList(sender, data, callback) {
  lib.http.post(sender, productApi.getApiConfig().brandList, data, (result) => {
    let arr = [];
    arr[0] = {
      isHot: 1,
      text: result.goodsLabel.hotLabel,
      active: false,
    };
    arr[1] = {
      isNew: 1,
      text: result.goodsLabel.newsLabel,
      active: false,
    };
    arr[2] = {
      isPromotion: 1,
      text: result.goodsLabel.promotionLabel,
      active: false,
    };
    arr[3] = {
      isRecommend: 1,
      text: result.goodsLabel.recommendLabel,
      active: false,
    };
    result.goodsLabel = arr;
    for (let i = 0; i < result.data.length; i++) {
      result.data[i].active = false;
    }
    callback(result);
  });
}

module.exports = {
  getBannerNotice: getBannerNotice,
  howToShowStockQty: howToShowStockQty,
  noMultiPropShowStockQty: noMultiPropShowStockQty,
  dealNullImg: dealNullImg,
  getIndexProductList: getIndexProductList,
  getProductList: getProductList,
  getCombinePromotion: getCombinePromotion,
  getProductDetail: getProductDetail,
  getAddBrowsingRecord: getAddBrowsingRecord,
  getRelevanceProduct: getRelevanceProduct,
  getFavorite: getFavorite,
  getCancelFavorite: getCancelFavorite,
  getFirstLevelClass: getFirstLevelClass,
  getOtherLevelClass: getOtherLevelClass,
  getBrandList: getBrandList
}
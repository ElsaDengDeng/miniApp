// components/productDetailPopup/productDetailPopup.js
var storage = require('../../utils/storage')
var func = require('../../utils/functionutils')
var productApi = require('../../utils/controller/product')
var cartApi = require('../../utils/controller/cart')
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    flag: Number,
    productDetailData: Object,
    skusAll: Object,
    promotions: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    computedUnitRate: 0, //单位换算率
    unitRateMarketPrice: 0, //单位对应的市场价
    unitRateTradePrice: 0, //单位对应的批发价
    totalClass: 0,
    totalNum: 0,
    totalPrice: 0,
    userInput: 0,
    showStockQty: storage.isShowStockQty(),
    isAllowExceedStock: storage.isAllowExceedStock()
  },

  /**
   * 组件的方法列表
   */
  attached: function () {
    this.setData({
      'userInput': 1
    })
    this.computedNum()
    console.log(this.data.userInput)
    this.unitRateChangePrice()
    if (this.data.productDetailData.setNoMultiPropUserInput)
      this.setData({
        'userInput': 1
      })
  },
  methods: {
    closePopup: function () {
      this.triggerEvent('close-popup')
    },
    changeUnit: function (e) {
      console.log(e)
      var selectedUnitId = e.currentTarget.dataset.unit.unitId;
      var selectedUnitName = e.currentTarget.dataset.unit.unitName;
      this.setData({
        'productDetailData.selectedUnitId': selectedUnitId,
        'productDetailData.selectedUnitName': selectedUnitName
      })
      this.unitRateChangePrice()
    },
    unitRateChangePrice: function () {
      // 支持不同单位对应不同价格
      let obj = this.data.productDetailData;
      if (!obj.selectedUnitName) {
        return
      }
      for (let i=0; i<obj.units.length; i++) {
        if (obj.units[i].unitId == obj.selectedUnitId) {
          this.setData({
            'computedUnitRate': obj.units[i].rate,
            'unitRateMarketPrice': obj.units[i].marketPrice,
            'unitRateTradePrice': obj.units[i].tradePrice
          })
        }
      }

    },
    clickBatchBtn: function () {
      // 如果非整批整批点击默认初始化,则去掉isPerform条件即可
      let obj = this.data.productDetailData;
      let isPerform = false;
      obj.isBatchChoose = !obj.isBatchChoose;
      obj.batchType.splice(0, obj.batchType.length); //不管整批非整批都先清空整批选中属性
      this.setData({
        'productDetailData': obj
      })
      for (let i=0; i<obj.noRepeatTypeArray.length; i++) {
        //模拟点击第一个 已经存在的属性1,并且将选中的属性置于batchType中
        if (obj.noRepeatTypeArray[i].active) {
          isPerform = true;
          obj.noRepeatTypeArray[i].active = true;
          obj.batchType.push(obj.noRepeatTypeArray[i].propName1)
          this.dealBatchData(obj)
        }
      }
      if (!isPerform) {
        //如果当前整批且一个都没选中,则isPerform为false, 模拟初始化选中第一个库存足够的属性1
        for (let i=0; i<obj.noRepeatTypeArray.length; i++) {
          if (obj.noRepeatTypeArray[i].isEnough) {
            obj.noRepeatTypeArray[i].active = true;
            obj.batchType.push(obj.noRepeatTypeArray[i].propName1)
            this.dealBatchData(obj)
            break;
          }
        }
      }
      this.setData({
        'productDetailData': obj
      })
      console.log(this.data.productDetailData.batchType)
      console.log(isPerform)
    },
    clickChangeProp1: function (e) {
      console.log(e)
      let obj = this.data.productDetailData;
      if (obj.isBatchChoose) {
        // 处理active状态
        this.dealBatchActive(e)
      } else {
        this.dealNoBatchSelected(e)
      }
    },
    dealNoBatchSelected: function (e) {
      let type = e.currentTarget.dataset.type;
      let index = e.currentTarget.dataset.index;
      let obj = this.data.productDetailData;

      for (let i=0; i<obj.noRepeatTypeArray.length; i++) {
        if (i == index) {
          obj.noRepeatTypeArray[i].active = true;
          obj.noBatchType = type.propName1;
        } else {
          obj.noRepeatTypeArray[i].active = false
        }
      }
      for (let i=0; i<obj.skus.length; i++) {
        if (obj.skus[i].propName1 == type.propName1) {
          obj.skus[i].isShow = true;
        } else {
          obj.skus[i].isShow = false;
        }
      }
      this.setData({
        productDetailData:obj
      })
      this.computedNum()
    },
    dealBatchActive: function (e) {
      let type = e.currentTarget.dataset.type;
      let index = e.currentTarget.dataset.index;
      let obj = this.data.productDetailData;

      obj.noRepeatTypeArray[index].active = !obj.noRepeatTypeArray[index].active;
      if (obj.noRepeatTypeArray[index].active) {
        obj.batchType.push(type.propName1);
      }else{
        for (let i=0; i<obj.batchType.length; i++) {
          if (obj.batchType[i] == type.propName1) {
            obj.batchType.splice(i, 1);
            break;
          }
        }
      }
      this.setData({
        'productDetailData': obj
      })
      console.log(this.data.productDetailData.batchType)
      // 处理数组数据
      this.dealBatchData(obj);
      this.computedNum()
    },
    dealBatchData: function (obj) {
      obj.batchData.splice(0, obj.batchData.length);
      let propName2Arr = [];
      if (obj.batchType.length==1) {
        for (let i=0; i<obj.skus.length; i++) {
          if (obj.skus[i].propName1 == obj.batchType[0]) {
            this.addToBatchData(obj, obj.skus[i]);
          }
        }
      } else if(obj.batchType.length > 1) {
        for (let i=0; i<obj.skus.length; i++) {
          for (let j=0; j<obj.batchType.length; j++) {
            let isHave = propName2Arr.indexOf(obj.skus[i].propName2);
            if (obj.skus[i].propName1 == obj.batchType[j] && isHave==-1) {
              propName2Arr.push(obj.skus[i].propName2);
              this.addToBatchData(obj, obj.skus[i]);
            } else if(obj.skus[i].propName1 == obj.batchType[j] && isHave != -1) {
              if (obj.batchData[isHave].stockQty > obj.skus[i].stockQty) {
                obj.batchData[isHave].stockQty = obj.skus[i].stockQty;
              }
              obj.batchData[isHave].isAllHave = obj.batchData[isHave].isAllHave + 1;
              obj.batchData[isHave].skuId.push(obj.skus[i].skuId);
              obj.batchData[isHave].code.push(obj.skus[i].code);
              obj.batchData[isHave].initStockQty.push(obj.skus[i].initStockQty);
            }
          }
        }
      }
      this.setData({
        'productDetailData': obj
      })
    },
    addToBatchData: function (obj, item) {
      obj.batchData.push({
        propName1: item.propName1,
        propName2: item.propName2,
        stockQty: item.stockQty,
        isAllHave: 1,
        active: false,
        skuId: [item.skuId],
        code: [item.code],
        initStockQty: [item.initStockQty]
      })
    },
    clickSize: function (e) {
      let index = e.currentTarget.dataset.index;
      let obj = this.data.productDetailData;
      if (obj.batchData[index].stockQty>0 && obj.batchData[index].isAllHave==obj.batchType.length) {
        obj.batchData[index].active = !obj.batchData[index].active
      }
      this.setData({
        'productDetailData': obj
      })
      this.computedNum()
    },
    clickInventoryNum: function (e) {
      console.log(e)
      var num = parseFloat(e.currentTarget.dataset.userInput)
      if (e.currentTarget.dataset.type == "add") {
        this.setData({
          'userInput': func.add(num, 1)
        })
      } else {
        if (this.data.userInput < 1){
          return
        }
        this.setData({
          'userInput': func.sub(num, 1)
        })
      }
      this.computedNum()
    },
    // 不批量购买时, 绑定的userInput为productDetailData.skus
    clickNoBatchNum: function (e) {
      console.log(e)
      var obj = this.data.productDetailData;
      var index = e.currentTarget.dataset.index;
      var num = parseFloat(obj.skus[index].userInput);
      var userNum;
      var type = e.currentTarget.dataset.type
      if (type == "add") {
        obj.skus[index].userInput = func.add(num, 1)
        userNum = func.add(num, 1)
      } else {
        obj.skus[index].userInput = func.sub(num, 1)
        userNum = func.sub(num, 1)
      }
      this.setData({
        'productDetailData': obj,
        'userInput': userNum
      })
      this.computedNum()
    },
    checkUserInput: function (e) {
      console.log(e)
      this.setData({
        'userInput': e.detail.value
      })
      this.computedNum()
    },
    keydownCheckQty: function (e) {
      func.keydownCheckQty(e);
    },
    keyupUserInput: function (e) {
      this.setData({
        'userInput': e.detail.value
      })
      this.computedNum()
    },
    keyuptNoBatchNum: function (e) {
      console.log(e)
      // let obj = e.currentTarget.dataset.obj;
      let index = e.currentTarget.dataset.index;
      let obj = this.data.productDetailData;
      obj.skus[index].userInput = e.detail.value
      this.computedNum()
    },
    computedNum() {
      let obj = this.data.productDetailData;
      let countClass = 0;
      let countNum = 0;
      let countPrice = 0;
      let unit;
      for (let i =0; i<obj.units.length; i++) {
        if (obj.units[i].unitName == obj.selectedUnitName) {
          unit = obj.units[i]
        }
      }
      if (obj.isMultiProp) {
        if (obj.isBatchChoose) {
          let propName2num = 0;
          for (let i = 0; i < obj.batchData.length; i++) {
            if (obj.batchData[i].active) {
              propName2num++;
            }
          }
          if (this.data.userInput > 0 && propName2num > 0 && obj.property2) {
            countClass = obj.batchType.length * propName2num;
            countNum = func.mul(
              countClass,
              this.data.userInput
            );
            console.log(countNum)
            countPrice = func.mul(
              countClass * unit.tradePrice,
              this.data.userInput
            );
          }
          if (this.data.userInput > 0 && !obj.property2) {
            countClass = obj.batchType.length;
            countNum = func.mul(obj.batchType.length, this.data.userInput);
            countPrice = func.mul(
              obj.batchType.length * unit.tradePrice,
              this.data.userInput
            );
          }
        } else {
          for (let i = 0; i < obj.skus.length; i++) {
            if (obj.skus[i].propName1 != obj.noBatchType) {
              continue;
            }
            countClass = 1;
            countNum = func.add(parseFloat(obj.skus[i].userInput), countNum);
            countPrice = countPrice + parseFloat(obj.skus[i].userInput) * unit.tradePrice;
          }
        }
      } else {
        if (this.data.userInput > 0) {
          countClass = 1;
          countNum = this.data.userInput;
          countPrice = this.data.userInput * unit.tradePrice;
        }
      }
      this.setData({
        'totalClass': countClass,
        'totalPrice': countPrice,
        'totalNum': countNum
      })
    },
    clickCollectProduct: function () {
      let obj  = this.data.productDetailData
      console.log(obj.isCollected)
      if (obj.isCollected) {
        productApi.getCancelFavorite(this, {
          productId: obj.id
        }, (result) => {
          this.showToast('取消收藏成功!')
          this.setData({
            'productDetailData.isCollected': false
          })
        })
      } else {
        productApi.getFavorite(this, {
          productId: obj.id,
          price: obj.tradePrice
        }, (result) => {
          this.showToast('收藏成功!')
          this.setData({
            'productDetailData.isCollected': true
          })
        })
      }
    },
    // 点击加入购物车验证
    clickAddToCartBtn: function () {
      let obj = this.data.productDetailData;
      let unit;

      for (let i=0; i<obj.units.length; i++) {
        if (obj.units[i].unitId == obj.selectedUnitId) {
          unit = obj.units[i]
        }
      }
      if (this.data.totalNum > 0) {
        if (!obj.isMultiProp) {
          this.noMultiPropAddToCart(obj, unit);
        } else {
          if (!obj.isBatchChoose) {
            this.noBatchAddToCart(obj, unit)
          } else {
            this.batchAddToCart(obj, unit);
          }
        }
      } else {
        if (obj.stockQty <= 0) {
          return
        }
        if (!obj.isMultiProp) {
          this.showToast('请选择购买数量');
          return
        }
        if (obj.isMultiProp && !obj.isBatchChoose) {
          this.showToast('请选择购买数量')
          return
        }
        if (obj.isMultiProp && obj.isBatchChoose) {
          if (!obj.property2) {
            var isSelectProp1;
            isSelectProp1 = obj.noRepeatTypeArray.filter(function (p) {
              return p.active
            })
            if (!isSelectProp1.active) {
              this.showToast('请选择属性')
            } else {
              this.showToast('请选择购买数量')
            }
          } else {
            var isSelectProp2 = [];
            isSelectProp2=obj.batchData.filter(function(p){
              return p.active
            })
            if (isSelectProp2.length == 0) {
              this.showToast('请选择属性')
            } else if (isSelectProp2.length>0 && !isSelectProp2[0].active) {
              this.showToast('请选择属性')
            } else if (isSelectProp2.length>0 && isSelectProp2[0].active) {
              this.showToast('请选择购买数量')
            }
          }
        }
      }
    },
    // 不启用多属性加入购物车
    noMultiPropAddToCart: function (obj, unit) {
      if (this.data.userInput == 0) {
        this.showToast('请选择商品')
        return
      }
      if (!storage.isAllowExceedStock()) {
        if (func.mul(this.data.userInput, unit.rate) > obj.stockQty) {
          this.showToast('库存不足');
          return;
        }
      }
      let cartArr = [];
      this.dealCartArr(
        cartArr,
        0,
        this.data.userInput,
        unit,
        obj.code,
        "",
        obj.initStockQty
      );
      this.callAddToCart(cartArr, unit)
    },
    // 多属性非整批
    noBatchAddToCart: function (obj, unit) {
      let cartArr = [];
      for (let i=0; i<obj.skus.length; i++) {
        if (obj.skus[i].propName1 != obj.noBatchType) {
          continue
        }
        if (obj.skus[i].userInput == 0) {
          continue
        }
        if (!storage.isAllowExceedStock()) {
          if (obj.skus[i].stockQty < func.mul(obj.skus[i].userInput, unit.rate)) {
            this.showToast(obj.skus[i].propName1 + obj.skus[i].propName2+'库存不足')
            return;
          }
        }
        let properties = obj.property1 + ":" + obj.skus[i].propName1;
        if (obj.property2) {
          properties+=" "+obj.property2+":"+obj.skus[i].propName2
        }
        this.dealCartArr(
          cartArr,
          obj.skus[i].skuId,
          obj.skus[i].userInput,
          unit,
          obj.skus[i].code,
          properties,
          obj.skus[i].initStockQty
        );
      }
      if (cartArr.length>0) {
        this.callAddToCart(cartArr, unit);
      }

    },
    // 多属性整批加入购物车
    batchAddToCart: function (obj, unit) {
      let cartArr = [];
      if (this.data.userInput==0) {
        this.showToast('请选择商品')
        return
      }
      for (let i=0; i<obj.batchType.length; i++) {
       for (let j=0; j<obj.batchData.length; j++) {
         if (!obj.batchData[j].active && obj.property2) {
           continue
         }
         if (!storage.isAllowExceedStock()) {
           if (obj.batchData[j].stockQty<func.mul(this.data.userInput, unit.rate)) {
             this.showToast(obj.batchData[j].propName1 +
               obj.batchData[j].propName2 + '库存不足');
             return;
           }
         }
         let properties = obj.property1 + ":" + obj.batchType[i];
         if (obj.property2) {
           properties += " "+obj.property2+":"+obj.batchData[j].propName2;
         }
         this.dealCartArr(
           cartArr,
           obj.batchData[j].skuId[i],
           this.data.userInput,
           unit,
           obj.batchData[j].code[i],
           properties,
           obj.batchData[j].initStockQty[i]
         );
       }
      }
      if (cartArr.length>0) {
        this.callAddToCart(cartArr, unit)
      }
    },
    //处理到添加到购物车的数组
    dealCartArr: function (cartArr, skuId, qty, unit, code, properties, initStockQty) {
      cartArr.push({
        ptypeId: this.data.productDetailData.id,
        skuId: skuId,
        qty: qty,
        unitId: unit.unitId,
        unit: unit.unitName,
        code: code,
        fullName: this.data.productDetailData.fullName,
        properties: properties,
        discountPrice: func.mul(this.data.productDetailData.tradePrice, unit.rate),
        picUrl: this.data.productDetailData.picUrl,
        isBaseUnit: unit.isBase,
        baseUnit: this.data.productDetailData.unit,
        rate: unit.rate,
        stockQty: initStockQty,
      })
    },
    //调用加入购物车的方法
    callAddToCart: function (cartArr, unit) {
      console.log(cartArr)
      if (cartArr.length <= 0) {
        this.showToast('请选择商品');
        return;
      }
      // 处理最小起订量
      let allQty = 0;
      for (let i=0; i<cartArr.length; i++) {
        allQty+=func.mul(cartArr[i].qty, unit.rate);
      }
      if (allQty < this.data.productDetailData.minQty) {
        this.showToast('购物数量低于最小起订量');
        return;
      }
      // 最大订购量
      if (allQty>this.data.productDetailData.limitQty && this.data.productDetailData.limitQty!=0){
        this.showToast('购物数量大于限购量');
        return;
      }
      cartApi.addToCart(this, app, cartArr, (result) => {
        if (result.error_code < 0) {
          this.showToast(error_message)
        } else {
          this.showToast('添加购物车成功')
        }
      })
    },
    // 抽出公共的toast事件
    showToast: function (value) {
      wx.showToast({
        title: value,
        icon: 'none',
      })
    },
  }
})

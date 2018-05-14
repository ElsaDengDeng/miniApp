// pages/product/productClass/productClass.js
var productApi = require('../../../utils/controller/product')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstLevelClassData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.doInitPage();
  },
  doInitPage: function () {
    if (this.data.firstLevelClassData.length==0) {
      this.getFirstLevelClassMsg();
    }
  },
  getFirstLevelClassMsg: function () {
    productApi.getFirstLevelClass(this, {}, (result)=>{
      this.setData({
        'firstLevelClassData': result
      })
      this.getOtherLevelClassMsg(this.data.firstLevelClassData[0], 0 , true);
    })
  },
  getOtherLevelClassMsg: function (obj, index, isFirst) {
    console.log(obj)
    if (obj.isEnd) {
      //如果只有一级,点击进入列表,首次加载直接return
      if (!isFirst) this.clickGoProduct(obj);
      return;
    }

    productApi.getOtherLevelClass(this, {classId: obj.id}, (result)=>{
      if (!result.length) {
        if (obj.isEnd) {
          this.clickGoProduct({id:obj.id,name:obj.name,includeOOS:1})
        }
        obj.isEnd = true;
      } else {
        this.data.firstLevelClassData[index].data = result;
        var firstLevelClassData = this.data.firstLevelClassData;
        this.setData({
          'firstLevelClassData':firstLevelClassData
        })
      }
    })
  },
  clickGoProduct: function (msg) {
    if (msg.currentTarget) {
      var classId = msg.currentTarget.dataset.classId;
      var className = msg.currentTarget.dataset.className;
      wx.navigateTo({
        url:'/pages/product/product?includeOOS=1&classId='+classId+'&className='+className
      })
    } else {
      wx.navigateTo({
        url: '/pages/product/product?includeOOS=1&classId='+msg.id+'&className='+msg.name
      })
    }

  },
  clickFirstLevelClass: function (e) {
    var index = e.target.dataset.index;
    for (var i=0; i<this.data.firstLevelClassData.length; i++) {
      if (i==index){
        this.data.firstLevelClassData[i].active=true;
        if (!this.data.firstLevelClassData[i].data || !this.data.firstLevelClassData[i].data.length) {
          this.getOtherLevelClassMsg(this.data.firstLevelClassData[i], index)
        }
      } else {
        if (this.data.firstLevelClassData[i].active) {
          this.data.firstLevelClassData[i].active = false;
        }
      }
    }
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
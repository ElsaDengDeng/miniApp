const appconfig = require('./appconfig')

Number.prototype.toFixed = function(d) {
  var s = this + "";
  if (!d) d = 0;
  if (s.indexOf(".") == -1) s += ".";
  s += new Array(d + 1).join("0");
  if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
    var s = "0" + RegExp.$2,
      pm = RegExp.$1,
      a = RegExp.$3.length,
      b = true;
    if (a == d + 2) {
      a = s.match(/\d/g);
      if (parseInt(a[a.length - 1]) > 4) {
        for (var i = a.length - 2; i >= 0; i--) {
          a[i] = parseInt(a[i]) + 1;
          if (a[i] == 10) {
            a[i] = 0;
            b = i != 1;
          } else break;
        }
      }
      s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");

    }
    if (b) s = s.substr(1);
    return (pm + s).replace(/\.$/, "");
  }
  return this + "";
}

//检查是否为空
function strIsNullOrEmpty(str) {
  if (str === null || str === undefined || str === '' || trim(str) === '' || str === 'null') {
    return true;
  }
  return false;
}

function formatDate(strTime) {
  var date = new Date(strTime);
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}
//调用：fmoney("12345.675910", 3)，返回12,345.676
function fmoney(s, n) {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(),
    r = s.split(".")[1];
  var t = "";
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
}

function rmoney(s) {
  return parseFloat(s.replace(/[^\d\.-]/g, ""));
}

function trim(str) { //删除左右两端的空格
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

function getTimespan() {
  return Math.round(new Date().getTime() / 1000);
}

function formatQty(qty) {
  var value = qty;
  if (value == undefined)
    value = 0;

  return parseFloat(value.toFixed(4));
}

//检查最小起订量
function checkMinQty(inputValue, minQty) {
  if (minQty == 0)
    return true;

  return inputValue >= minQty;
}

//数量录入keydown事件
function keydownCheckQty(event) {
  if ((event.keyCode >= 48 && event.keyCode <= 57) ||
    (event.keyCode >= 96 && event.keyCode <= 105) ||
    event.keyCode == 8 || event.keyCode == 110 || event.keyCode == 190 ||
    event.keyCode == 35 || event.keyCode == 36 || event.keyCode == 37 ||
    event.keyCode == 39 || event.keyCode == 46) {

    //小数点
    if (event.keyCode == 110 || event.keyCode == 190) {
      var numText = event.detail.value;
      event.returnValue = (numText != "" && numText.indexOf('.') < 0);
    } else
      event.returnValue = true;
  } else
    event.returnValue = false;
}

//数量录入keydown事件
function keydownNumber(event) {
  if ((event.keyCode >= 48 && event.keyCode <= 57) ||
    (event.keyCode >= 96 && event.keyCode <= 105) ||
    event.keyCode == 8 ||
    event.keyCode == 35 ||
    event.keyCode == 36 ||
    event.keyCode == 37 ||
    event.keyCode == 39 ||
    event.keyCode == 46) {
    event.returnValue = true;
  } else
    event.returnValue = false;
}

//数量 change事件
function changeformatQty(event, defaultValue) {
  var num = event.detail.value;
  if (num != "" && typeof(num) != "undefined") {
    var number = parseFloat(num);
    if (number < 0 || isNaN(number)) {
      event.detail.value = defaultValue == undefined ? 1 : defaultValue;
      return;
    }

    if (number > appconfig.maxmunber) {
      event.detail.value = appconfig.maxmunber;
      return;
    }

    var length = num.toString().length;
    var index = num.toString().indexOf('.');

    var value = number;
    if ((length - (index + 1)) > 4) {
      //处理特殊情况的导致的科学计数法，如 0.0000005
      if(num.toString().substring(0,7) == '0.00000'){
        console.log('0.00000');
        event.detail.value = '0'
        return;
      }
      value = number.toFixed(4);
    }
    event.detail.value = value;
  } else {
    event.detail.value = defaultValue == undefined ? 1 : defaultValue;
  }
}
//金额 change事件
function changeformatTotal(event, defaultValue) {
  var num = event.detail.value;
  if (num != "" && typeof(num) != "undefined") {
    var number = parseFloat(num);
    if (number < 0) {
      event.detail.value = defaultValue == undefined ? 1 : defaultValue;
      return;
    }

    if (number > appconfig.maxmunber) {
      event.detail.value = appconfig.maxmunber;
      return;
    }

    var length = num.toString().length;
    var index = num.toString().indexOf('.');

    var value = number;
    if ((length - (index + 1)) > 2) {
      value = number.toFixed(2);
    }
    event.detail.value = value;
  } else {
    event.detail.value = defaultValue == undefined ? 1 : defaultValue;
  }
}

Date.prototype.pattern = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

function add(a, b) {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}

function sub(a, b) {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}

function mul(a, b) {
  var c = 0,
    d = a.toString(),
    e = b.toString();
  try {
    c += d.split(".")[1].length;
  } catch (f) {}
  try {
    c += e.split(".")[1].length;
  } catch (f) {}
  return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

function div(a, b) {
  var c, d, e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) {}
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) {}
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}

function toast(message) {
  if (message === null) {
    return;
  }
  if (message.length > 15) {
    wx.showToast({
      title: 'message',
      duration: 2000
    })
  } else {
    wx.showToast({
      title: 'message',
    })
  }
}

function checkInputText(val) {
  if (val.toString().match(/\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g) != null) {
    return false;
  } else {
    return true;
  }
}

//检查Vuex中所有商品中（同一商品ID）最小起订量是否符合
function checkAllMinQty(array) {
  var obj = {};
  for (var i = 0; i < array.length; i++) {
    if ($.isEmptyObject(obj)) {
      obj.fullName = array[i].fullName;
      obj.ptypeId = array[i].ptypeId;
      obj.qty = this.mul(array[i].qty, array[i].rate);
      obj.minQty = array[i].minQty;
    } else {
      //属于同一个商品
      if (obj.ptypeId === array[i].ptypeId) {
        obj.qty = this.add(obj.qty, this.mul(array[i].qty, array[i].rate));
      } else {
        if (!this.checkMinQty(obj.qty, obj.minQty)) {
          this.toast("商品：" + obj.fullName + "的数量小于最小起订量" + this.formatQty(obj.minQty));
          return false;
        }
        obj.fullName = array[i].fullName;
        obj.ptypeId = array[i].ptypeId;
        obj.qty = this.mul(array[i].qty, array[i].rate);
        obj.minQty = array[i].minQty;
      }
    }
    //最后一行
    if (i === array.length - 1) {
      if (!this.checkMinQty(obj.qty, obj.minQty)) {
        this.toast("商品：" + obj.fullName + "的数量小于最小起订量" + this.formatQty(obj.minQty));
        return false;
      }
    }
  }
  return true;
}

//检查Vuex中所有商品中（同一商品skuId）库存是否符合
function checkAllQty(array) {
  var map = [];
  for (var i = 0; i < array.length; i++) {
    var obj = {};
    obj.fullName = array[i].fullName;
    obj.skuId = array[i].skuId;
    obj.qty = this.mul(array[i].qty, array[i].rate);
    obj.stockQty = array[i].stockQty;
    obj.ptypeId = array[i].ptypeId;

    var isSame = false;
    for(var n=0; n<map.length; n++){
      if (obj.skuId === map[n].skuId && obj.ptypeId === map[n].ptypeId) {
        map[n].qty = map[n].qty + obj.qty;
        isSame = true;
      }
    }
    if(!isSame){
      map.push(obj);
    }
  }

  for(var i=0; i<map.length; i++){
    if (map[i].qty > map[i].stockQty) {
      this.toast("商品：" + map[i].fullName + "的购买数量大于库存数量" + map[i].stockQty);
      return false;
    }
  }
  return true;
}

//去除input内换行符
function removeEnterString(val) {
  return val.replace(/[\r\n]/g, "");
}

module.exports = {
  strIsNullOrEmpty:strIsNullOrEmpty,
  formatDate:formatDate,
  fmoney:fmoney,
  rmoney:rmoney,
  getTimespan:getTimespan,
  formatQty:formatQty,
  checkMinQty:checkMinQty,
  keydownCheckQty:keydownCheckQty,
  changeformatQty:changeformatQty,
  trim:trim,
  add:add,
  sub:sub,
  mul:mul,
  div:div,
  toast:toast,
  changeformatTotal:changeformatTotal,
  keydownNumber:keydownNumber,
  checkInputText:checkInputText,
  checkAllMinQty:checkAllMinQty,
  checkAllQty:checkAllQty,
  removeEnterString:removeEnterString
}
 const appconfig = require('./appconfig')
 const encrypt = require('./encryptutil')
 const auth = require('./authstorage')
 const func = require('./functionutils')

 function get (sender, api, data, success, error) {
  var domain = appconfig.api.domain;
  var reqdata = buildParams(data);
  var params = encrypt.getParamsStr(reqdata);
  var url = domain + api + "?" + params;
  if (appconfig.isdebug) {
    console.log('request url:' + url);
    console.log('request data:' + JSON.stringify(reqdata));
  }
  wx.request({
      url: url,
      data: {
        
      },
      header: {
        'content-type': 'application/json'
      },
      success:res=>{
        if(appconfig.isdebug) {
            console.log('response data:' + JSON.stringify(res.data))
        }
          console.log(res.data)
      },
      fail:res=>{
        if(error != undefined) {
          error(res);
        }
      }
  })

 }

 function postWidthPreloader(sender, api, data, success, error, loaderText) {
   post(sender, api, data, success, error, null, true, loaderText)
 }
 function postBizWithPreloader(sender, api, data, success, error, bizError, loaderText) {
   post(sender, api, data, success, error, bizError, true, loaderText);
 }

 // 注意: data为json对象
 function post(sender, api, data, success, error, bizError, isShowPreloader, loaderText) {
   var reqdata = buildParams(data);
   doPostCommon(sender, api, reqdata, success, error, bizError, isShowPreloader, loaderText);
 }
 //注意：data为 formData
 function postWidthFile(sender, api, data, files, success, error, loaderText) {
   var formData = buildParams(data);
   for (var i =0; i<files.length; i++) {
     formData.append("img" + i, files[i]);
   }
   doPostCommon(sender, api, formData, success, error, bizError, true, loaderText);
 }

 function postBizWithFile(sender, api, data, files, success, error, bizError, loaderText) {
  var formData = buildParams(data);
  for (var i=0; i<files.length; i++) {
    formData.append("img" + i, files[i]);
  }
  doPostCommon(sender, api, formData, success, error, bizError, true, loaderText);
 }

 function doPostCommon(sender, api, reqdata, success, error, bizError, isShowPreloader, loaderText) {
   var domain = appconfig.api.domain;
   var url = domain + api;
   if(appconfig.isdebug) {
     console.log('request url:' + url);
     console.log('request data:' + JSON.stringify(reqdata));
     if(true == isShowPreloader) {
       if (func.strIsNullOrEmpty(loaderText)) {
         wx.showLoading({
           icon: 'loading'
         })
       } else {
         wx.showLoading({
           title: 'loaderText',
           icon: 'loading'
         })
       }
     }
     if(true === isShowPreloader) {
       wx.hideLoading();
     }
     wx.request({
       url: url,
       data:reqdata,
       method: 'POST',
       header: {
         'content-type': 'application/x-www-form-urlencoded'
       },
       success: function(res) {
         if (appconfig.isdebug) {
           console.log(res.data);
         }
         if(res.data.error_code< 0) {
           if(res.data.error_code == -12 || res.data.error_code == -15) {
             auth.signOut();
           } else {
             if(bizError == undefined || bizError === null) {
               func.toast(res.data.error_message);
             } else {
               bizError(res.data);
             }
           }
         } else {
           success(res.data)
         }
       },
       fail: function(res) {
         if(true === isShowPreloader) {
           wx.hideLoading();
         }
         if(res.status === 0) {
           func.toast("网络链接异常");
         } else {
           func.toast("网络异常,错误码：" + res.status);
         }
         if(error != undefined && error != null) {
           error(res)
         }
       }
     })
   }
 }

 function buildParams(data) {
   if (func.strIsNullOrEmpty(data)) {
     data = {}
   }
   if (typeof (data) != "object") {
     console.log("参数不正确,请使用JSON对象");
     data = {}
   }
   data.profileId = auth.getProfileID();
   data.timestamp  =func.getTimespan();
   var authStr = auth.getAuthToken();
   data.token = authStr;
   data.signstr = encrypt.getSignStr(data, false);
   return data;
 }

 module.exports = {
   get: get,
   post: post,
   postWidthFile: postWidthFile,
   postWidthPreloader:postWidthPreloader,
   postBizWithPreloader: postBizWithPreloader,
   postBizWithFile: postBizWithFile
 }
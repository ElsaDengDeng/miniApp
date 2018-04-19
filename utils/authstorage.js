// begin--- 以下是session存储当前用户信息
const func = require('./functionutils')

  function setWXOpenID(wxopenid) {
    this.setStorageSync("wxopenid", wxopenid);
    // return window.sessionStorage.getItem("wxopenid");
  }
  function getWXOpenID() {
    var wxopenid = this.getStorageSync("wxopenid");
    if (func.strIsNullOrEmpty(wxopenid)) {
      return '';
    }
    return wxopenid;
  }
  //授权token
  function setAuthToken(authtoken) {
    this.setStorageSync("authtoken", authtoken);
    //window.sessionStorage.setItem("authtoken", authtoken);
  }
  function getAuthToken() {
    var authtoken = this.getStorageSync("authtoken");
    if (func.strIsNullOrEmpty(authtoken)) {
      return '';
    }
    return authtoken;
    //return window.sessionStorage.getItem("authtoken");
  }

  function setProfileID(profileid) {
    this.setStorageSync("profileid", profileid);
    //window.sessionStorage.setItem("profileid", profileid);
  }

  function getProfileID() {
    var profileid = this.getStorageSync("profileid");
    if (func.strIsNullOrEmpty(profileid)) {
      return '';
    }
    return profileid;
    //return window.sessionStorage.getItem("profileid");
  }
  function checkIsAuthed() {
    var authToken = this.getAuthToken();
    if (func.strIsNullOrEmpty(authToken)) {
      return false;
    } else {
      return true;
    }
  }
  function checkHasProfileID() {
    var profileID = this.getProfileID();
    if (func.strIsNullOrEmpty(profileID)) {
      return false;
    } else {
      return true;
    }
  }
  function signOutNoRedirect(){
    this.setAuthToken('');
    this.setProfileID('');
    this.setLoginName('');
  }
  function signOut() {
    this.setAuthToken('');
    this.setWXOpenID('');
    this.setProfileID('');
    this.setLoginName('');
    wx.redirectTo({
      url: '/pages/logs/logs'
    })
    // window.location.reload();
  }
  function setBackURL(url) {
    this.setStorageSync("backurl", url);
  }

  function getBackURL() {
    var backurl = this.getStorageSync("backurl");
    if (func.strIsNullOrEmpty(backurl)) {
      return '';
    }
    return backurl;
  }
  function setLoginName(loginname) {
    this.setStorageSync("loginname", loginname);
  }
  function getLoginName() {
    var loginName= this.getStorageSync("loginname");
    if (func.strIsNullOrEmpty(loginName)) {
      return '';
    }
    return loginName;
  }

  function getStorageSync(c_name) {
    return wx.getStorageSync(c_name);

    // if (document.cookie.length > 0) {
    //   var c_start = document.cookie.indexOf(c_name + "=")
    //   if (c_start != -1) {
    //     c_start = c_start + c_name.length + 1
    //     var c_end = document.cookie.indexOf(";", c_start)
    //     if (c_end == -1) c_end = document.cookie.length
    //     return unescape(document.cookie.substring(c_start, c_end))
    //   }
    // }
    // return ""
  }

  function setStorageSync(c_name, value) {
    wx.setStorageSync(c_name, value);
    
    // var expire = ";expires=Session";
    // document.cookie = c_name + "=" + escape(value)+expire;
  }

  module.exports = {
    setWXOpenID: setWXOpenID,
    getWXOpenID: getWXOpenID,
    setAuthToken: setAuthToken,
    getAuthToken: getAuthToken,
    setProfileID: setProfileID,
    getProfileID: getProfileID,
    checkIsAuthed: checkIsAuthed,
    checkHasProfileID:checkHasProfileID,
    signOutNoRedirect:signOutNoRedirect,
    signOut:signOut,
    setBackURL:setBackURL,
    getBackURL:getBackURL,
    setLoginName:setLoginName,
    getLoginName:getLoginName,
    getStorageSync:getStorageSync,
    setStorageSync:setStorageSync
  }
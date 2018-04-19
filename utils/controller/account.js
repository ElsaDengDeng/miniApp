const lib = require('../util');
const accountApi = require('../apipath');

//获取账户信息
function getAccountData(sender, func) {
  lib.http.post(sender, accountApi.getApiConfig().getaccountdata, {}, (response) => {
    func(response);
  });
}

//获取帐套公司信息
function getCompanyData(sender, func) {
  lib.http.post(sender,accountApi.getApiConfig().getcompanydata,{},(response)=>{
    func(response);
  });
}
// 修改账户信息
function editAccountData (sender,data) {
  lib.http.postWidthFile(sender,accountApi.getApiConfig().editaccountdata,data,sender.$data.fileData,(response)=>{
    $.toast("修改成功");
    window.router.go(-1);
  });
}
// 单独写入
function editData(sender, data) {
  lib.http.postWidthFile(sender,accountApi.getApiConfig().editaccountdata,data,sender.$data.fileData,(response)=>{
  });
}
// 修改密码

function editAccountPwd (sender,data) {
  lib.http.postWidthPreLoader(sender,accountApi.getApiConfig().editaccountPwd,data,(response)=>{
    $.toast("修改成功");
    window.router.go(-1);
  });
}

function doCancelBindWX(sender,func){
  lib.http.postWidthPreLoader(sender,accountApi.getApiConfig().unbindingWX,null,(response)=>{
    func(response);
  },null,"正在取消绑定");
}
function doBindWX(sender, openId, func, efunc){
  lib.http.postWidthPreloader(sender, accountApi.getApiConfig().bindingWX,{"openId":openId},(response)=>{
    func(response);
  },efunc,"正在绑定");
}

module.exports = {
  getAccountData: getAccountData,
  getCompanyData: getCompanyData,
  editAccountData: editAccountData,
  editData: editData,
  editAccountPwd: editAccountPwd,
  doCancelBindWX: doCancelBindWX,
  doBindWX: doBindWX
}
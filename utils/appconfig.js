const app = {
  appname: '章鱼侠云订货',
  subtitle: '— 随时随地，轻松订货 —',
  servicephone: '028-85310000',
  websiteurl: 'http://www.zhangyuxia.com.cn',
  sharedes: '章鱼侠云订货专业分销订货方案提供商',
  shareimg: 'http://www.zhangyuxia.com.cn/images/logo.png',
  version: '1.0.0',
  domain: 'http://ydhmobi.zhangyuxia.com.cn',
  //domain: 'http://ydhmobistage.zhangyuxia.com.cn',
  //domain: 'http://192.168.8.234:8802',
  copyright: 'Copyright © 2016 成都任我行网络技术有限公司',
  shareTimelineImage: 'http://ydhmobi.zhangyuxia.com.cn/static/img/logo.png'
}
const api = {
  // domain: 'http://ydhapi.zhangyuxia.com.cn'
  //domain: 'http://ydhapistage.zhangyuxia.com.cn'
  domain: 'http://192.168.8.234:8801'
}
const uploadConfig = {
  allImgExt: ".jpg|.jpeg|.gif|.bmp|.png|", //全部图片格式类型
  maxSize: 5120 //限制大小5 M,单位kb
}
//网站应用
const wx = {
  //管家婆公众号
  // appid: 'wxdef54557ccff7181', //服务商ID
  appid: 'wx95f31bb114e5ba85', //服务商ID
  redirect_uri: 'https://wechatpublic.wsgjp.com/Dispatch/Index',
  //state: 'I2cEPl8ihfM8dblx'//测试环境
  state:'TiGZZUzu14Bie43o'//正式环境
}

const isdebug = true;
const pagesize = 10;
const maxmunber = 1000000000;
const demoAccounts=["client01","client03","client09","client12"];

module.exports =  {
  api:api,
  wx:wx,
  isdebug:isdebug,
  app:app,
  uploadConfig:uploadConfig,
  pagesize:pagesize,
  maxmunber:maxmunber,
  demoAccounts:demoAccounts
}

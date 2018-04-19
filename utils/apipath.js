const getGlobalInfo = '/api/system/getGlobalInfo'
const getWXJSApiTicket = '/api/user/WXJSApiTicket'
//login
const login = '/api/user/login'
const loginbywx = '/api/user/loginwx'


//订单相关api地址 begin
const getOrderList = '/api/order/getOrderList'
const getOrderDetail = '/api/order/getOrderDetail'
const deleteOrder = '/api/order/deleteOrder'
const cancelOrder = '/api/order/cancelOrder'
const copyOrder = '/api/order/copyOrder'
const updateOrderAddress = '/api/order/updateOrderAddress'
const confirmTakeDelivery = '/api/order/confirmTakeDelivery'
const submitOrder = '/api/order/submitOrder'

//购物车相关
const getCartProductList = '/api/cart/getCartList'
const updateCart = '/api/cart/updateCart'
const deleteCartItem = '/api/cart/deleteCartItem'
const addCart = '/api/cart/addCartByMulProperty'
const clearCart = '/api/cart/clearCart'
const submitOrderBefore = '/api/order/getSubmitOrderInfo'


//消息
const getOrderMessageList = '/api/message/getOrderMessageList'
const getNoticeList = '/api/message/getNoticeList'
const readSingleMessage = '/api/message/readSingleMessage'
const getNoticeDetail = '/api/message/getNoticeDetail'
const batchDeleteMessage = '/api/message/batchDeleteMessage'
const batchReadSingleMessage = '/api/message/batchReadSingleMessage'
const getNoReadMessageCount = '/api/message/getNoReadMessageCount'
const getPromotionList = '/api/message/getPromotionList'
const getCombinePromotion = '/api/message/getComboPormotion'

//mine
//获取账套公司信息
const getcompanydata = '/api/system/getCompanyInfo'
const getaccountdata = '/api/personalcenter/getUserInfo'
const editaccountdata = '/api/personalcenter/modifyUserInfo'
const editaccountPwd = '/api/personalcenter/modifyPassword'
const getboughtproduct = '/api/product/getBoughtProduct'
const getbrowsinghistory = '/api/personalcenter/getBrowsingRecord'
const getcollectionlist = '/api/product/getCollectProduct'
const cancelcollection = '/api/product/cancelFavorite'
const clearcollection = '/api/product/clearFavorite'
const clearbrowsinghistory = '/api/personalcenter/clearBrowsingRecord'
const getaboutusinfo = '/api/system/getGlobalInfo'
const unbindingWX = '/api/user/unbindingWX'
const bindingWX = '/api/user/bindingWX'

//address相关api地址  begin
const getDefaultAddress = '/api/personalcenter/getDefaultAddress'
const getAddressList = "/api/personalcenter/getAddressList"
const setDefaultAddress = "/api/personalcenter/setDefaultAddress"
const deleteAddress = "/api/personalcenter/deleteAddress"
const modifyAddress = "/api/personalcenter/modifyAddress"
const addAddress = "/api/personalcenter/addAddress"
const getAddressDetail = "/api/personalcenter/getAddressDetail"

//资金账户有关
const getPayRecordList = '/api/personalcenter/getPayRecordList'
const getPayDetail = '/api/personalcenter/getPayDetail'
const getAccountBalance = '/api/personalcenter/getAccountBalance'
const getAdvanceAccountRecordList = '/api/personalcenter/getAdvanceAccountRecordList'
const getAdvanceAccountDetail = '/api/personalcenter/getAdvanceAccountDetail'
const getOrderPayRecord = '/api/personalcenter/getOrderPayRecord'

//退货相关
const getReturnedList = '/api/returned/getReturnedList'
const getReturnedDetail = '/api/returned/getReturnedDetail'
const getProductByOrder = '/api/returned/getProductByOrder'
const getBoughtProductByReturned = '/api/returned/getBoughtProductByReturned'
const submitreturn = '/api/returned/submitReturnedBill'

//product
const bannerNotice = "/api/product/getBannerNotice" /*--首页banner和公告*/
const productlist = "/api/product/getProductList" /*--商品列表接口--*/
const productdetail = "/api/product/getProductDetail" /*--商品详情接口--*/
const relevanceproduct = "/api/product/getRelevanceProduct" /*--关联商品接口--*/
const favorite = "/api/product/addFavorite" /*--收藏商品接口--*/
const cancelfavorite = "/api/product/cancelFavorite" /*--取消收藏接口--*/
const firstLevelClass = "/api/product/getFirstLevelClass"/*--获取商品分类一级--*/
const otherLevelClass = "/api/product/getOtherLevelClass" /*--获取商品分类二三级--*/
const brandList = "/api/product/getBrandList" /*--获取商品筛选条件--*/
const addBrowsingRecord = "/api/personalcenter/addBrowsingRecord" /*--加入浏览记录--*/

//支付pay
const wxunifiedorder = "/api/pay/wxUnifiedOrder" /*--微信统一下单--*/
const aliUnifiedOrder = "/api/pay/aliUnifiedOrder" /*--支付宝统一下单--*/
const getDefaultDataByPay = '/api/pay/getDefaultDataByPay' /*--支付前获取初始数据--*/
const payByBalance = '/api/pay/payByBalance' /*--余额支付接口--*/
const payByBank = '/api/pay/payByBank' /*--订单-银行转账--*/
const getAccountList = '/api/pay/getAccountList' /*--获取收款账户列表--*/
const paystatusquery = '/api/pay/paystatusquery' /*--订单/充值支付状态查询--*/

function getApiConfig() {
  var config = {
    'getGlobalInfo':getGlobalInfo,
    'getWXJSApiTicket':getWXJSApiTicket,
    'login': login,
    'loginbywx':loginbywx,
    'getOrderList':getOrderList,
    'getOrderDetail':getOrderDetail,
    'deleteOrder':deleteOrder,
    'cancelOrder':cancelOrder,
    'copyOrder':copyOrder,
    'updateOrderAddress':updateOrderAddress,
    'confirmTakeDelivery':confirmTakeDelivery,
    'submitOrder':submitOrder,
    'getCartProductList':getCartProductList,
    'updateCart':getCartProductList,
    'deleteCartItem':deleteCartItem,
    'addCart':addCart,
    'clearCart':clearCart,
    'submitOrderBefore':submitOrderBefore,
    'getOrderMessageList':getOrderMessageList,
    'getNoticeList':getNoticeList,
    'readSingleMessage':readSingleMessage,
    'getNoticeDetail':getNoticeDetail,
    'batchDeleteMessage':batchDeleteMessage,
    'batchReadSingleMessage':batchReadSingleMessage,
    'getNoReadMessageCount':getNoReadMessageCount,
    'getPromotionList':getPromotionList,
    'getCombinePromotion':getCombinePromotion,
    'getcompanydata':getcompanydata,
    'getaccountdata':getaccountdata,
    'editaccountdata':editaccountdata,
    'editaccountPwd':editaccountPwd,
    'getboughtproduct':getboughtproduct,
    'getbrowsinghistory':getbrowsinghistory,
    'getcollectionlist':getcollectionlist,
    'cancelcollection':cancelcollection,
    'clearcollection':clearcollection,
    'clearbrowsinghistory':clearbrowsinghistory,
    'getaboutusinfo':getaboutusinfo,
    'unbindingWX':unbindingWX,
    'bindingWX':bindingWX,
    'getDefaultAddress':getDefaultAddress,
    'getAddressList':getAddressList,
    'setDefaultAddress':setDefaultAddress,
    'deleteAddress':deleteAddress,
    'modifyAddress':modifyAddress,
    'addAddress':addAddress,
    'getAddressDetail':getAddressDetail,
    'getPayRecordList':getPayRecordList ,
    'getPayDetail': getPayDetail,
    'getAccountBalance': getAccountBalance,
    'getAdvanceAccountRecordList': getAdvanceAccountRecordList,
    'getAdvanceAccountDetail': getAdvanceAccountDetail,
    'getOrderPayRecord': getOrderPayRecord,
    'getReturnedList': getReturnedList,
    'getReturnedDetail': getReturnedDetail,
    'getProductByOrder': getProductByOrder,
    'getBoughtProductByReturned': getBoughtProductByReturned,
    'submitreturn': submitreturn,
    'bannerNotice': bannerNotice,
    'productlist': productlist,
    'productdetail': productdetail,
    'relevanceproduct': relevanceproduct,
    'favorite': favorite,
    'cancelfavorite': cancelfavorite,
    'firstLevelClass': firstLevelClass,
    'otherLevelClass': otherLevelClass,
    'brandList': brandList,
    'addBrowsingRecord': addBrowsingRecord,
    'wxunifiedorder': wxunifiedorder,
    'aliUnifiedOrder': aliUnifiedOrder,
    'getDefaultDataByPay': getDefaultDataByPay,
    'payByBalance': payByBalance,
    'payByBank': payByBank,
    'getAccountList': getAccountList,
    'paystatusquery': paystatusquery
  };
  return config;
}

module.exports = {
  getApiConfig: getApiConfig
};
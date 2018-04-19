const func = require('./functionutils')
const encryp = require('./sha1.js')

function getParamsStr(data) {
  var orgParams = [];
  for (var i in data) {
    orgParams.push(i)
  }
  var newParams = sortFunction(orgParams);

  var parStr = '';
  for (var i = 0; i < newParams.length; i++) {
    var tkey = newParams[i];
    var tvalue = data[tkey];
    if (!func.strIsNullOrEmpty(tvalue)) {
      if (typeof(tvalue) == "object") {
        tvalue = JSON.stringify(tvalue);
      }
      parStr = parStr + "&" + tkey + "=" + tvalue;
    }
  }
  if (parStr.length > 0) {
    parStr = parStr.substring(1);
  }
  //console.log("parStr=====" + parStr);

  return parStr;
}

function getSignStr(data) {
  var parStr = getParamsStr(data);
  if (parStr.length > 0) {
    return encryp.sha1(parStr)
  }

  return '';
}

function sortFunction(array) {
  return array.sort();
}

module.exports =  {
  getSignStr:getSignStr,
  getParamsStr: getParamsStr
}

function scanCode(callback) {
  cordova.plugins.barcodeScanner.scan(
    function(result) {
      if (!result.cancelled) {
        callback(result.text);
      }
      // alert("We got a barcode\n" +
      //       "Result: " + result.text + "\n" +
      //       "Format: " + result.format + "\n" +
      //       "Cancelled: " + result.cancelled);
    },
    function(error) {
      $.toast("扫码失败:" + error);
    }, {
      "preferFrontCamera": false, // iOS and Android
      "showFlipCameraButton": false, // iOS and Android
      "showTorchButton": true, // iOS and Android
      "disableAnimations": true, // iOS
      "prompt": "请将条码放在扫描区域", // supported on Android only
      "formats": "EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR", // default: all but PDF_417 and RSS_EXPANDED
      "orientation": "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
    }
  );
}
module.exports = {
  scanCode: scanCode
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const http = require('./httputils.js')
const func = require('./functionutils.js')
const auth = require('./authstorage.js')

module.exports = {
  formatTime: formatTime,
  http: http,
  func: func,
  auth: auth
}

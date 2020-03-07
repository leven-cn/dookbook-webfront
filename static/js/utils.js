/**
 * Utils
 */

/**
 * Get cookies
 * @param {String} name cookie name
 */
function getCookie (name) {
  var cookieValue = null
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';')
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

/**
  * 获取URL查询参数
  * @param {String} param URL parameter name
  */
function getQueryVariable (param) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === param) { return pair[1] }
  }
  return false
}

/**
 * 服务器消息推送
 * 
 * @param {String} url SSE URL地址
 * @param {String} eventName SSE事件名
 * @param {Function} handler 消息处理函数
 */
function serverEvent(url, eventName, handler) {
  var evtSource = new EventSource(url)
  evtSource.onmessage = function (e) {
    console.log('serverEvent message: ' + e.data)
  }
  evtSource.addEventListener(eventName, function (e) {
    if (e.data) {
      handler(e.data)
    }
  }, false)
}

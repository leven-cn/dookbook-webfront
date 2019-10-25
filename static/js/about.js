/**
 * 关于页面
 */

// 滚动下箭头消失显示
var asideUL = document.querySelector('aside ul')
var downIcon = document.querySelector('.down')
asideUL.onmouseover = function () {
  if (this.scrollTop === 0) {
    downIcon.style.display = 'inline-block'
  } else if (this.scrollTop + this.clientHeight === this.scrollHeight) {
    downIcon.style.display = 'none'
  }
}

// 服务器消息推送
var session = getQueryVariable('session')
if (session) {
  var evtSource = new EventSource('/github/oauth/notify/' + session + '/')
  evtSource.onmessage = function (e) {
    console.log('message: ' + e.data)
  }
  evtSource.addEventListener('github:oauth', function (e) {
    if (e.data) {
      alert(e.data)
    }
  }, false)
}

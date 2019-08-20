/**
 * 关于页面
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
 * 滚动下箭头消失显示
 */
function triggerDownIcon (asideUL, downIcon) {
  asideUL.onmouseover = function () {
    if (this.scrollTop === 0) {
      downIcon.style.display = 'inline-block'
    } else if (this.scrollTop + this.clientHeight === this.scrollHeight) {
      downIcon.style.display = 'none'
    }
  }
}

/**
 * 服务器消息推送
 */
function serverNotify (session) {
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
}

document.ready(function () {
  var asideUL = document.querySelector('aside ul')
  var downIcon = document.querySelector('.down')
  triggerDownIcon(asideUL, downIcon)

  var session = getQueryVariable('session')
  serverNotify(session)
})

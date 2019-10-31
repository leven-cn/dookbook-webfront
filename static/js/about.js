/**
 * 关于页面
 */

var input = document.querySelector('input')
var ulBox = null
var inputSilence = false

initInput(input)

// 点击输入框
input.onclick = function (event) {
  event.stopPropagation()

  if (!this.value) {
    this.placeholder = ''
  } else {
    showSearchHintList()
  }
}

// 处理搜索输入
input.oninput = function () {
  if (!this.value) {
    if (ulBox) {
      ulBox.style.display = 'none'
    }
    return
  }

  if (!inputSilence) {
    var pos = (location.pathname.startsWith('/about')) ? 2 : 1
    var lang = location.pathname.split('/')[pos]
    if (lang) {
      lang = lang.toLowerCase()
      lang = (lang !== 'en' && lang !== 'zh-hans') ? 'en' : lang
    } else {
      lang = 'en'
    }
    fetchSearchHintList(this.value.trim(), lang)
  }
}

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

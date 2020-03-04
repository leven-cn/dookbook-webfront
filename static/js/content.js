/** Content Page */

var input = document.querySelector('input')
var ulBox = null
const INPUT_SILENCE_TIME = 100  // in microseconds
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

    /* 设置阻断事件间隔，过滤过于频繁的请求 */
    inputSilence = true
    setTimeout(function () {
      inputSilence = false
    }, INPUT_SILENCE_TIME)
  }
}

/** Content Page */

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
    } else {
      lang = (lang !== 'en' && lang !== 'zh-hans') ? 'en' : lang
    }
    fetchSearchHintList(this.value.trim(), lang)
  }
}

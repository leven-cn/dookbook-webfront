
/* eslint-disable no-unused-vars */

/**
 * 初始化搜索框
 * @param {Element} searchInput 搜索输入框
 * @param {Element} searchList 搜索下拉列表
 * @param {Element} beian 备案信息
 */
function initSearch (searchInput, searchList, beian = null) {
  const DEFAULT_PLACEHOLDER = searchInput.placeholder
  const DEFAULT_SEARCH = searchList.innerHTML

  // 点击输入框
  searchInput.onclick = function (event) {
    event.stopPropagation()

    if (beian) {
      beian.style.display = "none"
    }

    if (!this.value) {
      this.placeholder = ''
      searchList.innerHTML = DEFAULT_SEARCH
    }
    searchList.style.display = 'block'
  }

  // 点击其他地方，下拉菜单隐藏
  document.body.onclick = function () {
    searchList.style.display = 'none'
  }

  // 输入框失去焦点
  searchInput.onblur = function () {
    if (searchInput.placeholder === '') {
      searchInput.placeholder = DEFAULT_PLACEHOLDER
    }

    if(beian){
      beian.style.display = "block" 
    }
  }

  // 处理搜索输入
  searchInput.oninput = function () {
    if (!this.value) {
      searchList.innerHTML = DEFAULT_SEARCH
      searchList.style.display = 'block'
      return
    }

    fetchSearchHintList(searchList, this.value.trim(), getLanguage())

    // if (!inputSilence) {
      /* 设置阻断事件间隔，过滤过于频繁的请求 */
      // inputSilence = true
      // setTimeout(function () {
      //   inputSilence = false
      // }, INPUT_SILENCE_TIME)
    // }
  }
}

/**
 * 获取当前页面语音
 * @returns {String} 语言
 */
function getLanguage() {
  var pos = (location.pathname.startsWith('/about')) ? 2 : 1
  var lang = location.pathname.split('/')[pos]
  if (lang) {
    lang = lang.toLowerCase()
    lang = (lang !== 'en' && lang !== 'zh-hans') ? 'zh-hans' : lang
  } else {
    lang = 'zh-hans'
  }
  return lang
}

/**
 * 创建搜索提示下拉列表
 * @param {Element} searchList 搜索下拉列表
 */
function createSearchHintList (searchList, hints, lang) {
  if (hints == null || hints.length === 0) {
    searchList.innerHTML = '<li><a href="#" class="search-results">暂无搜索结果</a></li>'
  } else {
    searchList.innerHTML = ''
    for (var i = 0; i < hints.length; i++) {
      searchList.innerHTML += '<li><a href="/' + lang + '/' + hints[i].subject + '/' + hints[i].topic + '/"><span class="search-hints-subject"><img src="' + hints[i].subject_icon_url + '" alt="' + hints[i].subject + '">' + hints[i].subject + '</span><span class="search-hints-topic" title="' + hints[i].topics + '"></span></a></li>'
      searchList.querySelectorAll('li > a')[i].querySelector('span.search-hints-topic').textContent = hints[i].topics
    }
  }
}

/** 
 * 获取搜索提示列表
 * @param {Element} searchList 搜索下拉列表
 * @param {String} queryText 搜索文本
 * @param {String} lang 语言
 */
function fetchSearchHintList (searchList, queryText, lang) {
  console.debug('fetchSearchHintList: queryText=' + queryText + ', lang=' + lang)

  var xhr = new XMLHttpRequest()
  xhr.open('GET', '/search/hints/?q=' + queryText, true)
  xhr.setRequestHeader('Accept-Language', lang)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var hints = []
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText)
        console.info('fetchSearchHintList: ' + data.hints)
        hints = data.hints
      } else {
        console.error('请求接口失败, status=' + xhr.status)
      }
      createSearchHintList(searchList, hints, lang)
      searchList.style.display = 'block'
    } else {
      console.debug('正在请求搜索提示')
    }
  }
}

var _navPos = 0

/**
 * 键盘按键事件处理
 * @param {Element[]} suggestList 下拉列表
 */
function keydownEventHandler (suggestList) {
  document.body.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0]

    // 向上键
    if (e && e.keyCode == 38) {
      if (_navPos > 0) {
        handleSelectSuggest(suggestList, _navPos--)
      }
    }

    // 向下键
    if (e && e.keyCode == 40) {
      if (_navPos < suggestList.length - 1) {
        handleSelectSuggest(suggestList, _navPos++)
      }
    }

    // 回车跳转页面
    if (e && e.keyCode == 13) { // 回车
      window.location = suggestList[_navPos].querySelector('a').href
    }
  }
}

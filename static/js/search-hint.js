
/* eslint-disable no-unused-vars */

/* 创建搜索提示下拉列表 */
function createSearchHintList (hints, lang) {
  if (ulBox == null) {
    ulBox = document.createElement('ul')
    document.getElementById('search').appendChild(ulBox)
  }

  if (hints == null || hints.length === 0) {
    ulBox.innerHTML = '<li><a href="#">暂无搜索结果</a></li>'
  } else {
    ulBox.innerHTML = ''
    for (var i = 0; i < hints.length; i++) {
      ulBox.innerHTML += '<li><a href="/' + lang + '/' + hints[i].subject + '/' + hints[i].topic + '/"><span class="search-hints-subject"><img src="' + hints[i].subject_icon_url + '" alt="' + hints[i].subject + '">' + hints[i].subject + '</span><span class="search-hints-topic">' + hints[i].topic + '</span></a></li>'
    }
  }
}

/* 获取搜索提示列表 */
function fetchSearchHintList (queryText, lang) {
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
      createSearchHintList(hints, lang)
      showSearchHintList()
      keydownKeepSilence(inputSilence)
    } else {
      console.debug('正在请求')
    }
  }
}

/* 显示搜索下拉列表 */
function showSearchHintList () {
  if (ulBox != null) {
    ulBox.style.display = 'block'
  }
}

/* 设置阻断事件间隔，过滤过于频繁的请求 */
function keydownKeepSilence (inputSilence, microseconds = 200) {
  inputSilence = true
  setTimeout(function () {
    inputSilence = false
  }, microseconds)
}

/**
 * 初始化搜索框
 * @param {Element} input 搜索框元素
 */
function initInput (input) {
  const DEFAULT_INPUT_PLACEHOLDER = input.placeholder

  // 点击页面其他地方，隐藏下拉列表
  document.body.onclick = function () {
    if (input.placeholder === '') {
      input.placeholder = DEFAULT_INPUT_PLACEHOLDER
    }
    if (ulBox != null) {
      ulBox.style.display = 'none'
    }
  }
}

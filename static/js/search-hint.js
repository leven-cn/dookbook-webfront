/* 创建搜索提示下拉列表 */
function createSearchHintList (hints) {
  if (ulBox == null) {
    ulBox = document.createElement('ul')
    document.getElementById('search').appendChild(ulBox)
  }

  if (hints == null || !hints) {
    ulBox.innerHTML = '<li><a href="#">暂无搜索结果</a></li>'
  } else {
    for (var i = 0; i < hints.length; i++) {
      ulBox.innerHTML += '<li><a href="#"><span class="search-hints-subject"><img src="' + hints[i].subject_icon_url + '" alt="' + hints[i].subject + '">' + hints[i].subject + '</span><span class="search-hints-topic">' + hints[i].topic + '</span></a></li>'
    }
  }
}

/* 获取搜索提示列表 */
function fetchSearchHintList () {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', '/static/js/text.json', true)
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText)
        return data.hints
      } else {
        console.error('请求接口失败, status=' + xhr.status)
        return null
      }
    } else {
      console.error('请求接口失败')
      return null
    }
  }
}

/* 显示搜索下拉列表 */
function showSearchHintList () {
  if (ulBox != null) {
    ulBox.style.display = 'block'
  } else {
    createSearchHintList(fetchSearchHintList())
  }
}

var ulBox = null
var input = document.querySelector('input')

// 点击输入框,清空输入框内文字，并且列出下拉列表
input.onclick = function (event) {
  event.stopPropagation()

  if (!this.value) {
    this.placeholder = ''
  } else {
    ulBox.style.display = 'block'
  }
}

input.oninput = function () {
  if (!this.value) {
    ulBox.style.display = 'none'
    return
  }
  showSearchHintList()
}

// 点击页面其他地方，隐藏下拉列表
document.body.onclick = function (e) {
  if (input.placeholder === '') {
    input.placeholder = input.getAttribute('data-prompt')
  }
  if (ulBox != null) {
    ulBox.style.display = 'none'
  }
}

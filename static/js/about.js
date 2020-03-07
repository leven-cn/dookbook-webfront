/**
 * 关于页面
 */

/**
 * 滚动下箭头消失显示
 */
function styleDown() {
  var asideUL = document.querySelector('aside ul')
  var downIcon = document.querySelector('.down')
  asideUL.onmouseover = function () {
    if (this.scrollTop === 0) {
      downIcon.style.display = 'inline-block'
    } else if (this.scrollTop + this.clientHeight === this.scrollHeight) {
      downIcon.style.display = 'none'
    }
  }
}

var searchInput = document.querySelector('input')
var searchList = document.createElement('ul')
document.getElementById('search').appendChild(searchList)

initSearch(searchInput, searchList)
styleDown()

var session = getQueryVariable('session')
if (session) {
  serverEvent('/helper/github/oauth/notify/' + session + '/', 'github:oauth', function(data) {
    alert(data)
  })
}

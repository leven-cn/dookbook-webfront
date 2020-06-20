/** Content Page */

var searchInput = document.querySelector('input')
var searchList = document.createElement('ul')
document.getElementById('search').appendChild(searchList)

initSearch(searchInput, searchList)

// 判断浏览器为Safari执行的样式
function safariStyle() {
  var isSafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  if (isSafariBrowser) {
    var meter = document.getElementsByTagName('meter')
    for (var i = 0; i < meter.length; i++ ) {
      meter[i].style.webkitAppearance = "none"
    }
  } 
}

safariStyle()

function showMore () {
  var learnMore = document.querySelector('.learn-more')
  var learnMoreBox = document.querySelector('.learn-more-box')
  var offon = true
  learnMore.onclick = function (event) {
    event.stopPropagation()
    if (offon) {
      learnMoreBox.style.display = 'block'
      offon = false
    } else {
      learnMoreBox.style.display = 'none'
      offon = true
    }
  }
  document.body.onclick = function () {
    learnMoreBox.style.display = 'none'
    offon = true
  }
  learnMoreBox.onclick = function (event) {
    event.stopPropagation()
  }
}

showMore()

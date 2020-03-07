/** Content Page */

var searchInput = document.querySelector('input')
var searchList = document.createElement('ul')
document.getElementById('search').appendChild(searchList)

initSearch(searchInput, searchList)

// 判断浏览器为Safari执行的样式
function safariStyle() {
  var isSafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  if (isSafariBrowser) {
    var meter = document.getElementsByTagName("meter")
    for (var i = 0; i < meter.length; i++ ) {
      meter[i].style.webkitAppearance = "none"
    }
  } 
}

safariStyle()

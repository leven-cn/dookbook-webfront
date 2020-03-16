
var searchInput = document.querySelector('input')
var searchList = document.createElement('ul')
document.getElementById('search').appendChild(searchList)

initSearch(searchInput, searchList)

var more = document.querySelector('header > button')
var moreNav = document.querySelector('nav')
var offon = true;

more.onclick = function (event) {
  event.stopPropagation()
  if (offon) {
    moreNav.style.display = "block"
    offon = false
  } else {
    moreNav.style.display = "none"
    offon = true
  }
}

document.body.onclick = function () {
  toc.style.display = "none"
  moreNav.style.display = "none"
  offon = true
}
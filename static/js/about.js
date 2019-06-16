/**
 * 滚动下箭头消失显示
 */

var asideUL = document.querySelector('aside ul')
var down = document.querySelector('.down')

asideUL.onmouseover = function () {
  if (this.scrollTop === 0) {
    down.style.display = 'inline-block'
  } else if (this.scrollTop + this.clientHeight === this.scrollHeight) {
    down.style.display = 'none'
  }
}

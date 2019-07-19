/**
 * glossary
 */
var glossary = document.querySelectorAll('main a.glossary')
var prompt = document.querySelectorAll('article.glossary')

for (var i = 0; i < glossary.length; i++) {
  prompt[i].style.display = 'none'

  // 鼠标滑过
  glossary[i].onmouseover = function (ev) {
    var glossaryHtml = this
    // 获取鼠标位置
    var oEvent = ev || event
    var scrollTop = this.scrollTop
    var scrollLeft = this.scrollLeft

    // 获取所以的提示框
    for (var j = 0; j < prompt.length; j++) {
      var promptTitle = prompt[j].querySelectorAll('section')
      var promptFather = prompt[j].style

      // 获取section标签
      for (var k = 0; k < promptTitle.length; k++) {
        // 判断section标签的title内容是否等于鼠标滑过的内容所匹配
        if (promptTitle[k].title === glossaryHtml.innerHTML) {
          promptFather.display = 'block'
          setTimeout(function () {
            promptFather.opacity = '1'
          }, 100)
          promptFather.position = 'fixed'
          promptFather.left = oEvent.clientX + scrollLeft + 'px'
          promptFather.top = oEvent.clientY + scrollTop + 'px'
        }
      }
    }
  }

  // 鼠标离开
  glossary[i].onmouseout = function () {
    var glossaryHtml = this

    // 获取所以的提示框
    for (var j = 0; j < prompt.length; j++) {
      var promptTitle = prompt[j].querySelectorAll('section')
      var promptFather = prompt[j].style

      // 获取section标签
      for (var k = 0; k < promptTitle.length; k++) {
        // 判断section标签的title内容是否等于鼠标滑过的内容所匹配
        if (promptTitle[k].title === glossaryHtml.innerHTML) {
          promptFather.opacity = '0'
          promptFather.display = 'none'
        }
      }

      // 鼠标滑过提示显示
      prompt[j].onmouseover = function () {
        console.log('1+1')
        this.style.display = 'block'
        this.style.opacity = '1'
      }

      // 鼠标离开提示隐藏
      prompt[j].onmouseout = function () {
        console.log('1+1')
        this.style.display = 'none'
        this.style.opacity = '0'
      }
    }
  }
}

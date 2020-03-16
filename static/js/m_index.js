
/**
 * 首页 - DOOKBOOK文字效果
 */
function fontTwister () {
  var logoHeader = document.querySelector('main > div')
  var developerText = document.getElementById('developer-text')

  // 显示dookbook动画效果
  setTimeout(function () {
    logoHeader.style.display = 'block'

    developerText.style.animation = '1s fuzzy linear'
    developerText.style.animationFillMode = 'forwards'
    setTimeout(function () {
      // "Developers' Cookbook图" 宽度慢慢变0
      developerText.style.animation = '1s fuzzyWidth linear'
      developerText.style.animationFillMode = 'forwards'

      setTimeout(function () {
        // DOOKBOOK慢慢放大
        var img = logoHeader.querySelectorAll('img')
        for (var i = 0; i < img.length; i++) {
          img[i].style.transition = 'width 1s'
          img[i].style.width = '1.7em'
          img[0].style.width = '2em'
          img[5].style.width = '2em'
        }

        setTimeout(function () {
          // 整个字体区域再上移
          logoHeader.style.animation = '0.5s up linear'
          logoHeader.style.animationFillMode = 'forwards'
        }, 900)

        setTimeout(function () {
          // 显示输入框
          var label = document.querySelector('main > input')
          label.style.transition = 'all 1.2s'
          label.style.opacity = '1'

          // 显示页眉
          var header = document.querySelector('body > header')
          header.style.transition = 'all 1.2s'
          header.style.opacity = '0.5'

          // 显示版权
          var record = document.querySelector('.record')
          record.style.transition = 'all 1.2s'
          record.style.opacity = '1'

          // 显示中英文翻译按钮
          var footer = document.querySelector('footer')
          footer.style.transition = 'all 1.2s'
          footer.style.opacity = '1'
        }, 1300)
      }, 1100)
    }, 1000)
  }, 1000)
}

fontTwister ()

var searchInput = document.querySelector('input')
var searchList = document.querySelector('nav > ul')
var beianElement = document.getElementsByClassName("record")
if (beianElement.length != 0) {
  beianElement = beianElement[0]
} else {
  beianElement = null
}

// const INPUT_COUNT_PER_SECOND = 5
// var inputCount = 0  // 一段时间内的输入字符数
// var inputTime = 0  // 输入计时

initSearch(searchInput, searchList, beian=beianElement)

// 搜索建议下拉列表
searchInput.onkeydown = function () {
  this.classList.add('keyup')
  setTimeout(function () {
    searchInput.classList.remove('keyup')
  }, 100)
}

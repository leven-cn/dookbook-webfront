/* index page  */

/* 显示信封 */
function showEnvelope () {
  var canvas = document.querySelector('#introduce canvas')
  var ctx = canvas.getContext('2d')
  canvas.style.width = document.body.scrollWidth + 'px'
  ctx.beginPath()
  ctx.shadowBlur = 6
  ctx.shadowOffsetY = 2
  ctx.shadowColor = '#000'
  ctx.moveTo(0, 0)
  ctx.lineTo(150, 70)
  ctx.lineTo(300, 0)
  ctx.fillStyle = '#111'
  ctx.fill()

  return canvas
}

/**
 * 动画:开启印章
 */
function openEnvelope (envelope, canvas) {
  var geek = document.getElementById('geek')
  var popostmark = document.getElementById('postmark')

  // 印章消失
  envelope.style.transition = 'all 2s'
  envelope.style.opacity = '0'

  // 邮戳
  popostmark.style.transition = 'all 2s'
  popostmark.style.opacity = '0'

  // 极客
  geek.style.transition = 'all 2s'
  geek.style.opacity = '0'

  setTimeout(function () {
    envelope.style.display = 'none'
    popostmark.style.display = 'none'
    geek.style.display = 'none'

    // 三角形阴影变白慢慢消失
    canvas.style.transition = 'all 1.5s'
    canvas.style.opacity = '0'
    var ctx = canvas.getContext('2d')
    ctx.shadowBlur = 13
    ctx.shadowColor = '#555'
    ctx.moveTo(0, 0)
    ctx.lineTo(0, 0)
    ctx.lineTo(0, 0)
    ctx.fill()
  }, 1500)
}

/**
 * DOOKBOOK文字效果
 */
function fontTwister () {
  var logoHeader = document.querySelector('main > header')
  var developerText = document.getElementById('developer-text')

  // 显示dookbook动画效果
  setTimeout(function () {
    logoHeader.style.display = 'block'

    developerText.style.animation = '1.2s fuzzy linear'
    developerText.style.animationFillMode = 'forwards'
    setTimeout(function () {
      // "Developers' Cookbook图" 宽度慢慢变0
      developerText.style.animation = '1s fuzzyWidth linear'
      developerText.style.animationFillMode = 'forwards'

      setTimeout(function () {
        // 整个字体区域再上移
        logoHeader.style.animation = '0.5s up linear'
        logoHeader.style.animationFillMode = 'forwards'

        setTimeout(function () {
          // DOOKBOOK慢慢放大
          var img = logoHeader.querySelectorAll('img')
          for (var i = 0; i < img.length; i++) {
            img[i].style.transition = 'all 1s'
            img[i].style.width = '4%'
            img[0].style.width = '5%'
            img[5].style.width = '5%'
          }
        }, 600)

        setTimeout(function () {
          // 显示输入框
          var label = document.querySelector('main > label')
          label.style.animation = '1.2s show linear'
          label.style.animationFillMode = 'forwards'

          // 显示页眉
          var header = document.querySelector('body > header')
          header.style.transition = 'all 1s'
          header.style.opacity = '1'
        }, 800)
      }, 1500)
    }, 1000)
  }, 1000)
}

/* 显示开场动画 */
function showIntroduce (input) {
  var envelope = document.getElementById('envelope')
  var canvas = showEnvelope()
  var timeoutID = setTimeout(function () {
    openEnvelope(envelope, canvas)
    setTimeout(function () {
      fontTwister()
    }, 1000)
  }, 3000)

  // 点击封口开启
  envelope.onclick = function () {
    openEnvelope(envelope, canvas)
    setTimeout(function () {
      fontTwister()

      // var navBox = document.querySelector('nav')
      // var suggestList = navBox.querySelectorAll('li')
      // inputSuggest(navBox, input, suggestList, mainElement)
    }, 2000)
    clearTimeout(timeoutID)
  }
}

var input = document.querySelector('input')
showIntroduce(input)

// 搜索建议下拉列表
input.onkeydown = function () {
  input.classList.add('keyup')
  setTimeout(function () {
    input.classList.remove('keyup')
  }, 100)
}

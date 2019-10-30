/**
 * dookbook动画效果
 */
function animation(mainHeader, input, developer, header) {
  // 显示dookbook动画效果
  setTimeout(function () {
    mainHeader.style.display = 'block'
    input.style.display = 'block'
    developer.style.animation = '1.2s fuzzy linear'
    developer.style.animationFillMode = 'forwards'
    setTimeout(function () {
      // "Developers' Cookbook图" 宽度慢慢变0
      developer.style.animation = '1s fuzzyWidth linear'
      developer.style.animationFillMode = 'forwards'

      setTimeout(function () {
        // 整个mainHeader再上移
        mainHeader.style.animation = '0.5s up linear'
        mainHeader.style.animationFillMode = 'forwards'

        setTimeout(function () {
          // dookbook 慢慢放大
          var img = mainHeader.querySelectorAll('img')
          for (var i = 0; i < img.length; i++) {
            img[i].style.transition = 'all 1s'
            img[i].style.width = '4%'
            img[0].style.width = '5%'
            img[5].style.width = '5%'
          }
        }, 600)

        // 输入框显示
        setTimeout(function () {
          input.style.animation = '1.2s show linear'
          input.style.animationFillMode = 'forwards'
          header.style.transition = 'all 1s'
          header.style.opacity = '1'
        }, 800)
      }, 1500)
    }, 1000)
  }, 1000)
}

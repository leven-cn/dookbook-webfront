/**
 * 印章开启动画
 */

function automatic (envelope, geek, popostmark, canvas) {
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

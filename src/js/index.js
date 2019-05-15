// // 开场动画
var header = document.querySelector('header')
var h1 = document.querySelector('h1')
var mainElement = document.querySelector('main')
var fuzzyElements = document.getElementsByClassName('fuzzy')

// 搜索建议下拉列表
var input = document.querySelector('input')
var navBox = document.querySelector('nav')
var suggestList = navBox.querySelectorAll('li')

// 三角形
var w = document.body.scrollWidth
var c = document.getElementById('myCanvas')
c.style.width = w + 'px'
console.log(document.body.scrollWidth)
var ctx = c.getContext('2d')
ctx.beginPath()
ctx.shadowBlur = 3
ctx.shadowOffsetY = 1
ctx.shadowColor = '#000'
ctx.moveTo(0, 0)
ctx.lineTo(150, 75)
ctx.lineTo(300, 0)
ctx.fillStyle = '#111'
ctx.fill()

var envelope = document.getElementsByClassName('envelope')[0]

envelope.onclick = function () {
  this.style.transition = 'all 1s'
  this.style.opacity = '0'
  setTimeout(function () {
    envelope.style.display = 'none'
    c.style.transition = 'all 3s'
    c.style.opacity = '0'
    c.style.position = 'absolute'
    c.style.top = '-720px'
    setTimeout(function () {
      header.style.display = 'block'
      mainElement.style.display = 'block'
    //   animation(h1, mainElement, fuzzyElements)
    for(var i=0;i<fuzzyElements.length;i++){
        fuzzyElements[i].style.animation="1.2s fuzzy linear";
        fuzzyElements[i].style.animationFillMode="forwards";
      }
    
      // "evelopers' C" 宽度慢慢变0
      setTimeout(function(){
        for(var i=0;i<fuzzyElements.length;i++){
          fuzzyElements[i].style.animation="1.2s fuzzyWidth linear";
          fuzzyElements[i].style.animationFillMode="forwards";
        }
    
        // "Dookbook" 字慢慢变大
        setTimeout(function(){
          h1.style.animation="1.2s fontSize linear"
          h1.style.animationFillMode="forwards"
    
          // "Dookbook"上移
          setTimeout(function(){
            h1.style.animation = "1s up linear";
            h1.style.animationFillMode="forwards";
    
            // 输入框显示
            setTimeout(function(){
              mainElement.style.animation = "1.2s show linear";
              mainElement.style.animationFillMode="forwards";
            },800)
    
          },1200)
        },1600)
      },1400)
      inputSuggest(navBox, input, suggestList, mainElement)
    }, 1500)
  }, 1000)
}

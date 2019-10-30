// dookbook
var mainHeader = document.querySelector('main header')
var mainElement = document.querySelector('main')
var header = document.querySelector('body > header')
var developer = document.getElementsByClassName('developer')[0]

// 搜索建议下拉列表
var input = document.querySelector('input')
var navBox = document.querySelector('nav')
var suggestList = navBox.querySelectorAll('li')

input.onkeydown = function () {
  input.classList.add('keyup')
  setTimeout(function () {
    input.classList.remove('keyup')
  }, 100)
}

// 封口
var envelope = document.getElementsByClassName('envelope')[0]
var popostmark = document.getElementsByClassName('postmark')[0]
var geek = document.getElementsByClassName('geek')[0]

// 信封
var w = document.body.scrollWidth
var c = document.getElementById('myCanvas')
c.style.width = w + 'px'
var ctx = c.getContext('2d')
ctx.beginPath()
ctx.shadowBlur = 6
ctx.shadowOffsetY = 2
ctx.shadowColor = '#000'
ctx.moveTo(0, 0)
ctx.lineTo(150, 70)
ctx.lineTo(300, 0)
ctx.fillStyle = '#111'
ctx.fill()

// 点击封口开启
envelope.onclick = function () {
  automatic(envelope, geek, popostmark, c)
  setTimeout(function () {
    animation(mainHeader, input, developer, header)
    inputSuggest(navBox, input, suggestList, mainElement)
  }, 2000)
  clearTimeout(times)
}

var times = setTimeout(function () {
  automatic(envelope, geek, popostmark, c)
  setTimeout(function () {
    animation(mainHeader, input, developer, header)
  }, 1000)
}, 3000)

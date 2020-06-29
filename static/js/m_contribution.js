
/**
 * contribution 页面
 */

var portraitImg = document.querySelector('#portrait img')
var portrait = document.querySelector('#portrait')
var contribution = document.querySelector('#contribution')
var mainBox = document.querySelector('main')
var ranking = document.querySelectorAll('.ranking')

portraitImg.onclick = function () {
  contribution.style.animation = 'contributionheight 1s'
  contribution.style.animationFillMode = 'forwards'
  portrait.style.animation = 'portraitheight 1.5s'
  portrait.style.animationFillMode = 'forwards'
}

for (var i = 0; i < ranking.length; i++){
  ranking[i].onclick = function () {
    contribution.style.animation = 'contribution 1s'
    contribution.style.animationFillMode = 'forwards'
    portrait.style.animation = 'portrait 1.5s'
    portrait.style.animationFillMode = 'forwards'
  }
}


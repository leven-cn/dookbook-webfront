
/**
 * contribution 页面
 */

var portraitImg = document.querySelector('#portrait img')
var portrait = document.querySelector('#portrait')
var contribution = document.querySelector('#contribution')
var mainBox = document.querySelector('main')
var ranking = document.querySelectorAll('.ranking')

portraitImg.onclick = function () {
  contribution.style.animation = 'contributionRefund 1s'
  contribution.style.animationFillMode = 'forwards'
  portrait.style.animation = 'portraitRefund 1.5s'
  portrait.style.animationFillMode = 'forwards'
}

for (var i = 0; i < ranking.length; i++){
  ranking[i].onclick = function () {
    contribution.style.animation = 'contributionBack 1s'
    contribution.style.animationFillMode = 'forwards'
    portrait.style.animation = 'portraitBack 1.5s'
    portrait.style.animationFillMode = 'forwards'
  }
}


// git-btn 选择git服务
var gitBtn = document.querySelector('.git-btn')
var popup = document.querySelector('.popup')
var mask = document.querySelector('.mask')
var shut = document.querySelector('.shut')

gitBtn.onclick = function () {
  popup.style.display = 'block'
  mask.style.display = 'block'
}

shut.onclick = function () {
  popup.style.display = 'none'
  mask.style.display = 'none'
}

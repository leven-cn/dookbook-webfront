// 输入框
var inputBox = document.querySelector('input[type="text"]');
inputBox.placeholder = "请开始你的表演 ...";
inputBox.onfocus = function(){
  this.placeholder = "";
}
inputBox.onblur = function(){
  var searchText = this.value;
  console.log(searchText);
  if(searchText){
    location.href = "/search/?q=" + searchText;
  }else{
    this.placeholder = "请开始你的表演 ...";
  }
}


// dookbook 字体效果
var h1Element =  document.querySelector("h1");
var pElement =  document.querySelector("p");
var mainElement =  document.querySelector("main");
var fuzzy =  document.getElementsByClassName("fuzzy");

// Developers' Cookbook 慢慢模糊
for(var i=0;i<fuzzy.length;i++){
  fuzzy[i].style.animation="1.2s fuzzy linear";
  fuzzy[i].style.animationFillMode="forwards";
}

// evelopers' C 宽度慢慢变0
setTimeout(function(){
  for(var i=0;i<fuzzy.length;i++){
    fuzzy[i].style.animation="1.2s fuzzyWidth linear";
    fuzzy[i].style.animationFillMode="forwards";
  }
},1400)

// dookbook 字慢慢变大
setTimeout(function(){
  h1Element.style.animation="1.2s fontSize linear";
  h1Element.style.animationFillMode="forwards";
},3000)

// 显示开发者日常菜谱和输入框
setTimeout(function(){
  document.body.style.display = "block";
  h1Element.style.marginTop="12.5%";
  pElement.style.animation="1.2s show linear";
  mainElement.style.animation="1.2s show linear";
},5000)

setTimeout(function(){
  pElement.style.display="block";
  mainElement.style.display="block";
},5100)
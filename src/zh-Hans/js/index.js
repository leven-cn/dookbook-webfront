// 输入框
var inputBox = document.querySelector('input[type="text"]');
inputBox.placeholder = "开发者的日常菜谱 ...";
inputBox.onfocus = function(){
  this.placeholder = "";
}
inputBox.onblur = function(){
  var searchText = this.value;
  console.log(searchText);
  if(searchText){
    location.href = "/search/?q=" + searchText;
  }else{
    this.placeholder = "开发者的日常菜谱 ...";
  }
}


// dookbook 字体效果
var h1Element =  document.querySelector("h1");
var mainElement =  document.querySelector("main");
var supElement =  document.querySelector("sup");
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
  supElement.style.animation = "1.2s show linear";
  supElement.style.display = "block";
  supElement.style.display = "inline-block";
},3000)

// 显示开发者日常菜谱和输入框
setTimeout(function(){
  document.body.style.display = "block";
  h1Element.style.marginTop="12.5%";
  mainElement.style.animation="1.2s show linear";
},5000)

setTimeout(function(){
  mainElement.style.display="block";
},5100)
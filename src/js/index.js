// 输入框
var inputBox = document.querySelector('input[type="text"]');
inputBox.onfocus = function(){
  this.placeholder = "";
}
inputBox.onblur = function(){
  var searchText = this.value;
  console.log(searchText);
  if(searchText){
    location.href = "/search/?q=" + searchText;
  }else{
    this.placeholder = this.placeholder.value;
  }
}

var navlist = document.querySelector("nav");

inputBox.oninput = function(){
  
}

function animation(){
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

    // dookbook 字慢慢变大
    setTimeout(function(){
      h1Element.style.animation="1.2s fontSize linear";
      h1Element.style.animationFillMode="forwards";
      supElement.style.animation = "1.2s show linear";
      supElement.style.animationFillMode = "forwards";

      //
      setTimeout(function(){
        h1Element.style.animation = "1s up linear";
        h1Element.style.animationFillMode="forwards";
        setTimeout(function(){
          mainElement.style.animation = "1.2s show linear";
          mainElement.style.animationFillMode="forwards";
        },800)
      },1200)

    },1600)

  },1400)


}

animation();
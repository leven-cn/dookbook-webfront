// 输入框
var inputBox = document.querySelector('input[type="text"]');
var navElement = document.querySelector("nav");
var navPos = 0;


function changeNavLi(pos){
  // 清除当前选择项样式
  var navBox = navElement.querySelectorAll("li")[pos].querySelector("a").style;
  navBox.background = "";
  navBox.color = "rgba(255,255,255,0.8)";

  // 重置当前选择项样式
  navBox = navElement.querySelectorAll("li")[navPos].querySelector("a").style;
  navBox.background = "rgba(255,255,255,0.4)";
  navBox.color = "rgba(0,0,0,0.7)";
}
document.body.onclick = function(e){
  navElement.style.display = "none";

  if(inputBox.placeholder == ""){
    inputBox.placeholder = "开发者的日常菜谱 ...";
  }
}

inputBox.onclick = function(e){
  e.stopPropagation();
  navElement.style.display = 'block';
  this.placeholder = "";
  changeNavLi(0);
}


inputBox.oninput = function(){
  //   var searchText = this.value;
  //   console.log(searchText);
  //   if(searchText){
  //     location.href = "/search/?q=" + searchText;
  //   }else{
  //     this.placeholder = this.placeholder.value;
  //   }
}

inputBox.onkeydown=function(event){
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if(e && e.keyCode == 38){  // 上
    if(navPos > 0){
      changeNavLi(navPos--);
    }
  }
  if(e && e.keyCode == 40){  // 下
    if(navPos < navElement.querySelectorAll("li").length-1){
      changeNavLi(navPos++);
    }
  }
};


var wheelFlag = true;
inputBox.onwheel=function(event){
  if(!wheelFlag){
    return false;
  }
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if(e && e.wheelDelta > 30){ 
    if(navPos > 0){
      changeNavLi(navPos--);
    }
  }
  if(e && e.wheelDelta < -30){
    if(navPos < navElement.querySelectorAll("li").length-1){
      changeNavLi(navPos++);
    }
  }
  wheelFlag = false;
  setTimeout(function(){
    wheelFlag = true;
  }, 200);
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
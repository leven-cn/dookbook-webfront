// 输入框
var inputBox = document.querySelector('input[type="text"]');
inputBox.onfocus = function(){
  this.placeholder = "";
}
inputBox.onblur = function(){
  var searchText = this.value;
  console.log(searchText);
  if(searchText){
    location.href = "cookbook.html?search=" + searchText;
  }else{
    this.placeholder = "请开始你的表演 ...";
  }
}


// dookbook 字体效果
var pElement =  document.querySelector("p");
var mainElement =  document.querySelector("main");
function fuzzyWords(){
  var fuzzy =  document.getElementsByClassName("fuzzy");
  for(var i=0;i<fuzzy.length;i++){
    fuzzy[i].style.animation="1.5s fuzzy linear";
    fuzzy[i].style.animationFillMode="forwards";
  }
  setTimeout(function(){
    for(var i=0;i<fuzzy.length;i++){
      fuzzy[i].style.display="none"
    }

    setTimeout(function(){
      var h1 = document.querySelector("h1");
      h1.style.animation="1.5s fontSize linear";
      h1.style.animationFillMode="forwards";

      setTimeout(function(){
        // TODO: 增加渐变效果，跟上述一致
        pElement.style.display="block";
        mainElement.style.display="block";
      }, 500);
    }, 1000);
  }, 1550); 
}
fuzzyWords();

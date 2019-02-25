/**
 * 开场动画效果
 */
function animation(h1, mainElement, sup, fuzzyElements){
    // "Developers' Cookbook" 慢慢模糊
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
        h1.style.animation="1.2s fontSize linear";
        h1.style.animationFillMode="forwards";
        sup.style.animation = "1.2s show linear";
        sup.style.animationFillMode = "forwards";
  
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
  }
    
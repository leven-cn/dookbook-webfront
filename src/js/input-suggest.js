/**
 * 输入框搜索建议下拉列表
 */

var navPos = 0;

/**
 * 列表选择事件触发后的处理函数
 */
function handleSelectSuggest(suggestList, pos){
  // 清除当前选择项样式
  var suggestItem = suggestList[pos].querySelector("a").style;
  suggestItem.background = "";
  suggestItem.color = "rgba(255,255,255,0.8)";

  // 重置当前选择项样式
  suggestItem = suggestList[navPos].querySelector("a").style;
  suggestItem.background = "rgba(255,255,255,0.4)";
  suggestItem.color = "rgba(0,0,0,0.7)";
}

/**
 * 输入框搜索建议下拉列表
 */
function inputSuggest(navBox, input, suggestList){

  // 点击输入框,清空输入框内文字，并且列出下拉列表
  input.onclick = function(event){
    event.stopPropagation();

    this.placeholder = "";

    navBox.style.display = 'block';
    handleSelectSuggest(suggestList, 0);
  };

  // 点击页面其他地方，隐藏下拉列表
  document.body.onclick = function(e){
    if(input.placeholder == ""){
      input.placeholder = "开发者的日常菜谱 ...";
    }
    navBox.style.display = "none";
  };

  // 键盘上下键控制选择
  input.onkeydown = function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];

    if(e && e.keyCode == 38){  // 上
      if(navPos > 0){
        handleSelectSuggest(suggestList, navPos--);
      }
    }

    if(e && e.keyCode == 40){  // 下
      if(navPos < suggestList.length-1){
        handleSelectSuggest(suggestList, navPos++);
      }
    }

    // 回车跳转页面
    if(e && e.keyCode == 13){  // 回车
      console.log("huiche");
    }
  };

  // 鼠标滑动控制选择
  var wheelFlag = true;  // 设置信号量，用于阻止过于频繁的滑动事件触发
  input.onwheel = function(event){
    if(!wheelFlag){
      return false;
    }

    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.wheelDelta > 30){  // 向上滑动
      if(navPos > 0){
        handleSelectSuggest(suggestList, navPos--);
      }
    }
    if(e && e.wheelDelta < -30){  // 向下滑动
      if(navPos < suggestList.length-1){
        handleSelectSuggest(suggestList, navPos++);
      }
    }
    wheelFlag = false;
    setTimeout(function(){
      wheelFlag = true;
    }, 200);  // 200毫秒内阻止滑动事件
  };

  // 输入框输入建议
  input.oninput = function(){
    //   var searchText = this.value;
    //   console.log(searchText);
    //   if(searchText){
    //     location.href = "/search/?q=" + searchText;
    //   }else{
    //     this.placeholder = this.placeholder.value;
    //   }
  }

  for(var i=0;i<navBox.querySelectorAll("li").length;i++){
    var liList = navBox.querySelectorAll("li")[i];

    liList.onmouseover = function(){
      for(var j=0;j<navBox.querySelectorAll("li").length;j++){
        navBox.querySelectorAll("li")[j].querySelector("a").style.background = "";
        navBox.querySelectorAll("li")[j].querySelector("a").style.color = "rgba(255,255,255,0.8)";
      }
      this.querySelector("a").style.background = "rgba(255,255,255,0.4)";
      this.querySelector("a").style.color = "rgba(0,0,0,0.7)";
    }

    liList.onmouseout = function(){
      this.querySelector("a").style.background = "";
      this.querySelector("a").style.color = "rgba(255,255,255,0.8)";
      handleSelectSuggest(suggestList, 0);
    }
  }
}

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
 * 鼠标滑动事件处理
 * @param {*} suggestList 
 */
function mouseoverEventHandler(suggestList){
  for(var i=0;i<suggestList.length;i++){
    var item = suggestList[i];

    item.onmouseover = function(){
      var previousPos = navPos;
      for(var j=0; j<suggestList.length;j++){
        if(suggestList[j] == this){
          navPos = j;
          break;
        }
      }
      handleSelectSuggest(suggestList, previousPos);
    };
  }
}


/**
 * 输入框搜索建议下拉列表
 */
function inputSuggest(navBox, input, suggestList, mainElement){

  // 初始化
  navPos = 0;
  handleSelectSuggest(suggestList, navPos);

  // 实现创建存放搜索建议的Node
  var newBox = document.createElement("nav");
  var newUl = document.createElement("ul");
  newBox.appendChild(newUl);
  mainElement.appendChild(newBox);

  // 点击输入框,清空输入框内文字，并且列出下拉列表
  input.onclick = function(event){
    event.stopPropagation();

    if(!this.value){
      this.placeholder = "";

      // 默认选中第一个
      navBox.style.display = 'block';
      var previousPos = navPos;
      navPos = 0;
      handleSelectSuggest(suggestList, previousPos);
    }
  };

  // 点击页面其他地方，隐藏下拉列表
  document.body.onclick = function(e){
    if(input.placeholder == ""){
      input.placeholder = "开发者的日常菜谱 ...";
    }
    navBox.style.display = "none";
    newBox.style.display = "none";

    // 清空已选择的样式及位置
    var previousPos = navPos;
    navPos = 0;
    handleSelectSuggest(suggestList, previousPos);
  };

  // 键盘控制
  input.onkeydown = function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];

    // 向上键
    if(e && e.keyCode == 38){
      if(navPos > 0){
        handleSelectSuggest(suggestList, navPos--);
      }
    }

    // 向下键
    if(e && e.keyCode == 40){
      if(navPos < suggestList.length-1){
        handleSelectSuggest(suggestList, navPos++);
      }
    }

    // 回车跳转页面
    if(e && e.keyCode == 13){  // 回车
      window.location = suggestList[navPos].querySelector("a").href;
    }
  };

  // 鼠标滑动控制选择
  var wheelFlag = true;  // 设置信号量，用于阻止过于频繁的滑动事件触发
  document.body.onwheel = function(event){
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
  var inputFlag = true;
  input.oninput = function(event){
    event.stopPropagation();

    if(!inputFlag){
      return false;
    }

    var searchText = this.value;
    if(searchText){

      // 构造搜索建议列表
      var xhr = new XMLHttpRequest;
      xhr.open("GET", "/search/?q="+searchText);
      xhr.send();
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            var data = JSON.parse(xhr.responseText);
            console.log(data);

            var hints = data.hints;
            var lang = (location.pathname=="/zh-Hans/") ? "zh-Hans" : "en";
            newUl.innerHTML = "";
            for(var i=0;i<hints.length;i++){
              var url = "/cookbook/?lang=" + lang + "&id=" + hints[i][1];
              newUl.innerHTML += '<li><a href="'+url+'">'+hints[i][0]+'<em>'+hints[i][2]+'</em></a></li>';
            }
          }else{
            newUl.innerHTML = '<li><a href="#">暂无搜索结果</a></li>';
          }
          newBox.style.display = 'block';
        }
      }

      navBox.style.display = 'none';

      inputFlag = false;
      setTimeout(function(){
        inputFlag = true;
      }, 450);

    }else{
      // 清空输入框的事件处理
      newBox.style.display = "none";
      navBox.style.display = "block";
    }
  }

  // 鼠标控制选择
  mouseoverEventHandler(suggestList);
}

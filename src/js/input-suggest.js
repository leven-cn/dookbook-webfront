/**
 * 输入框搜索建议下拉列表
 */

const MOUSE_WHEEL_DELTA = 30;
const MOUSE_WHEEL_TIMEOUT = 200;
const KEYDOWN_TIMEOUT = 300;
var navPos = 0;

/**
 * 列表选择事件触发后的处理函数
 * @param {Element[]} suggestList 下拉列表
 * @param {BigInteger} pos 清除的位置
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
 * @param {Element[]} suggestList 下拉列表
 */
function mouseoverEventHandler(suggestList){
  for(var i=0;i<suggestList.length;i++){
    var item = suggestList[i];
    item.index = i;

    item.onmouseover = function(){
      var previousPos = navPos;
      navPos = this.index;
      handleSelectSuggest(suggestList, previousPos);
    };
  }
}


/**
 * 键盘按键事件处理
 * @param {Element[]} suggestList 下拉列表
 */
function keydownEventHandler(suggestList){
  document.body.onkeydown = function(event){
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
}


/**
 * 鼠标滚轮或触控板滑动事件处理
 * @param {Element[]} suggestList 下拉列表
 * @param {BigInteger} delta 滑动距离感应阀值
 * @param {BigInteger} timeout 阻隔时长
 */
function mousewheelEventHandler(suggestList, delta, timeout){
  var wheelFlag = true;  // 设置信号量，用于阻止过于频繁的滑动事件触发
  document.body.onwheel = function(event){
    if(!wheelFlag){
      return false;
    }

    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.wheelDelta > delta){  // 向上滑动
      if(navPos > 0){
        handleSelectSuggest(suggestList, navPos--);
      }
    }
    if(e && e.wheelDelta < -delta){  // 向下滑动
      if(navPos < suggestList.length-1){
        handleSelectSuggest(suggestList, navPos++);
      }
    }

    wheelFlag = false;
    setTimeout(function(){
      wheelFlag = true;
    }, timeout);  // 200毫秒内阻止滑动事件
  };
}


/**
 * 恢复到初始状态
 * @param {Element[]} suggestList 
 */
function initInputSuggest(suggestList){
  var previousPos = navPos;
  navPos = 0;
  handleSelectSuggest(suggestList, previousPos);

  // 事件注册
  keydownEventHandler(suggestList);  // 键盘按键
  mousewheelEventHandler(suggestList, MOUSE_WHEEL_DELTA, MOUSE_WHEEL_TIMEOUT);  // 鼠标滚轮滑动
  mouseoverEventHandler(suggestList);  // 鼠标滑动
}


/**
 * 输入框搜索建议下拉列表
 * @param {Element} navBox <nav>元素
 * @param {Element} input 搜索框<input>元素
 * @param {Element[]} suggestList 下拉列表
 * @param {Element} <main>元素
 */
function inputSuggest(navBox, input, suggestList, mainElement){

  // 初始化
  initInputSuggest(suggestList);

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
      navBox.style.display = 'block';
      newBox.style.display = 'none';
      initInputSuggest(suggestList);
    }
  };

  // 点击页面其他地方，隐藏下拉列表
  document.body.onclick = function(e){
    if(input.placeholder == ""){
      var prompt = input.getAttribute("data-prompt"); // 获取data-prompt 属性的值
      input.placeholder = prompt;
    }
    navBox.style.display = "none";
    newBox.style.display = "none";
    initInputSuggest(suggestList);
  };

  // 输入框输入建议
  var inputFlag = true;
  input.oninput = function(event){
    event.stopPropagation();

    var searchText = this.value;
    if(searchText){
      if(!inputFlag){
        return false;
      }

      // 构造搜索建议列表
      var xhr = new XMLHttpRequest;
      xhr.open("GET", "/search/?q="+searchText);
      xhr.send();
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            var data = JSON.parse(xhr.responseText);

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
          navBox.style.display = 'none';
          newBox.style.display = 'block';
          var newSuggestList = newBox.querySelectorAll("li");
          initInputSuggest(newSuggestList);
        }
      }

      // 设置阻断事件间隔，过滤过于频繁的请求
      inputFlag = false;
      setTimeout(function(){
        inputFlag = true;
      }, KEYDOWN_TIMEOUT);

    }else{
      // 清空输入框的处理
      newBox.style.display = "none";
      navBox.style.display = "block";
      initInputSuggest(suggestList);
    }
  } 
}

var input = document.querySelector("input[type='text']");
var navBox = document.querySelector("nav");
var navPos = -1;


// 输入内容时请求接口
var inputFlag = true;
// input 输入时事件
input.oninput = function(){
  // event.stopPropagation();  // 阻止事件冒泡
  if(!inputFlag){
    return false;
  }

  if(this.value != ""){
    navBox.style.display = "block";
    var xhr = new XMLHttpRequest;
    xhr.open("GET", "/search/?q="+this.value);
    xhr.send();
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
        if(xhr.status == 200){
          navBox.innerHTML = "";
          var data = JSON.parse(xhr.responseText);
          for(var i=0;i<data.hints.length;i++){
            var dataHints = data.hints[i];
            console.log(data)
            navBox.innerHTML += '<ul><li><a href="#">'+dataHints[0]+'<em>'+dataHints[2]+'</em></a></li></ul>';
            var navList = navBox.querySelectorAll("li");
            navListMouseover(navList);
            keyElement(navList);
            wheelElement(navList);
          }
        }else{
          navBox.innerHTML = '<ul><li><a href="#">暂无搜索结果</a></li></ul>';
        }
      }
    }
    inputFlag = false;
    setTimeout(function(){
      inputFlag = true;
    },200); // 阻止输入太快请求次数
  }else{
    // 输入框为空时 下拉列表隐藏
    navBox.style.display = "none";
  }
}

// input 点击事件
input.onclick = function(event){
  event.stopPropagation();   // 阻止事件冒泡
  this.placeholder = "";
  navBox.style.display = "block";
}

// 清除和添加样式
function navListStyle(element,pos){
  // 清除样式
  for(var i=0;i<element.length;i++){
    var item = element[i].querySelector("a").style;
    item.background = "#fff";
    item.color = "#666";
  }

  // 添加样式
  var navitem = element[pos].querySelector("a").style;
  navitem.background = "rgb(28, 172, 244)";
  navitem.color = "#fff";
}

// 键盘事件上下键改变样式和下标
function keyDown(element){
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if(e && e.keyCode == 38){ // 键盘上
    console.log("shang");
    if(navPos != 0){
      navPos = navPos-1;
      navListStyle(element,navPos);
    }
  }
  
  if(e && e.keyCode == 40){ // 键盘下
    console.log("xia");
    if(navPos < element.length-1){
      navPos = navPos+1;
      navListStyle(element,navPos);
    }
  }
}

// 键盘事件（上下键）
function keyElement(element){
  // input 键盘事件
  input.onkeydown = function(event){
    event.stopPropagation();   // 阻止事件冒泡
    keyDown(element);
  }
  // navBox 增加键盘事件
  navBox.onkeydown = function(){
    keyDown(element);
  }
}

// 鼠标滚轮、触摸板改变样式和下标
var wheelFlag = true;
function wheelEvent(element){
  if(!wheelFlag){
    return false;
  }

  var e = event || window.event || arguments.callee.caller.arguments[0];
  if(e && e.wheelDelta > 10){  // 往上滑
    if(navPos > 0){
      navPos = navPos-1;
      navListStyle(element,navPos);
    }
  }

  if(e && e.wheelDelta < -10){ // 往下滑
    if(navPos < element.length-1){
      navPos = navPos+1;
      navListStyle(element,navPos);
    }
  }
  wheelFlag = false;
  setTimeout(function(){
    wheelFlag = true;
  },300) // 阻止滚轮、模版滑动过快
}

// 滚轮、触发模版事件
function wheelElement(element){
  // input 添加滚轮、触发模版事件
  input.onwheel = function(event){
    wheelEvent(element)
  }
  // navBox 添加滚轮、触发模版事件
  navBox.onwheel = function(event){
    wheelEvent(element)
  }
}

// 鼠标滑过事件（改变列表样式和下标）
function navListMouseover(element){
  for(var i=0;i<element.length;i++){
    var item = element[i];
    item.index = i;
    element[i].onmouseover = function(){
      navPos = this.index;
      navListStyle(element,navPos)
    }
  }
}

// 点击其它地方下拉消失
document.body.onclick = function(){
  input.placeholder = "开发者的日常菜谱 ...";   // 点击 body 元素区域 input框的 placeholder 提示语恢复
  navBox.style.display = "none";
}
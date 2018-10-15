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
var h1Element =  document.querySelector("h1");
var pElement =  document.querySelector("p");
var mainElement =  document.querySelector("main");
var fuzzy =  document.getElementsByClassName("fuzzy");

for(var i=0;i<fuzzy.length;i++){
	fuzzy[i].style.animation="1.5s fuzzy linear";
	fuzzy[i].style.animationFillMode="forwards";
}

setTimeout(function(){
	for(var i=0;i<fuzzy.length;i++){
		fuzzy[i].style.display="none"
	}
	h1Element.style.animation="1.5s fontSize linear";
	h1Element.style.animationFillMode="forwards";

	pElement.style.display="block";
	mainElement.style.display="block";
},1550)



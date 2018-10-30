// 左侧下拉菜单

var toc = document.getElementsByClassName("toc")[0].querySelector("ul");
var tocList = toc.querySelectorAll("li");

for(var i=0;i<tocList.length;i++){
	if(tocList[i].querySelector("ul") != null){
		tocList[i].style.background = "url('../img/down.svg') no-repeat 230px 9px"
		tocList[i].style.backgroundSize = "10px"
	}
	tocList[i].onclick = function(){
		var ulElement = this.querySelector("ul");
		var aElement = this.querySelector("a").style;
		if(this.className == ""){		
			for(var j=0;j<tocList.length;j++){
				tocList[j].className = "";
				tocList[j].querySelector("a").style.background = "";
			}
			this.className = "active";
			if(ulElement != null){
				aElement.background = "url('../img/down-btn.svg') no-repeat 230px 12px #fff"
				aElement.backgroundSize = "18px"
				ulElement.style.display = "block";
			}
		}else{
			this.className = "";
			if(ulElement != null){
				aElement.background = "";
				ulElement.style.display = "none";
			}
		}
	}
}

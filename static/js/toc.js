/** TOC tree of content page */

const selectedClassName = "active";

var tocList = document.querySelectorAll(".toc>ul>li");
var selectedMenu = null;  // 当前选中的菜单
var selectedSubmenu = null;  // 当前选中的子菜单

for (var i = 0; i < tocList.length; i++) {
  var menu = tocList[i];
  if (menu.querySelector("ul")) {
    menu.querySelector("a").classList.add("fold");

    // 子菜单点击事件处理
    var submenuList = menu.querySelectorAll("ul>li");
    for(var j = 0; j < submenuList.length; j++){
      submenuList[j].onclick = function(event){
        event.stopPropagation();
        if(!this.classList.contains("selected")){
          // 清除上一次选中的菜单样式
          if (selectedSubmenu) {
            selectedSubmenu.classList.remove("selected");
          }
          selectedSubmenu = this;
          this.classList.add("selected");
        }
      }
    }

  }

  // 展开或折叠子菜单
  menu.onclick = function () {
    if (!this.classList.contains(selectedClassName)) {
      // 清空当前选中的菜单样式
      if (selectedMenu) {
        selectedMenu.classList.remove(selectedClassName);
        selectedMenu.querySelector("a").classList.replace("unfold", "fold");
        // selectedSubmenu = null;
      }
      // 点击二级菜单清除子菜单样式
      if (selectedSubmenu) {
        selectedSubmenu.classList.remove("selected");
      }
      this.classList.add(selectedClassName);
      selectedMenu = this;
      this.querySelector("a").classList.replace("fold", "unfold");
    }else{
      this.classList.remove(selectedClassName);
      this.querySelector("a").classList.replace("unfold", "fold");
    }
  }
}
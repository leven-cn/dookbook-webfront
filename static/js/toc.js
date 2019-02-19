/** TOC tree of content page */

const selectedClassName = "active";

var tocList = document.querySelectorAll(".toc>ul>li");
var selectedMenu = null;  // 当前选中的菜单

for (var i = 0; i < tocList.length; i++) {
  var menu = tocList[i];
  if (menu.querySelector("ul")) {
    menu.querySelector("a").classList.add("fold");
  }

  // 展开或折叠子菜单
  menu.onclick = function () {
    if (!this.classList.contains(selectedClassName)) {
      // 清空当前选中的菜单样式
      if (selectedMenu) {
        selectedMenu.classList.remove(selectedClassName);
        selectedMenu.querySelector("a").classList.replace("unfold", "fold");
      }
      this.classList.add(selectedClassName);
      selectedMenu = this;
      this.querySelector("a").classList.replace("fold", "unfold");
    }
  }
}
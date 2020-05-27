/**
 * wikipedia页面
 */

allTables = document.querySelectorAll("table");

for (var i = 0; i < allTables.length; i++) {
  figElement = allTables[i].querySelector("figure");
  if(figElement){
    addClass(allTables[i], "table-img");
  }
}

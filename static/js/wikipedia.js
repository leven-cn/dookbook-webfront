/**
 * wikipedia页面
 */

allTables = document.querySelectorAll('table')

for (var i = 0; i < allTables.length; i++) {
  if (allTables[i].querySelector('figure')) {
    addClass(allTables[i], 'table-img')
  }
}

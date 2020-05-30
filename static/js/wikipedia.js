/**
 * wikipedia页面
 */

allTables = document.querySelectorAll('table')

for (var i = 0; i < allTables.length; i++) {
  if (allTables[i].querySelector('figure')) {
    addClass(allTables[i], 'table-img')
  }

  var allTableTrs = allTables[i].querySelectorAll('tr')

  for (var j = 0; j < allTableTrs.length; j++) {
    if (allTableTrs[j].querySelectorAll('td').length == 1) {
      addClass(allTableTrs[j].querySelector('td'), 'first-width')
    }
  }
}

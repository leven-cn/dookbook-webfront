// 开场动画
var h1 =  document.querySelector("h1");
var mainElement =  document.querySelector("main");
var sup =  document.querySelector("sup");
var fuzzyElements =  document.getElementsByClassName("fuzzy");
animation(h1, mainElement, sup, fuzzyElements);

// 搜索建议下拉列表
var input = document.querySelector('input[type="text"]');
var navBox = document.querySelector("nav");
var suggestList = navBox.querySelectorAll("li");
inputSuggest(navBox, input, suggestList);

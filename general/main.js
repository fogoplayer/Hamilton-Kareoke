var nav = document.getElementById("nav");
var overlay = document.getElementById("overlay");
var act1Wrapper = document.getElementById("act1Wrapper");
var act2Wrapper = document.getElementById("act2Wrapper");
var modal = document.getElementById("modal");
var modalTitle = document.getElementById("modalTitle");
var lyrics = document.getElementById("lyrics");

var toggleNav = function(){
  if (nav.className === "closed") {
    nav.className = "open";
    overlay.style.display = "block";
    overlay.className = "visible";
  }else{
    nav.className = "closed";
    act1Wrapper.style.height = "0px";
    act2Wrapper.style.height = "0px";
    overlay.style.display = "none";
    overlay.className = "";
  }
};

var toggleAct1 = function(){
  if (act1Wrapper.style.height === "1104px") {
    act1Wrapper.style.height = "0px";
  }else{
    act1Wrapper.style.height = "1104px";
  }
};

var toggleAct2 = function(){
  if (act2Wrapper.style.height === "1104px" ) {
    act2Wrapper.style.height = "0px";
  }else{
    act2Wrapper.style.height = "1104px";
  }
};

var toggleLyrics = function(name, video) {
  console.log('name = ' + name + " video = " + video);
  if (modal.style.display === "block") {
    lyrics.innerHTML = "";
    modal.style.display = "none";
  }else{
    lyrics.innerHTML = video + '<div id = "thumbnail"><img src = "images/hamilton.jpg"/></div>' + name.lyrics;
    modalTitle.innerHTML = name.title;
    modal.style.display = "block";
  }
};

var scroll = function (songNumber) {
  var columns = Math.ceil(window.innerWidth/400);
  var row = Math.ceil(songNumber/columns);
  
  var yCoord = window.innerWidth * '.90' / columns * (row - 1);
  window.scrollTo(0, yCoord);
  toggleNav();
};

var liteSwitch = function (channel) {
  window.location = channel + ".html";
};
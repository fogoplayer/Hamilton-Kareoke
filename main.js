var html = document.getElementById("html");
var documentTitle = document.getElementById("documentTitle");
var header = document.getElementById("header");
var navButton = document.getElementById("navButton");
var title = document.getElementById("title");
var content = document.getElementById("content");
var nav = document.getElementById("nav");
var overlay = document.getElementById("overlay");
var objectScript = document.getElementById("objectScript");
var url = window.location.pathname.substring(9, window.location.pathname.length - 5);
var hash = window.location.hash;
var tempLocation = "0.0";
var shuffle = false;
var songHistory = [];

//Create Song Cards
var loadSongList = function(hashClear) {
  if (hashClear === true){
    document.location.hash = "";
  }
  var lineCount = "";
  document.getElementById("header").innerHTML = `<div id = "navButton" class = "headerButton" onclick = "toggleNav()"><i class="material-icons navButton">menu</i></div><div id = "title">` + window[url].title + `</div>`;
  title.width = "calc(100% - 64px * 4";
  document.title = window[url].title;
  content.className = "content";
  content.innerHTML = "";
  nav.innerHTML = "";
  for(var i = 0; i < window[url].songs.length; i++){
    content.innerHTML = content.innerHTML + 
      `<div class = "album">` + window[url].songs[i][0].title + `</div>`;
    nav.innerHTML = nav.innerHTML +
      `<button class = "albumNav" id = "` + "album" + (i + 1) + `" onclick = "toggleAlbum('` +  "album" + (i + 1)  + `Wrapper')">` + window[url].songs[i][0].title + `</button><div id = "` + "album" + (i + 1) + `Wrapper" class = "wrapper" style = "height:0px">`;
      
    for(var j = 1; j < window[url].songs[i].length; j++) {
      if (window[url].songs[i][j].lines ===  "2") {
        lineCount = " twoLine";
      }else{
        lineCount = "";
      }
      
      //Figure out which buttons to use
      var buttons = window[url].songs[i][j].buttons;
      var buttonHTML;
      var reference = i + "." + j;
      if(buttons.length === 1){
        buttonHTML =
        `<button class = "songLink whole" onclick = "loadLyrics('` + reference + `', '0')">` + window[url].songs[i][j].buttons[0] + `</button>`;
      }else if(buttons.length === 2){
        buttonHTML =
        `<button class = "songLink firstHalf" onclick = "loadLyrics('` + reference + `', '0')">` + window[url].songs[i][j].buttons[0] + `</button>` +
        `<button class = "songLink secondHalf" onclick = "loadLyrics('` + reference + `', '1')">` + window[url].songs[i][j].buttons[1] + `</button>`;
      }else if(buttons.length === 3){
        buttonHTML = 
        `<button class = "songLink firstThird" onclick = "loadLyrics('` + reference + `', '0')">` + window[url].songs[i][j].buttons[0] + `</button>` +
        `<button class = "songLink secondThird" onclick = "loadLyrics('` + reference + `', '1')">` + window[url].songs[i][j].buttons[1] + `</button>` +
        `<button class = "songLink thirdThird" onclick = "loadLyrics('` + reference + `', '2')">` + window[url].songs[i][j].buttons[2] + `</button>`;
      }
      
      //Check for blank lyric values
      if (window[url].songs[i][j].lyrics[1] === ""){
        window[url].songs[i][j].lyrics[1] = window[url].songs[i][j].lyrics[0];
      }
      if (window[url].songs[i][j].lyrics[2] === ""){
        window[url].songs[i][j].lyrics[2] = window[url].songs[i][j].lyrics[0];
      }

      //Add song cards to main body
      content.innerHTML = content.innerHTML + 
        `<div class = "songCard">
            <img src = "images/` + url + `/` + window[url].songs[i][j].id + `.jpg"/>
            <div class = "songTitle` + lineCount + `">` + window[url].songs[i][j].title + `</div>
            ` + buttonHTML + `
        </div>`;
      //Add songs to nav menu
      var wrapper = document.getElementById( "album" + (i + 1)  + "Wrapper");
      wrapper.innerHTML = wrapper.innerHTML + 
        `<button class = "songNav" onclick = "scroll(` + j + `)">` + j + `. ` + window[url].songs[i][j].title + `</button>`;
      content.innerHMTL = "0";
    }
  }
};

var start = function() {
  header = header.style;
  html.style.setProperty("--accentColor", window[url].headerColor);
  header.color = window[url].headerTextColor;
  var link = document.createElement('link');
    link.type = 'image/jpeg';
    link.rel = 'icon';
    link.href = 'images/' + url + "/" + url + ".jpg";
    console.log(link);
    document.getElementsByTagName('head')[0].appendChild(link);
};

var toggleNav = function(){
  if (nav.className === "closed") {
    nav.className = "open";
    overlay.style.display = "block";
  }else{
    nav.className = "closed";
    overlay.style.display = "none";
    var stop = false;
    for(var i = 1; stop !== true; i++){
      if(document.getElementById("album" + i.toString() + "Wrapper") === null){
        stop = true;
      }else if(document.getElementById("album" + i.toString() + "Wrapper").style.height === "auto"){
        toggleAlbum("album" + i + "Wrapper");
      }
    }
  }
};

var toggleAlbum = function(id){
  var wrapper = document.getElementById(id);
  if (document.getElementById(id).style.height === "0px") {
    document.getElementById(id).style.height = "auto";
  }else{
    document.getElementById(id).style.height = "0px";
  }
};

var replace = function(str, word) {
  str = str.replace(word, badWords[word]);
  str = str.replace(word.substring(0,1).toUpperCase() + word.substring(1), badWords[word].substring(0,1).toUpperCase() + badWords[word].substring(1).toUpperCase());
  return str;
};

var cleanLyrics = function(album, song, type){
  var str = window[url].songs[album][song].lyrics[type];
  console.log(str);
  //replace compound words
  str = str.replace("", "");
  str = str.replace("", "");
  //replace single words
  str = replace(str, "bastard");
  str = replace(str, "damn");
  str = replace(str, "intercourse");
  str = replace(str, "whore");
  window[url].songs[album][song].lyrics[type] = str;
};

var changeSong = function(direction) {
  for(var i = 0; tempLocation.substring(i, i + 1) != "."; i++){
    var album = parseInt(tempLocation.substring(0, i + 1));
    var song = parseInt(tempLocation.substring(i + 2));
  }
  if (shuffle === false) {
    song += direction;
    
    if (song < 1){
      album -= 1;
      if (album < 0){
        album = window[url].songs.length - 1;
      }
      song = window[url].songs[album].length - 1;
    }else if (song > window[url].songs[album].length - 1){
      album += 1;
      if (album > window[url].songs.length - 1){
        album = 0;
      }
      song = 1;
    }
    var reference = album.toString() + "." + song.toString();
  }else if (direction < 0 && songHistory.length > 1){
    reference = songHistory[songHistory.length - 2];
    songHistory = songHistory.slice(0,songHistory.length - 1);
  }else{
    album = Math.floor(Math.random()*(window[url].songs.length));
    song = Math.floor(Math.random()*(window[url].songs[album].length)) + 1;
    songHistory.push((album.toString() + "." + song.toString()));
    reference = album.toString() + "." + song.toString();
  }
  console.log(songHistory);
  if (hash.substring(hash.length - 1, hash.length) > window[url].songs[album][song].buttons.length - 1){
    var hashValue = "0";
  }else{
    hashValue = hash.substring(hash.length - 1, hash.length);
  }
  loadLyrics(reference, hashValue);
};

var toggleShuffle = function(){
  var shuffleButton = document.getElementById("shuffle");
  if (shuffle === false) {
    shuffle = true;
    shuffleButton.style.opacity = "1";
  }else{
    shuffle = false;
    shuffleButton.style.opacity = "0.5";
  }
};

var loadLyrics = function(reference, type) {
  console.log(reference + type);
  //Separate reference into album and song
  var album;
  var song;
  for(var i = 0; reference.substring(i, i + 1) != "."; i++){
    album = reference.substring(0, i + 1);
    song = reference.substring(i + 2);
  }
  tempLocation = album.toString() + "." + song.toString();
  console.log(tempLocation);
  cleanLyrics(album, song, type);
  //Load content
  content.className = "lyrics";
  type = type.toLowerCase();
  if (shuffle === false){
    var shuffleColor = "0.3";
  }else{
    shuffleColor = "1";
  }
  document.getElementById("header").innerHTML = `<div id = "navButton" class = "headerButton" onclick = "clearHashLoadSong()"><i class="material-icons navButton">arrow_back</i></div><div id = "title" style = "width:calc(100% - 64px * 4)">` + window[url].songs[album][song].title + `</div><div class = "headerButton" onclick = "changeSong(-1)"><i class="material-icons navButton">skip_previous</i></div><div class = "headerButton" style = "opacity:` + shuffleColor  + `" id = "shuffle" onclick = "toggleShuffle()"><i class="material-icons navButton">shuffle</i></div><div class = "headerButton" onclick = "changeSong(1)"><i class="material-icons navButton">skip_next</i></div>`;
  content.innerHTML = window[url].songs[album][song].lyrics[type];
  var id = window[url].songs[album][song].url[type].substring(17);
  
  content.innerHTML = `<iframe src="https://www.youtube.com/embed/` + id + `?autoplay=1&controls=0&showinfo=0&rel=0" frameborder="0"></iframe>` + content.innerHTML;
  document.location.hash = reference + type.substring(0,1);
};

var clearHashLoadSong = function(){
  document.location.hash = "";
  loadSongList();
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

//On page load
start();
loadSongList();

if(window.location.hash) {
  loadLyrics(hash.substring(1,hash.length - 1), hash.substring(hash.length - 1, hash.length));
}
//This comment exists to prevent ACE's ... bug
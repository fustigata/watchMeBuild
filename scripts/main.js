var html = '<div class="bg-overlay"></div><div class="bg-overlay-dim"></div><div class="profile-box"><div class="cover-photo"></div><div class="profile-pic"></div><h2><strong>Ali El Zoheiry</strong></h2><p>Lorem ipsum dolor sit amet.</p><p>Front-End Guru.</p><p>Front-End developer @ <a href="http://www.elvesapp.com" target="_blank"><strong>Elves</strong></a></p><ul><li><a href="#"><i class="fa fa-facebook-square"></i></a></li><li><a href="#"><i class="fa fa-stack-overflow"></i></a></li><li><a href="#"><i class="fa fa-github-square"></i></a></li><li><a href="#"><i class="fa fa-instagram"></i></a></li><li><a href="#"><i class="fa fa-flickr"></i></a></li></ul><p class="extra-margin">+20(11)443351050</p><p class="extra-margin">ali.elzoheiry@gmail.com</p></div>';
var css = '.bg-overlay{width: 100%; height: 100%; position: absolute; background-image: url("images/cover-photo.jpg");  background-repeat: no-repeat; background-size: cover;} .bg-overlay-dim{position: absolute;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.1);} body { margin: 0;  padding: 0; font-family: "raleway"}.profile-box { width: 320px; height: 410px;  background-color: #FFF; border-radius: 10px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.5);}.cover-photo { width: 100%;  height: 140px;  background-image: url("images/cover-photo.jpg"); background-size: cover; border-radius: 10px;  border-bottom-left-radius: 0; border-bottom-right-radius: 0;  background-position: 50% 50%; background-repeat: no-repeat;}.profile-pic {  background-image: url("images/self.jpg"); background-size: cover; background-repeat: no-repeat; width: 110px; height: 110px;  margin-left: auto;  margin-right: auto; border-radius: 50%; margin-top: -60px;  border: solid 5px #FFF;}h2 {  text-align: center; margin-top: 5px;  margin-bottom: 5px; color: rgba(0, 0, 0, 0.7);}strong { font-weight: bold;}p {  font-weight: 300; padding-left: 15px; padding-right: 15px;  text-align: center; margin-top: 5px;  margin-bottom: 0; font-size: 14px;  color: rgba(0, 0, 0, 0.9);}p a {  color: #000;}ul { padding: 0; margin: 0;  list-style: none; text-align: center; margin-top: 10px;}ul li { display: inline-block;  margin-right: 10px;}ul li:last-child {  margin-right: 0;}ul li a {  color: rgba(0, 0, 0, 0.7);  text-decoration: none;  display: inline;  font-size: 28px;}ul li a:hover {  color: #000;}.extra-margin {  margin-top: 10px;}';
var cssLines;
var htmlLines;
var htmlA;
var cssA;
var finalTags = [];
var readableHtml;
var cssBlocks = [];
var globalDelay = 20;
var cssArea;
var firstScriptRun = true;

$(document).ready(function(){
  $("#write-speed-slider").val(globalDelay);
  start();
});

document.getElementById('write-speed-slider').addEventListener('change', function(){
  globalDelay = parseInt(this.value);
});

var Tag = function(content, innerTags){
  this.content = content;
  this.innerTags = innerTags || new Array();
}

var CssBlock = function(selector, declarationArray) {
  this.selector = selector;
  this.declarations = declarationArray || new Array();
}

var Declaration = function(property, val) {
  this.property = property;
  this.val = val;
}


function start() {
  htmlA = html.split('');
  cssLines = css.split('}');
  cssLines.splice(cssLines.length-1, 1);
  cssA = css.split('');
  readableHtml = html.split('><');
  readableHtml.forEach(function(l, i){
    if(i == 0){
      readableHtml[i] = readableHtml[i] + '>';
    }
    else if(i == (readableHtml.length - 1)){
      readableHtml[i] = '<' + readableHtml[i];
    }
    else{
      readableHtml[i] = '<' + readableHtml[i] + '>';
    }
  });
  cssLines.forEach(function(l, i){
    cssLines[i] += '}';
  });
  generateCssBlocks();
  readyIDE();
  document.getElementsByClassName('html-line')[0].insertAdjacentHTML('afterend', '<strong class="cursor">|</strong>')
  writeCode(0);
  injectHtml(0);
}

var counter = 0;
function writeCode(index){
  if(counter == readableHtml[index].length) {
    typeCallback(index);
    return;
  }
  document.getElementsByClassName('html-line')[index].insertAdjacentHTML('beforeend', readableHtml[index][counter]);
  counter++;
  setTimeout(function(){
    writeCode(index);
  }, globalDelay);  
}

function injectHtml(index) {
  if(index == html.length){
    document.getElementById('typingHtml').insertAdjacentHTML('beforeend', '<div id="typingCss"></div>');
    cssArea = document.getElementById('typingCss');
    document.getElementById('typingHtml').style.fontSize = '10px';
    document.getElementById('typingCss').style.fontSize = '14px';
    // globalDelay = 1;
    injectCss();
    return;
  }
  try {
    $(".container").html(html.substring(0, index));
  }
  catch(e) {

  }
  index++;
  setTimeout(function(){
    injectHtml(index);
  }, globalDelay);
}

function typeCallback(index) {
  counter = 0;
  index++;
  if(index >= readableHtml.length) {
    return;
  }
  document.getElementsByClassName('cursor')[0].parentNode.removeChild(document.getElementsByClassName('cursor')[0]);
  document.getElementsByClassName('html-line')[index].insertAdjacentHTML('afterend', '<strong class="cursor">|</strong>')
  writeCode(index);
}

var level = 0;
function readyIDE() {
  readableHtml.forEach(function(l, i){
    if(i > 0) {
      level++;
      if(l[1] == '/') {
        level--;
        document.getElementById('typingHtml').insertAdjacentHTML('beforeend', '<span class="html-line level-' + level + '" id="html-line-' + i + '"></span>');
        level--;
      }
      else if(l.indexOf('</') >= 0) {
        document.getElementById('typingHtml').insertAdjacentHTML('beforeend', '<span class="html-line level-' + level + '" id="html-line-' + i + '"></span>');
        level--; 
      }
      else {
        document.getElementById('typingHtml').insertAdjacentHTML('beforeend', '<span class="html-line level-' + level + '" id="html-line-' + i + '"></span>');
      }
    }
    else {
      document.getElementById('typingHtml').insertAdjacentHTML('beforeend', '<span class="html-line level-' + level + '" id="html-line-' + i + '"></span>');  
    }
    document.getElementById('typingHtml').insertAdjacentHTML('beforeend', '<br>');
  });
  // cssBlocks.forEach(function(b, i){
  //   var cssArea = document.getElementById('typingCss');
  //   cssArea.insertAdjacentHTML('beforeend', '<span class="css-line level-0"></span>');
  //   b.declarations.forEach(function(d, i){
  //     cssArea.insertAdjacentHTML('beforeend', '<span class="css-line level-1"></span>');
  //   });
  //   cssArea.insertAdjacentHTML('beforeend', '<span class="css-line level-0"></span>');
  // });
}

function generateCssBlocks() {
  cssLines.forEach(function(l, i){
    var selector = l.split('{')[0];
    selector = selector.trim();
    console.log(i);
    var rest = l.split('{')[1].replace('}', '');
    rest = rest.split(';');
    rest.splice(rest.length-1, 1);
    declarationArray = [];
    rest.forEach(function(d, i){
      declarationArray.push(new Declaration(d.split(':')[0], d.split(':')[1]));
    });
    cssBlocks.push(new CssBlock(selector, declarationArray));
  });
}

function writeCss() {
  document.getElementById('typingHtml').insertAdjacentHTML('beforeend', '')
}

var letterCount = 0;
var mode = 'selector';
var letters = '';
var currentSelector = '';
var currentProperty = '';
var currentVal = '';
var declarationCount = 0;
var blockCount = 0;
var injectSelector = true;
var injectProperty = true;
var injectVal = true;
var selectorCount = 0;
var propertyCount = 0;
var valCount = 0;
var htmlArea = document.getElementById('typingHtml');
function injectCss() {
  if(blockCount >= cssBlocks.length) {
    return;
  }
  $(htmlArea).scrollTop(htmlArea.scrollHeight);
  if(mode == 'selector') {
    if(injectSelector){
      injectSelector = false;
      cssArea.insertAdjacentHTML('beforeend', '<div class="css-line level-0 selector" id="selector-' + selectorCount + '"></div>');
    }
    currentSelector += cssBlocks[blockCount].selector[letterCount];
    document.getElementById('selector-' + selectorCount).insertAdjacentHTML('beforeend', cssBlocks[blockCount].selector[letterCount]);
    letterCount++;

    if(letterCount >= cssBlocks[blockCount].selector.length) {
      injectSelector = true;
      document.getElementById('selector-' + selectorCount).insertAdjacentHTML('beforeend', ' {');
      selectorCount++;
      mode = 'property';
      letterCount = 0;
    }
  }
  else if(mode == 'property') {
    if(injectProperty){
      injectProperty = false;
      cssArea.insertAdjacentHTML('beforeend', '<span class="css-line level-1 property" id="property-' + propertyCount + '"></span>');
    }
    currentProperty += cssBlocks[blockCount].declarations[declarationCount].property[letterCount];
    document.getElementById('property-' + propertyCount).insertAdjacentHTML('beforeend', cssBlocks[blockCount].declarations[declarationCount].property[letterCount]);
    letterCount++;
    if(letterCount >= cssBlocks[blockCount].declarations[declarationCount].property.length) {
      injectProperty = true;
      document.getElementById('property-' + propertyCount).insertAdjacentHTML('beforeend', ': ');
      propertyCount++;
      mode = 'val';
      letterCount = 0;
    }
  }
  else if(mode == 'val') {
    if(injectVal){
      injectVal = false;
      cssArea.insertAdjacentHTML('beforeend', '<span class="css-line val" id="val-' + valCount + '"></span>');
    }
    currentVal += cssBlocks[blockCount].declarations[declarationCount].val[letterCount];
    document.getElementById('val-' + valCount).insertAdjacentHTML('beforeend', cssBlocks[blockCount].declarations[declarationCount].val[letterCount]);
    letterCount++;
    if(letterCount >= cssBlocks[blockCount].declarations[declarationCount].val.length) {
      $(currentSelector.trim()).css(currentProperty.trim(), currentVal.trim());
      console.log("$('" + currentSelector.trim() + "').css(" + currentProperty.trim() + ", " + currentVal.trim() + ");");
      injectVal = true;
      document.getElementById('val-' + valCount).insertAdjacentHTML('beforeend', ';');
      document.getElementById('val-' + valCount).insertAdjacentHTML('beforeend', '<br>');
      valCount++;
      mode = 'property';
      currentProperty = '';
      currentVal = '';
      letterCount = 0;
      declarationCount++;
      if(declarationCount >= cssBlocks[blockCount].declarations.length) {
        console.log('count = ' + valCount);
        cssArea.insertAdjacentHTML('beforeend', '<span class="selector">}</span>');
        blockCount++;
        declarationCount = 0;
        mode = 'selector';
        currentSelector = '';
        currentVal = '';
        letterCount = 0;
      }
    }
  }
  setTimeout(function(){
    injectCss();
  }, globalDelay);
}
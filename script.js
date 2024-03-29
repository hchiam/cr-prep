let checked = [false,false,false, false,false,false, false,false,false];
let code = '_';

setTimeout(replaceMessageWithButton, 3000);

setUpDownloadPageAsImage(); // <- need to have beforehand loaded download-page-as-image.js

function updateCheckboxesFormatting() {
  let specialSpans = [4,7,8];
  for (let i in specialSpans) {
    let id = specialSpans[i];
    updateSpanColor(id);
  }
  
  let inputs = document.querySelectorAll('input');
  for (let i=0; i < inputs.length; i++) {
    let input = inputs[i];
    input.style.width = '30px'
    input.style.height = '30px'
  }
}

function replaceMessageWithButton() {
  document.getElementById('temporary-message').style.display = 'none';
  document.getElementById('print-page').style.visibility = 'visible';
  document.getElementById('download-page-as-image').style.visibility = 'visible';
}

function printPage() {
  document.title = 'cr-prep-' + code + '.pdf';
  window.print();
}

function getRandomNumber(min,max) {
  return min + Math.floor(Math.random() * max);
}

function updateSpanColor(id) {
  let isChecked = document.getElementById(id).checked;
  if (isChecked) {
    document.getElementsByClassName('span-' + id)[0].style.color = 'blue';
  } else {
    document.getElementsByClassName('span-' + id)[0].style.color = 'red';
  }
}

function updateImage(id) {
  let isChecked = document.getElementById(id).checked;
  checked[id] = isChecked;
  if (checked.every(x => x === false)) {
    code = '_';
    document.getElementById('fun-text').innerHTML = code;
    document.getElementById('fun-text').style.background = 'black';
    showFunDrawing();
    return;
  }
  let binaryToDecimal = parseInt(Number(checked.map(x => x ? 1 : 0).join('')), 2);
  let uniqueNumber = binaryToDecimal + Math.round(new Date().getTime()/10000);
  let uniqueNumberString = String(uniqueNumber);
  let a = uniqueNumberString[uniqueNumberString.length-1];
  let b = uniqueNumberString[uniqueNumberString.length-2];
  let c = uniqueNumberString[uniqueNumberString.length-3];
  a = '1234abcdef'[a] + a;
  b = 'e1a2b3c4df'[b] + b;
  c = 'abcdef1234'[c] + c;
  code = obfuscateCode(uniqueNumberString);
  document.getElementById('fun-text').innerHTML = 'Copy-paste prevention ID ' + code + '-' + getTodayDate();
  document.getElementById('fun-text').style.background = '#' + a + b + c;
  showFunDrawing();
}

function obfuscateCode(code) {
  let mapping = 'A2B3C4D5E6'
  let output = '';
  for (let i = 0; i < code.length; i++) {
    output += mapping[Number(code[i])];
  }
  return output;
}

function copyUrlToClipboard() {
  let pointerPreview = document.getElementById('url');
  if (pointerPreview && pointerPreview.title) {
    let container = document.createElement('div')
    container.innerHTML = pointerPreview.title
    container.style.position = 'fixed'
    container.style.pointerEvents = 'none'
    container.style.opacity = 0
    document.body.appendChild(container)
    window.getSelection().removeAllRanges()
    let range = document.createRange()
    range.selectNode(container)
    window.getSelection().addRange(range)
    document.execCommand('copy');
    alert('Copied to clipboard: \n\n' + pointerPreview.title);
  }
} 

function getTodayDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); // month 0 = January
  let yyyy = today.getFullYear();
  let suffix = 'TH';
  if (dd[1] == '1') suffix = 'ST';
  if (dd[1] == '2') suffix = 'ND';
  if (dd[1] == '3') suffix = 'RD';
  return yyyy + '-' + mm + '-' + dd + suffix;
}

function hoverInfo(i) {
  if (i == -1) {
    document.getElementById('hover-info').innerHTML = '';
  } else {
    let info = [
      'Buffer time for the end of the sprint. You can fit more in a jar if you put the bigger rocks in before the smaller rocks.',
      "Making sure you really understand the problem saves time. A list helps externalize cognitive load and combats context switching costs. If you find something outside of scope or outside your skills, don't be afraid to ask!",
      "Don't reinvent the wheel. Consistency helps with readability and reuse. Try searching for yourself for 15 minutes. If you're still stuck, don't be afraid to ask for help!",
      "Others have probably asked the same thing. Sometimes new solutions pop up.",
      'Many customers still use IE.',
      "Be confident that future changes don't break existing logic.",
      'Avoid inconsistencies in the UI (which can cause user confusion/mistakes).',
      'Ensure performance is not affected.',
      "Check that existing unit tests aren't broken by your changes.",
      'Avoid making reviewers look at the CR twice. And fresh eyes catch blind spots.',
    ];
    document.getElementById('hover-info').innerHTML = "Here's why: " + info[i];
  }
}

function progressiveDisclosure(classClicked) {
  const order = '4780123569';
  classClicked = classClicked.replace('c', '');
  for (let i=0; i<order.length; i++) {
    if (order[i] === classClicked) {
      let classToShow = '.c' + order[i+1];
      document.querySelectorAll(classToShow)[0].style.visibility = 'visible';
      document.querySelectorAll(classToShow)[1].style.visibility = 'visible';
      document.querySelector(classToShow + '+span').style.visibility = 'visible';
      break;
    }
  }
}

/////////////////

const w = document.getElementById('checkbox-box').offsetWidth;
const h = document.getElementById('checkbox-box').offsetHeight;
const offsetx = 0;
const offsety = 0;
let points = '';
let x, y;

document.getElementById('fun-drawing').setAttribute("width", w + 'px');
document.getElementById('fun-drawing').setAttribute("height", h + 'px');

function showFunDrawing() {
  addPoints();
  showLine();
}

function showLine() {
  document.getElementById('line').setAttribute('points', points);
}

function addPoint(x,y) {
  points += ' ' + (x+offsetx) + ',' + (y+offsety);
}

function addPoints() {
  let [x, y] = [0, 0];
  moves.x = w/2;
  moves.y = h/2;
  // moves.moveDown()
  //   .moveRight()
  //   .moveDown()
  //   .moveLeft()
  //   .moveDown()
  //   .moveRight()
  //   .moveRight()
  //   .moveUp()
  //   .moveUpRight()
  //   .moveDownRight()
  //   .moveUp();
  points = ''; // reset per keypress
  let sequence = '';
  sequence += code;
  let mapping = 'A2B3C4D5E6'
  for (var letter of sequence) {
    switch(letter) {
      case mapping[0]:
        moves.moveUpLeft();
        moves.moveUpRight();
        moves.moveDownRight();
        moves.moveDownLeft();
        moves.moveUpLeft();
        break;
      case mapping[1]:
        moves.moveUpLeft();
        break;
      case mapping[2]:
        moves.moveUp();
        break;
      case mapping[3]:
        moves.moveUpRight();
        break;
      case mapping[4]:
        moves.moveLeft();
        break;
      case mapping[5]:
        moves.moveUpLeft();
        moves.moveDownRight();
        moves.moveDownRight();
        moves.moveUpLeft();
        moves.moveUpRight();
        moves.moveDownLeft();
        moves.moveDownLeft();
        moves.moveUpRight();
        break;
      case mapping[6]:
        moves.moveRight();
        break;
      case mapping[7]:
        moves.moveDownLeft();
        break;
      case mapping[8]:
        moves.moveDown();
        break;
      case mapping[9]:
        moves.moveDownRight();
        break;
    }
  }
}

var moves = {
  x:0,
  y:0,
  d:h/5,

  moveUp: function() {
    this.y -= this.d;
    addPoint(this.x,this.y);
    return this;
  },

  moveDown: function() {
    this.y += this.d;
    addPoint(this.x,this.y);
    return this;
  },

  moveLeft: function() {
    this.x -= this.d;
    addPoint(this.x,this.y);
    return this;
  },

  moveRight: function() {
    this.x += this.d;
    addPoint(this.x,this.y);
    return this;
  },

  moveUpRight: function() {
    this.x += this.d;
    this.y -= this.d;
    addPoint(this.x,this.y);
    return this;
  },

  moveDownRight: function() {
    this.x += this.d;
    this.y += this.d;
    addPoint(this.x,this.y);
    return this;
  },

  moveUpLeft: function() {
    this.x -= this.d;
    this.y -= this.d;
    addPoint(this.x,this.y);
    return this;
  },

  moveDownLeft: function() {
    this.x -= this.d;
    this.y += this.d;
    addPoint(this.x,this.y);
    return this;
  }
}

///////////////////

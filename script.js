let checked = [false,false,false, false,false,false, false,false,false];
let code = '_';

function printPage() {
  document.title = 'cr-prep-' + code + '.pdf';
  window.print();
}

function getRandomNumber(min,max) {
  return min + Math.floor(Math.random() * max);
}

function updateImage(id) {
  let isChecked = document.getElementById(id).checked;
  checked[id] = isChecked;
  if (checked.every(x => x === false)) {
    code = '_';
    document.getElementById('fun-text').innerHTML = code;
    document.getElementById('fun-text').style.background = 'black';
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
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var suffix = 'TH';
  if (dd[1] == '1') suffix = 'ST';
  if (dd[1] == '2') suffix = 'ND';
  if (dd[1] == '3') suffix = 'RD';
  return yyyy + '-' + mm + '-' + dd + suffix;
}
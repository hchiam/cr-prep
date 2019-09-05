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
      'Make sure you understand the problem. A list helps externalize cognitive load and combats context switching costs.',
      "Don't reinvent the wheel. Consistency helps with readability and reuse.",
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
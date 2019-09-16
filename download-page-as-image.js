// requires html2canvas <- https://html2canvas.hertzen.com/dist/html2canvas.min.js

function setUpDownloadPageAsImage() {
    document.getElementById("download-page-as-image").addEventListener("click", function() {
      document.getElementById('button-bar').style.visibility = 'hidden';
      if (typeof updateCheckboxesFormatting !== 'undefined') {
          updateCheckboxesFormatting();
      }
      html2canvas(document.body).then(function(canvas) {
        simulateDownloadImageClick(canvas.toDataURL(), code + '.png');
        document.getElementById('button-bar').style.visibility = 'visible';
      });
    });
  }

function simulateDownloadImageClick(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download !== 'string') {
    window.open(uri);
  } else {
    link.href = uri;
    link.download = filename;
    accountForFirefox(clickLink, link);
  }
}

function clickLink(link) {
  link.click()
}

function accountForFirefox(click) { // wrapper function
  let link = arguments[1];
  document.body.appendChild(link);
  click(link);
  document.body.removeChild(link);
}
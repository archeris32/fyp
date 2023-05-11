"use strict";

var fs = require('fs');

var path = require('path');

function movePDFs() {
  var downloadsPath = "C:\\Users\\44743\\Desktop\\fyp-2\\clients";
  var pdfs = fs.readdirSync(downloadsPath).filter(function (file) {
    return file.endsWith('.pdf');
  });
  pdfs.forEach(function (pdf) {
    var name = pdf.split(' ')[0] + ' ' + pdf.split(' ')[1];
    var directoryPath = path.join(downloadsPath, name);
    var pdfPath = path.join(downloadsPath, pdf);

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    fs.renameSync(pdfPath, path.join(directoryPath, pdf));
  });
}

module.exports = {
  movePDFs: movePDFs
};
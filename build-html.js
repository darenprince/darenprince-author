const fs = require('fs');
const path = require('path');

const includeRegex = /<!--#include\s+file="([^"]+)"\s*-->/g;

function processFile(file) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(includeRegex, (_, includePath) => {
    const partial = fs.readFileSync(path.join(__dirname, includePath), 'utf8');
    return partial;
  });
  fs.writeFileSync(file, html);
}

const pages = [
  'index.html',
  'book.html',
  'components.html',
  'contact.html',
  'dashboard.html',
  'login.html',
  'press.html'
];

pages.forEach(page => {
  if (fs.existsSync(page)) {
    processFile(page);
  }
});

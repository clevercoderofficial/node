const url = require('url')

const myURL = new URL('https://example.org');
myURL.pathname = '/a/b/c';
myURL.search = '?d=e';
myURL.hash = '#fgh';
myURL.port = '8000';

console.log(myURL)

// FULL URL
console.log(myURL.href)
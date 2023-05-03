// Import the required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the server's hostname and port
const hostname = '127.0.0.1';
const port = 3000;

// Helper function to serve a file
function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('File not found');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    }
  });
}

// Create the server
const server = http.createServer((req, res) => {
  console.log(req.url)
  switch (req.url) {
    case '/':
      serveFile(res, path.join(__dirname, 'index.html'), 'text/html');
      break;
    case '/.well-known/assetlinks.json':
      serveFile(res, path.join(__dirname, '.well-known', 'assetlinks.json'), 'application/json');
      break;
    case '/.well-known/apple-app-site-association':
      serveFile(res, path.join(__dirname, '.well-known', 'apple-app-site-association'), 'application/json');
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not found');
      break;
  }
});

// Start listening for incoming requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
const http = require("http");
const fs = require('fs');
const https = require('https'); // Use this to make HTTP requests

const port = process.env.PORT || 3000; // Use assigned port or default to 3000

// Read index.html from the local filesystem
const index = fs.readFileSync('./index.html', 'utf-8');

// // Function to fetch data from the URL
// const fetchData = (url) => {
//   return new Promise((resolve, reject) => {
//     https.get(url, (res) => {
//       let data = '';

//       // Continuously update stream with data
//       res.on('data', chunk => {
//         data += chunk;
//       });

//       // The whole response has been received
//       res.on('end', () => {
//         resolve(data);
//       });
//     }).on('error', (err) => {
//       reject(err);
//     });
//   });
// };
const data = fs.readFile('https://dummyjson.com/products', 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  }
  if (data) {
    console.log(data)
  }
});

// Create a server
const server = http.createServer(async (req, res) => {
  switch (req.url) {
    case '/':
      // Serve the index.html
      res.setHeader("Content-Type", "text/html");
      res.end(index);
      break;

    case '/api':
      // Fetch data from the API and send it as a response
      try {
        const data = fs.readFileSync('https://dummyjson.com/products', 'utf-8')
        res.setHeader("Content-Type", "application/json");
        res.end(data);
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error fetching API data');
      }
      break;

    default:
      // Handle unknown routes
      res.writeHead(404, 'Not Found');
      res.end('404 Not Found');
  }
});

// Start listening on the specified port
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

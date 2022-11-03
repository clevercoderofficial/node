const http = require("http");

// const hostname = '127.0.0.1' // hostname assigned

// const port = process.env.PORT; // default port
const port = process.env.PORT || 3000; // default port or assigned port
// const port = 3000; // assigned port

const server = http.createServer((req, res) => { // create a http server request and respond
  // console.log(req) // collect all types of request
  // console.log(req.url)
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html"); // declare content type
  res.end(
    "<h1> Hey we are webx grafix<h1> <p> we are digital marketing agency based in india<p> "
  );
});

server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
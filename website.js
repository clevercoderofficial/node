const http = require("http");
const fs = require("fs");

const hostname = '127.0.0.1' // hostname assigned
// const port = process.env.PORT; // default port
const port = process.env.PORT || 3000; // default port or assigned port
// const port = 3000; // assigned port

const server = http.createServer((req, res) => {
  // create a http server request and respond
  
  // console.log(req) // collect all types of request
  // console.log(req.url)

  res.setHeader("Content-Type", "text/html"); // declare content type
  if (req.url == "/") {
    res.statusCode = 200;
    res.end(
      "<h1> Hey we are webx grafix</h1><p> we are digital marketing agency based in india<p> "
    );
  } else if (req.url == "/about") {
    res.statusCode = 200;
    res.end(
      "<h1> about webx grafix</h1> <p> we are digital marketing agency based in india<p> "
    );
  } else if (req.url == "/team") {
    res.statusCode = 200;
    res.end(
      "<h1> meet our team</h1>"
    );
  }
  else if (req.url == "/hello") {
    res.statusCode = 200;
    const data = fs.readFileSync("index.html");
    res.end(data.toString());
  } else {
    res.statusCode = 404;
    res.end(
      "<h1>Hey this page was not found</h1><p> this page was not found</p>"
    );
  }
});

server.listen(port, hostname, () => {
  console.log(`server is listening on port http://${hostname}:${port}`);
});

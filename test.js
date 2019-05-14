// Creating a Server With Node's Native Modules

const http = require("http")
const fs = require("fs")
http
  .createServer((req, res) => {
    if (req.url === "/test") {
      res.end("You just visited the url " + req.url)
    }

    res.end("Available Endpoint /test")
  })
  .listen(3000, () => {
    console.log("We are live on port 3000")
  })

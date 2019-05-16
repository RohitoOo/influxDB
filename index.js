const express = require("express")
const app = express()

app.get("/hello", (req, res) => {
  res.json({
    message: "Hellooooo!!!"
  })
})

app.listen(3002, () => {
  console.log("We are live on port 3000")
})

module.exports = app

const Influx = require("influx")
const express = require("express")
const app = express()
const os = require("os")
// const credentials = require("./credentials")
var cors = require("cors")

app.use(cors())

let influx = new Influx.InfluxDB({
  host: "159.89.115.92",
  database: "ethica",
  username: "admin",
  password: "cfb50eda861bc22d57737736b09c4adb32c9796adc0492dd"
})

const port = process.env.PORT || 5000

// Query Server's Link 0

app.get("/data/:serverID/link0", (req, res) => {
  const { serverID } = req.params

  try {
    influx
      .queryRaw(
        `select LAST("recvPackets") from  link WHERE serverID='${serverID}' AND linkID = '0' AND time > now() - 1h GROUP BY time(300s) ORDER BY time desc `
      )
      .then(rawData => {
        let data = []

        rawData.results[0].series[0].values.map((value, index) => {
          data.push({
            time: value[0].slice(11, 16),
            bandwidth: value[1],
            cpeInBound: value[2],
            cpeOutBound: value[3],
            latency: value[4],
            linkID: value[5],
            lossIn: value[6],
            lossOut: value[7],
            recvBytes: value[8],
            recvPackets: value[9],
            sentBytes: value[10],
            sentPackets: value[11],
            serverID: value[12],
            status: value[13],
            symbol: value[14],
            tunnelID: value[15],
            usage: value[16],
            usageCap: value[17],
            weight: value[18]
          })
        })
        res.json(data)
      })
      .catch(err => {
        res.send({
          ":: ERROR :: Query Error - Check SeverID": err,
          serverID,
          link: "link0"
        })
      })
  } catch (err) {
    res.send({ err })
  }
})

// Query Server's Link 1

app.get("/data/:serverID/link1", (req, res) => {
  const { serverID } = req.params
  try {
    influx
      .queryRaw(
        `select * from  link WHERE serverID='${serverID}' AND linkID = '1' AND time > now() - 1h ORDER BY time desc`
      )
      .then(rawData => {
        let data = []

        rawData.results[0].series[0].values.map((value, index) => {
          if (index % 100 == 0) {
            data.push({
              time: value[0].slice(11, 16),
              bandwidth: value[1],
              cpeInBound: value[2],
              cpeOutBound: value[3],
              latency: value[4],
              linkID: value[5],
              lossIn: value[6],
              lossOut: value[7],
              recvBytes: value[8],
              recvPackets: value[9],
              sentBytes: value[10],
              sentPackets: value[11],
              serverID: value[12],
              status: value[13],
              symbol: value[14],
              tunnelID: value[15],
              usage: value[16],
              usageCap: value[17],
              weight: value[18]
            })
          }
        })
        res.json(data)
      })
      .catch(err => {
        res.send({
          ":: ERROR :: Query Error - Check SeverID": err,
          serverID,
          link: "link1"
        })
      })
  } catch (err) {
    res.send({ err })
  }
})

// Query Server's Link 2

app.get("/data/:serverID/link2", (req, res) => {
  const { serverID } = req.params
  try {
    influx
      .queryRaw(
        `select * from  link WHERE serverID='${serverID}' AND linkID = '2' ORDER BY time desc limit 1000 `
      )
      .then(rawData => {
        let data = []

        rawData.results[0].series[0].values.map((value, index) => {
          if (index % 100 == 0) {
            data.push({
              time: value[0].slice(11, 16),
              bandwidth: value[1],
              cpeInBound: value[2],
              cpeOutBound: value[3],
              latency: value[4],
              linkID: value[5],
              lossIn: value[6],
              lossOut: value[7],
              recvBytes: value[8],
              recvPackets: value[9],
              sentBytes: value[10],
              sentPackets: value[11],
              serverID: value[12],
              status: value[13],
              symbol: value[14],
              tunnelID: value[15],
              usage: value[16],
              usageCap: value[17],
              weight: value[18]
            })
          }
        })
        res.json(data)
      })
      .catch(err => {
        res.send({
          ":: ERROR :: Query Error - Check SeverID Or Link Number": err,
          serverID,
          link: "link2"
        })
      })
  } catch (err) {
    res.send({ err })
  }
})

// Query Server's Link 3

// Work In Progress

app.get("*", (req, res) => {
  res.send({
    Available_EndPoint: [
      "/data/serverID/link0",
      "/data/serverID/link1",
      "/data/serverID/link2"
    ]
  })
})

// influx
//   .getDatabaseNames()
//   .then(names => data.push(names))
//   .catch(err => console.log({ err }))

// influx
//   .getMeasurements()
//   .then(names => console.log(names))
//   .catch(err => console.log({ err }))

// console.log(names)

// .then(name =>
//   console
//     .log(names)
//     .then(() => {
//       app.listen(port, () => {
//         console.log("We are live on port", port)
//       })
//     })
//     .catch(err => console.log(":: ERROR ::", err))
// )
//   .then(names => {
//     if (!names.includes("express_response_db")) {
//       return influx.createDatabase("express_response_db")
//     }
//   })
//   .then(() => {
//     http.createServer(app).listen(3000, function() {
//       console.log("Listening on port 3000")
//     })
//   })
//   .catch(err => {
//     console.error(`Error creating Influx database!`)
//   })

app.listen(port, () => {
  console.log("We are live on port", port)
})

module.exports = app

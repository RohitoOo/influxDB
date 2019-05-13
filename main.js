const Influx = require("influx")
const express = require("express")
const app = express()
const os = require("os")
const credentials = require("./credentials")

influx = new Influx.InfluxDB({
  host: credentials.host,
  database: credentials.database,
  username: credentials.username,
  password: credentials.password
})

const port = process.env.PORT || 3000

app.get("/data/:serverID", (req, res) => {
  const { serverID } = req.params
  try {
    influx
      .queryRaw(
        `select * from  link WHERE serverID='${serverID}' ORDER BY time desc limit 1 `
      )
      .then(rawData => {
        let data = []
        data.push({
          column: rawData.results[0].series[0].columns[0],
          data: rawData.results[0].series[0].values[0][0]
        })

        data.push({
          column: rawData.results[0].series[0].columns[1],
          data: rawData.results[0].series[0].values[0][1]
        })
        data.push({
          column: rawData.results[0].series[0].columns[2],
          data: rawData.results[0].series[0].values[0][2]
        })

        data.push({
          column: rawData.results[0].series[0].columns[3],
          data: rawData.results[0].series[0].values[0][3]
        })
        data.push({
          column: rawData.results[0].series[0].columns[4],
          data: rawData.results[0].series[0].values[0][4]
        })
        data.push({
          column: rawData.results[0].series[0].columns[5],
          data: rawData.results[0].series[0].values[0][5]
        })
        data.push({
          column: rawData.results[0].series[0].columns[6],
          data: rawData.results[0].series[0].values[0][6]
        })
        data.push({
          column: rawData.results[0].series[0].columns[7],
          data: rawData.results[0].series[0].values[0][7]
        })
        data.push({
          column: rawData.results[0].series[0].columns[8],
          data: rawData.results[0].series[0].values[0][8]
        })
        data.push({
          column: rawData.results[0].series[0].columns[9],
          data: rawData.results[0].series[0].values[0][9]
        })
        data.push({
          column: rawData.results[0].series[0].columns[10],
          data: rawData.results[0].series[0].values[0][10]
        })
        data.push({
          column: rawData.results[0].series[0].columns[11],
          data: rawData.results[0].series[0].values[0][11]
        })
        data.push({
          column: rawData.results[0].series[0].columns[12],
          data: rawData.results[0].series[0].values[0][12]
        })
        data.push({
          column: rawData.results[0].series[0].columns[13],
          data: rawData.results[0].series[0].values[0][13]
        })

        res.json(data)
      })
      .catch(err => {
        res.send({ ":: ERROR :: Query Error - Check SeverID": err, serverID })
      })
  } catch (err) {
    res.send({ err })
  }
})

app.get("*", (req, res) => {
  res.send({
    Available_EndPoint: "/data/serverID"
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

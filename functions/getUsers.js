const axios = require("axios")
const Influx = require("influx")

let influx = new Influx.InfluxDB({
  host: "159.89.115.92",
  database: "ethica",
  username: "admin",
  password: "cfb50eda861bc22d57737736b09c4adb32c9796adc0492dd"
})

exports.handler = function(event, context, callback) {
  //   const url = "https://jsonplaceholder.typicode.com/todos/1"

  const query = `select LAST("recvPackets") from  link WHERE serverID='86b65e5c-d1da-478f-af14-a8e2da03576b' AND linkID = '0' AND time > now() - 1h GROUP BY time(300s) ORDER BY time desc `

  // event - retrieve Post Data From Incoming Request ( event.body )
  // context - user information ?
  // callback - function to Send back data to the user

  const send = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    })
  }

  //   axios
  //     .get(url)
  //     .then(data => send(data.data))
  //     .catch(err => send(err))

  influx.queryRaw(query).then(rawData => {
    send(rawData.results[0].series[0].values)
  })

  //   callback(null, { statusCode: 200, body: "data.data" })
}

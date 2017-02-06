var express = require('express')
// var bodyParser = require('body-parser')
var app = express()
var linebot = require('linebot')
/*eslint-disable */
var env = require('dotenv').config({ path: __dirname + '/.env' })
/*eslint-enable */
// app.use(bodyParser.json())
app.set('port', (process.env.PORT || 4000))
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  verify: true
})

const linebotParser = bot.parser()
app.post('/webhook', linebotParser)

bot.on('message', function (event) {
  event.reply(event.message.text).then(function (data) {
    console.log('Success', data)
  }).catch(function (error) {
    console.log('Error', error)
  })
})

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})

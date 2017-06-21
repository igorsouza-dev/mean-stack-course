const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()

/***setup the middlewares that will be used by the requests***/

//encode URL
server.use(bodyParser.urlencoded({ extended : true }))
//parse json into object
server.use(bodyParser.json())

server.listen(port, function(){
    console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server

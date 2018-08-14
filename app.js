const express = require('express')
const app = express()
const http = require('http');

let botsOptions = {
    host: "localhost",
    port: 3000,
    path: '/bots',
    method: 'GET',
    headers: {
        "Authorization": "af7822b30e7a65d"
    }
}

let parsedBots = {}; 

let botReq = http.request(botsOptions, function (res) {
    var responseString = "";
    res.on("data", function (data) {
        responseString += data;
        // save all the data from response
    });
    res.on("end", function () {
        parsedBots = JSON.parse(responseString);
        console.log(parsedBots); 
        
        // print to console when response ends
    });
});

botReq.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
botReq.write("hello world");
botReq.end();

app.get('/', (req, res) => res.send(parsedBots))

app.listen(1337, () => console.log('Example app listening on port 1337!'))
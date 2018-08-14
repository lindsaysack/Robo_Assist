'use strict'
const apiRouter = require('express').Router();
const http = require('http');

module.exports = apiRouter;

//set options for requesting all bots
let botsOptions = {
    host: "localhost",
    port: 3000,
    path: '/bots',
    method: 'GET',
    headers: {
        "Authorization": "af7822b30e7a65d"
    }
}

//create variable to capture all bots
let parsedBots = {}; 

//http request for all bots
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

//display all bots when visiting localhost:1337/
apiRouter.get('/', (req, res) => res.send(parsedBots))

apiRouter.use(function (req, res) {
	res.status(404).end();
  });
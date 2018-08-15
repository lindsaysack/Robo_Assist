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
let singleBot = {};  

//http request for all bots
let botsReq = http.request(botsOptions, function (res) {
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

botsReq.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
botsReq.write("hello world");
botsReq.end();

//display all bots when visiting localhost:1337/
apiRouter.get('/', (req, res) => res.send(parsedBots))

//display selected bot when visiting specific url 
apiRouter.get('/:botName', (req, res) => {
    let botsReq = http.request(botsOptions, function (res) {
        var responseString = "";
        res.on("data", function (data) {
            responseString += data;
            // save all the data from response
        });
        res.on("end", function () {
            singleBot = JSON.parse(responseString).filter(bot => {
                return bot.name === req.params.botName})
            console.log(singleBot); 
            // print to console when response ends
        });
    });
    
    botsReq.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
    botsReq.write("hello world");
    botsReq.end();

    res.send(singleBot[0])
})


apiRouter.use(function (req, res) {
	res.status(404).end();
  });
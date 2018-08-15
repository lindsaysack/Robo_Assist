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

//create variables to capture bots and reviews 
let parsedBots = {};
let singleBot = {};  
let botReviews = {}; 

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
apiRouter.get('/:robo_id', (req, res) => {
    let botsReq = http.request(botsOptions, function (res) {
        var responseString = "";
        res.on("data", function (data) {
            responseString += data;
            // save all the data from response
        });
        res.on("end", function () {
            singleBot = JSON.parse(responseString).filter(bot => {
                return bot.robo_id.$oid === req.params.robo_id})
            console.log(singleBot[0]); 
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

apiRouter.get('/reviews/:reviewsId', (req, res) => {
    let reviewsReq = http.request(
        {
            host: "localhost",
            port: 3000,
            path: `/reviews/${req.params.reviewsId}`,
            method: 'GET',
            headers: {
                "Authorization": "af7822b30e7a65d"
            }
        }, function (res) {
        var responseString = "";
        res.on("data", function (data) {
            responseString += data;
            // save all the data from response
        });
        res.on("end", function () {
            botReviews = JSON.parse(responseString)
            console.log(botReviews); 
            // print to console when response ends
        });
    });
    
    reviewsReq.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
    reviewsReq.write("hello world");
    reviewsReq.end();

    res.send(botReviews)
})


apiRouter.use(function (req, res) {
	res.status(404).end();
  });
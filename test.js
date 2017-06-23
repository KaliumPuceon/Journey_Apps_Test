//JourneyApps internship test script
//By Jehan Singh (jehansingh.97@gmail.com)
//https://github.com/KaliumPuceon
//
//2017-6-23
//
//Finds the top 10 Cape Town developers on GitHub by Follower Count
//using the GitHub restful API. Created as part of the application
//process for a JourneyApps internship 2017.

console.log("Starting test run");

var dict = {};

var options = {
    url: 'https://api.github.com/search/users?q=location:CapeTown&sort=followers&order=desc',
    headers: {'User-Agent' : 'request'}
};

var request = require('request');
request(options,function(error,response,body){


    console.log(body);

});

JSON.parse

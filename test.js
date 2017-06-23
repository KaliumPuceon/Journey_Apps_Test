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
var block = {};

var options = { 
    url: 'https://api.github.com/search/users?q=location:CapeTown&sort=followers&order=desc',
    //Calls the API, requests all users in Cape Town sorted by follower count
    headers: {'User-Agent' : 'request'} //Satisfies Github's need for a user agent
};


var request = require('request'); //load request module
request(options,function(error,response,body){ //make request, pass values into function

    var parseable = JSON.parse(body); //Create JSON string object

    for (var i = 0; i < parseable.items.length; i++){ //iterate over JSON and extract individuals
    
        var item = parseable.items[i];
        block[i] = parseable.items[item.followers_url] = item.login; //Store in block for mapping to dict

    }
    //now parse each block's index into a number for the new dict with the same username

    //console.log(block);
    

});



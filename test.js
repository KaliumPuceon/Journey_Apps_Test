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

var dict = [];
var block = [];

var scrapeOptions = { 
    url: 'https://api.github.com/search/users?q=location:CapeTown&sort=followers&order=desc',
    //Calls the API, requests all users in Cape Town sorted by follower count
    headers: {'User-Agent' : 'request'} //Satisfies Github's need for a user agent
};


var RateLimiter = require('request-rate-limiter'); //Request rate limiting for counting

var limiterScrape = new RateLimiter(10);
request = require('request'); //load request module

limiterScrape.request(function(){

    request(scrapeOptions,function(error,response,body){ //make request, pass values into function

        var parseable = JSON.parse(body); //Create JSON string object

        for (var i = 0; i < parseable.items.length; i++){ //iterate over JSON and extract individuals
    
            var item = parseable.items[i];
            block[i] = [item.followers_url,item.login]; //Store in block for mapping to dict

        }

    console.log(block);


    function getUserCount(url,user){
        var options = {
        url:url,
        headers: {'User-Agent':'request'},
        json:true
        };

        var rp = require('request-promise');
        return rp(options)
            .then(function(body){
                console.log(body.length,user);
                return([body.length,user]);
            });


        }

    calls = [];

    for (var k = 0; k < block.length; k++){

        calls.push(getUserCount(block[k][0],block[k][1]));
        

    }

    Promise.all(calls).then(data=>{
        console.log(data);
    });



    
    });

});



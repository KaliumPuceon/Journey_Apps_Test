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

        var output = [];
        function pushToOut(chunk){
            
            output.push(chunk);
            
        }
            
        var calls = [];
        var async = require('async');
        
        var counter = 0;

        for (var k = 0; k < block.length;k ++){
            
            counter +=1;

            var followUrl = (block[k])[0];

            var followOptions = {
                url: followUrl,
                headers: {'User-Agent' : 'request'}
            }

            var limiterCount = new RateLimiter(45);
            limiterCount.request(function(){
                    
                var j = k;
                var limitBlock = block;
                
                request(followOptions,function(error,response,body){
            
                    var k = j;
                    var block = limitBlock;

                    data = JSON.parse(body);
                    count = data.length;
                    pushToOut([count,block[k][1]]);
                    console.log([count,block[k][1]]);
                    console.log("\n");
        
                });
            });
            
            counter-=1

        }
        
    console.log(output);
    
    });

});



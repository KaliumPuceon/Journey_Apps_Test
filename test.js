// JourneyApps internship test script
// By Jehan Singh (jehansingh.97@gmail.com)
// https://github.com/KaliumPuceon
//
// DATE:2017-6-23
//
// Finds the top 10 Cape Town developers on GitHub by Follower Count
// using the GitHub restful API. Created as part of the application
// process for a JourneyApps internship 2017.
//
// REQUIRED LIBRARIESS:
// ~ request-rate-limiter
// ~ request
// ~ request-promise

var block = []; //holds unparsed counting information and name of user

var scrapeOptions = {

    url: 'https://api.github.com/search/users?q=location:CapeTown&sort=followers&order=desc',
    //Calls the API, requests all users in Cape Town sorted by follower count
    headers: {'User-Agent' : 'request'} //Satisfies Github's need for a user agent

};

var RateLimiter = require('request-rate-limiter'); //Request rate limiting for counting

var limiterScrape = new RateLimiter(25); //Limit requests to 25/second
request = require('request'); //load request module

limiterScrape.request(function(){ //Limit requests 

    request(scrapeOptions,function(error,response,body){ //make request, pass values into function

        var parseable = JSON.parse(body); //Create JSON string object

        for (var i = 0; i < parseable.items.length; i++){ //iterate over JSON and extract individuals
    
            var item = parseable.items[i]; //Make sure closure doesn't go wrong
            block[i] = [item.followers_url,item.login]; //Store in block for mapping to dict

        }

    function getUserCount(url,user){ //Promise based function for getting follower count
        
        var options = {
        
            url:url,
            headers: {'User-Agent':'request'},
            json:true //Parse as json directly
        };

        var rp = require('request-promise'); //Use request-promise library
        
        return rp(options) //Make promise to request file
            .then(function(body){

                return([body.length,user]); //return file to complete promise
            
            });

        }

    calls = []; //stack for promises

    for (var k = 0; k < block.length; k++){ //Push promises to request onto calls
        
        calls.push(getUserCount(block[k][0],block[k][1]));

    }

    Promise.all(calls) //Wait for all promises in calls to complete
        .then(data=>{

            for (var n = 0; n < 10; n ++){
                console.log(data[n][0]+" "+data[n][1]); //print top 10 values

            }

        })
        .catch(function(err){ //handle error, usually github ratelimit

            console.log("Get request error: This is likely due to Github rate limiting. Try again in an hour");
    
        });
    
    });

});




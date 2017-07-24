function get_promise(requestUrl){

    var scrapeOptions = {
        url: requestUrl,
        headers: { 'User-Agent':'request'},
        json:true
    };

    var rp = require('request-promise');

    return rp(scrapeOptions)
}

var Promise = require('Promise');

userURL = 'https://api.github.com/search/users?q=location:CapeTown&sort=followers&order=desc';

get_promise(userURL).then(function(users){
 
    users = users.items;
    users = users.map(function(user){
        
        return([user.followers_url,user.login]);
        
    });


    output = users.map(function(userblock){

        get_promise(userblock[0]).then(function(data){
    
            return([data.length,userblock[1]]);

        });

    });

    list.slice(0,10).map(function(line) { console.log(line[0]+" "+line[1])});

});


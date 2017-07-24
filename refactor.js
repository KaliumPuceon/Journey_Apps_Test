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
    users.map(function(user){
        
        console.log(user.login);

    });

});



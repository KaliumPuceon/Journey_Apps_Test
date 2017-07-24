function get_promise(requestUrl){

    var scrapeOptions = {
        url: requestUrl,
        headers: { 'User-Agent':'request'},
        json:true
    };

    var rp = require('request-promise');

    return rp(scrapeOptions)
}

userURL = 'https://api.github.com/search/users?q=location:CapeTown&sort=followers&order=desc';

get_promise(userURL).then(function(users){
    

    var users = Array(users).map(user => {
    
        user = [parse.followers_url,parse.login];
        return(user);

    });


})



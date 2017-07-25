function get_promise(requestUrl){

    var scrapeOptions = {
        url: requestUrl,
        qs: {
            access_token: "3" //REMOVE BEFORE COMMIT
        },
        headers: { 'User-Agent':'request'},
        json:true
    };

    var rp = require('request-promise');

    return rp(scrapeOptions)
}

userURL = 'https://api.github.com/search/users?q=language:javascript+location:"Cape Town"&sort=followers&order=desc';

get_promise(userURL).then(function(users){
 
    users = users.items;
    users = users.map(function(user){
        
        return([user.url, user.login]);
        
    });

    users = users.slice(0,10);

    var stack = [];
    var pair = []
        
    stack = users.map(function(user){
        
        //pair.push(user[1])
        return (get_promise(user[0]));
        
    });
    
    Promise.all(stack).then(data => {
       
        var output = [];
        /*
        output = pair.map(function(x){

           return [x];

        });*/

        output = data.map(function(x){

            return([x.followers,x.login]);

        });

        output.map(line => {

            console.log(line[0]+" "+line[1]);
            
        });

    });

});


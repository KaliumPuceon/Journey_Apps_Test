function get_promise(requestUrl){

    var scrapeOptions = {
        url: requestUrl,
        qs: {
            access_token: "50ee2e9f453a3a7718bbaff2aa6babcb4c876df7" //REMOVE BEFORE COMMIT
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
        
        return([user.url,user.login]);
        
    });

    users = users.slice(0,10);

    var stack = [];
    var pair = []
        
    stack = users.map(function(user){
        
        pair.push(user[1])
        return (get_promise(user[0]));
        
    });
    
    Promise.all(stack).then(data => {
       
        var output = [];

        output = pair.map(function(x){

           return [x];

        });

        data.map(function(x){

            output[data.indexOf(x)].push(x.followers);

        });

        output.map(line => {

            console.log(line[0]+" "+line[1]);
            
        });

    });

});


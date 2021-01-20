module.exports = async function (context, req) {
    context.log('listTweets HTTP trigger function processed a request.');

//  Bindings
    const inputTweetsTable = context.bindings.inputTweetsTable;
    const inputFollowersTable = context.bindings.inputFollowersTable;

// Getting data from Clients
    var username = req.body.username || req.query.username;

// Joining Data Between Tables
    var tweets_timeline = [];

    // Adding the current user, so that his own tweets shows up in the newsfeed
    inputFollowersTable.push({"username_followee": username});
    
    for(follower=0 ; follower < inputFollowersTable.length ; follower++) {

        username_followee = inputFollowersTable[follower]["username_followee"];
        
        for(tweet=0 ; tweet < inputTweetsTable.length ; tweet++) {
            tweet_row = inputTweetsTable[tweet];
            // Tweets from useres you are following
            if(tweet_row["username"] == username_followee) {
                tweets_timeline.push(tweet_row);  
            }
        }
    }

// Ordering tweets from newest to oldest
// https://stackoverflow.com/questions/10123953/how-to-sort-an-array-by-a-date-property
    tweets_timeline.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.created_at) - new Date(a.created_at);
    });
// Sending Data to Client
    content = {
        "tweets":tweets_timeline
        // "followers":inputFollowersTable
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: content
    };

};
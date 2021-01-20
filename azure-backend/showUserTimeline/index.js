module.exports = async function (context, req) {
    context.log('showUserTimeline HTTP trigger function processed a request.');

    //  Bindings
    const inputTweetsTable = context.bindings.inputTweetsTable;
    const inputFollowersTable = context.bindings.inputFollowersTable;
    const inputUserTable = context.bindings.inputUserTable;

    if (req.query.username) {
        var username = req.query.username;

        //  Make sure that the user exists
        if(inputUserTable.length !=0) {

            //  Count the number of Followers and Following
            var following_counter = 0;
            var followers_counter = 0;

            for (index=0;index < inputFollowersTable.length;index++) {
                row = inputFollowersTable[index];
                if (row["username_follower"] == username) {
                    following_counter = following_counter + 1;
                }
                if (row["username_followee"] == username) {
                    followers_counter = followers_counter + 1;
                }
            }
            
            // Ordering tweets from newest to oldest
            // https://stackoverflow.com/questions/10123953/how-to-sort-an-array-by-a-date-property
            inputTweetsTable.sort(function(a,b){
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(b.created_at) - new Date(a.created_at);
                });

            content = {
                "tweets":inputTweetsTable,
                "followers":followers_counter,
                "following":following_counter,
                "userinfo":inputUserTable[0]
            }
            context.res = {
                status: 200, /* Defaults to 200 */
                // Return user Tweets
                // Number of Followers and Following
                body: content
            };
        }
    //  User not found
        else {
            content = {
                "message":"User not found"
            }
            context.res = {
                status: 404, /* Defaults to 200 */
                body: content
            };    
        }
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};
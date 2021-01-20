module.exports = async function (context, req) {
    context.log('listFollowers HTTP trigger function processed a request.');

    //  Bindings
    const inputUserTable = context.bindings.inputUserTable;
    const inputFollowersTable = context.bindings.inputFollowersTable;

    if (req.query.username) {
        var username = req.query.username;

        //  Make sure that the user exists
        if(inputUserTable.length !=0) {

            //  Count the number of Followers and Following
            var list_of_followers = [];

            for (index=0;index < inputFollowersTable.length;index++) {
                row = inputFollowersTable[index];

                if (row["username_followee"] == username) {
                    list_of_followers.push(row["username_follower"]);
                }
            }

            content = {
                "followers":list_of_followers
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
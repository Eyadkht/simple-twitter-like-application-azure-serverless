module.exports = async function (context, req) {

    context.log('addTweet function is processing a request.');

    //  Bindings
    const inputUserTable = context.bindings.inputUserTable;

    if(inputUserTable.length != 0) {
    //  Getting Data
        var username = req.body.username;
        var tweet_text = req.body.tweet_text;
        
    //  Generate Session ID for the new registered User
        const uuidv4 = require('uuid/v4');
        tweet_id = uuidv4();
        tweet_created_at = new Date().toISOString();
    // Save User Session ID in sessions table
        var outputTweetsData = {
            PartitionKey: "tweet",
            RowKey: tweet_id,
            text: tweet_text,
            username: username,
            created_at: tweet_created_at
        };

    // Insert session for the new user in the Sessions Table
        context.bindings.outputTweetsTable = outputTweetsData;

        content = {
            "tweet_text": tweet_text,
            "username": username,
            "created_at":tweet_created_at
        }

        context.res = {
            status: 200, /* Defaults to 200 */
            body: content,
        };
    }
    else {

        content = {
            "message": "Unauthorized"
        }

        context.res = {
            status: 401, /* Defaults to 200 */
            body: content
        };

    } 
    
};
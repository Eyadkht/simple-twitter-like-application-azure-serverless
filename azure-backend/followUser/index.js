module.exports = async function (context, req) {

    context.log('addTweet function is processing a request.');

    //  Bindings
    const inputUserTable = context.bindings.inputUserTable;
    const inputFollowersTable = context.bindings.inputFollowersTable;

    var username = req.body.username;
    var username_followee = req.body.username_followee;

    if (username == username_followee) {

        content = {
            "message": "You can not follow yourself!"
        }

        context.res = {
            status: 400, /* Defaults to 200 */
            body: content
        };
    } 
    else {

        var flag1=false;
        var flag2=false;

        for(index =0 ; index < inputUserTable.length ; index++) {
            row = inputUserTable[index];

            if(row["username"] == username) {
                flag1=true;
            }
            if(row["username"] == username_followee) {
                flag2=true;
            }
        }

        if(flag1 && flag2) {

            // Making sure that the user is not already following the other user
            var new_follower=true;
            for(index =0 ; index < inputFollowersTable.length ; index++) {
                row = inputFollowersTable[index];
                
                if( (row["username_follower"] == username) && (row["username_followee"] == username_followee) ) {
                    new_follower=false;
                    break;
                }
            }

            if (new_follower) {

                //  Generate  unique ID
                const uuidv4 = require('uuid/v4');
                follower_id = uuidv4();

                // Save User Follow in follower table
                    var outputFollowerData = {
                        PartitionKey: username,
                        RowKey: follower_id,
                        username_follower: username,
                        username_followee: username_followee,
                    };

                // Insert follower for the new user in the Sessions Table
                    context.bindings.outputFollowersTable = outputFollowerData;

                    content = {
                        "message": "true"
                    }

                    context.res = {
                        status: 200, /* Defaults to 200 */
                        body: content,
                    };
            } 
            else {
                content = {
                    "message": "User:"+username+" already follows =>" +username_followee
                }
                context.res = {
                    status: 400, /* Defaults to 200 */
                    body: content,
                };
            }
        }
        else {

            content = {
                "message": "Unauthorized / User not found"
            }

            context.res = {
                status: 401, /* Defaults to 200 */
                body: content
            };

        } 
    }

};
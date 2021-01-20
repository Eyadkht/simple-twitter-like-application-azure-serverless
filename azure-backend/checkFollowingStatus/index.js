module.exports = async function (context, req) {
    context.log('checkFollowingStatus function processed a request.');
    
    const inputFollowersTable = context.bindings.inputFollowersTable;

    // Session_id cookie is found
    if(req.body.username) {

        username_follower = req.body.username; 
        username_followee = req.body.username_followee;
        
        following_found = true;

        for(r=0 ; r < inputFollowersTable.length ; r++){
            row = inputFollowersTable[r];
            if( (row["username_follower"] == username_follower) && (row["username_followee"] == username_followee) ) {
                following_found = false;
                break;
            }
        }
    
        if (following_found) {

            message = {"status":"false",
                        "username_follower":username_follower
            }
            content = { "message" : message
                    };
            
            context.res = {
                status: 200,
                body: content
            };
        }
        else {
            message = "true";
            content = { "message" : message
                    };
            
            context.res = {
                status: 200,
                body: content
            };
        }

    }
//  Username param not found
    else {
        message = "No username param found";

        context.res = {
            status: 404,
            body: '{"message" : "' + message + '"}'
        };
    }
}
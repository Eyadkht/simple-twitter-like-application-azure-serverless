module.exports = async function (context, req) {
    context.log('checkPrivilege function processed a request.');
    
    var dict = {};
    session_cookie = req.body.session_id;
    if(session_cookie) {
        var str = session_cookie;
        var res = str.split(";");
        res.forEach(function(cookie) {
            var res2 = cookie.split("=");
            dict[res2[0]] = res2[1];
        });

    // Session_id cookie is found
        if(dict["session_id"]) {

            session_id = dict["session_id"];

            const sessionTable = context.bindings.sessionTable;
            session_row ={};
            session_found = false;

            for(r=0 ; r < sessionTable.length ; r++){
                row = sessionTable[r];
                if(row["RowKey"] == session_id) {
                    session_found = true;
                    session_row = row;
                    break;
                }
            }
        
            if (session_found) {

                message = "true";
                content = { "message" : message,
                            "username" : session_row["username"]
                        };
                
                context.res = {
                    status: 200,
                    body: content
                };
            }
            else {
                message = "Incorrect Session_id";
                content = { "message" : message
                        };
                
                context.res = {
                    status: 404,
                    body: content
                };
            }

        }
    // Session_id cookie not found
        else {
            message = "No Session Cookie found";

            context.res = {
                status: 200,
                body: '{"message" : "' + message + '"}'
            };
        }
    }
// Cookie not found
    else
    {
        message = "No Cookie found";
        context.res = {
            status: 200,
            body: '{"message" : "' + message + '"}'
        };
    }
};
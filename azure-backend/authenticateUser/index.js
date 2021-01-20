module.exports = async function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');
     
    const usersTable = context.bindings.userTable;

    //context.log(usersTable);

    if(usersTable.length != 0){
        var username = req.query.username || req.body.username
        var password = req.query.password || req.body.password

        var userPassword = usersTable[0]["password"]

    // Matching Passwords
        if (userPassword == password) {

        // Generate Session ID for the user
            const uuidv4 = require('uuid/v4');
            session_id = uuidv4();

        // Save User Session ID in sessions table
            var tableData = {
                PartitionKey: "session",
                RowKey: session_id,
                username: username,
            };

        // Insert session for the new user in the Sessions Table
            context.bindings.outputTable = tableData;

        // Set Cookie with the generated session_id for user to use in subsequent requests
            headers = {
                'Content-Type': 'text/plain',
                'Set-Cookie': 'session_id='+session_id,
            }

            redirect_url = {
                "url": "https://sotrageaccountsocialapp.z33.web.core.windows.net/feed.html",
                "cookie":'session_id='+session_id
            }
            context.res = {
                status: 200, /* Defaults to 200 */
                body: redirect_url,
                headers: headers
            };
       }
       // Username is not Found
       else {

            content = {"message" : "Submitted password is incorrect"}

            context.res = {
            status: 403, /* Defaults to 200 */
            body: content
            };
       }
       
    }
    else {
        content = {"message" : "Submitted username is not found"}
        
        context.res = {
        status: 404,
        body: content
        };
    }
    
};
module.exports = async function (context, req) {

    context.log('registerUser function is processing a request.');

//  Bindings
    const inputUserTable = context.bindings.inputUserTable;
    context.log(inputUserTable);
    if(inputUserTable.length == 0) {
    //  Getting Data
        var username = req.query.username || req.body.username
        var password = req.query.password || req.body.password
        var description = req.query.description || req.body.description
        var email = req.query.email || req.body.email

    //  Generate Session ID for the new registered User
        const uuidv4 = require('uuid/v4');
        session_id = uuidv4();

    // Save User Session ID in sessions table
        var sessionTableData = {
            PartitionKey: "session",
            RowKey: session_id,
            username: username,
        };

        var userTableData = {
            PartitionKey: "user",
            RowKey: session_id,
            username: username,
            password: password,
            description: description,
            email:email
        };

    // Insert session for the new user in the Sessions Table
        context.bindings.outputSessionTable = sessionTableData;

    // Insert session for the new user in the Sessions Table
        context.bindings.outputUserTable = userTableData;

    // Set Cookie with the generated session_id for user to use in subsequent requests
        headers = {
            'Content-Type': 'text/plain',
            'Set-Cookie': 'session_id=' + session_id,
        }

        content = {
            "url": "https://sotrageaccountsocialapp.z33.web.core.windows.net/feed.html",
            "cookie":'session_id='+session_id
        }

        context.res = {
            status: 200, /* Defaults to 200 */
            body: content,
            headers: headers
        };
    }
    else {

        content = {
            "message": "The username you selected is already taken, use another one"
        }

        context.res = {
            status: 409, /* Defaults to 200 */
            body: content
        };

    } 
    
};
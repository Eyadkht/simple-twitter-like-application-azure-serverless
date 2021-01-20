#Azure Services  
This application was built using three main Azure services; Azure Functions, Azure Blob Storage,
and Table Storage.  

#Azure Functions  
The developed functions served as the main business logic layer (back-end) for the whole
application. Functions were responsible for processing all users’ requests, and querying Table
Storage when needed.  

#Azure Blob Storage  
Blob storage was used to store the application’s files such as HTML, JavaScript, CSS, and images
which combined, resembles the front-end of the serverless application. The connection between
the front-end and the back-end is all controlled by the JavaScript files stored publicly on the Blob
storage.  

#Azure Table Storage  
Table Storage is the service that enabled the application to have persistent storage for storing user’s
related data and tweets. The use of a structured SQL database could have been a better option for
this type of application, however, the simplicity, ease of use, and the scalability of Table Storage
made it a better option for rapidly develop the application.  

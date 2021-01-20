# Description
A very simple "Social Media" application (HTML, CSS + JavaScript) whose backend is primarily based on Azure Functions, an event-driven Function-as-a-Service (FaaS) platform provided by Microsoft Azure. This project was developed for the Cloud Application Developent course at the University of Southampton.

# Technologies  
## Azure Services  
This application was built using three main Azure services; Azure Functions, Azure Blob Storage,
and Table Storage.  

## Azure Functions  
The developed functions served as the main business logic layer (back-end) for the whole
application. Functions were responsible for processing all users’ requests, and querying Table
Storage when needed.  

## Azure Blob Storage  
Blob storage was used to store the application’s files such as HTML, JavaScript, CSS, and images
which combined, resembles the front-end of the serverless application. The connection between
the front-end and the back-end is all controlled by the JavaScript files stored publicly on the Blob
storage.  

## Azure Table Storage  
Table Storage is the service that enabled the application to have persistent storage for storing user’s
related data and tweets. The use of a structured SQL database could have been a better option for
this type of application, however, the simplicity, ease of use, and the scalability of Table Storage
made it a better option for rapidly develop the application.  

# Implemented Features
| Feature                 | Description                                                                                                                                                                                                                                                                                                                                                                                                     |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Add a user / Signup     | A dedicated   page where users can create a new profile on the platform. Simple back-end   validation was implemented for preventing users to create profiles with the   same username. After the registration complete, a user will be redirected to   the news feed page.                                                                                                                                     |
| Sign-in                 | Users can   sign-in using the credentials they have sign-up with, username and password.   A function was created to authenticate the user and to create a session id   for the user in the sessions table. User will send the session id saved in   his browser cookies with a subsequent request to the server to access   protected pages, such as news feed page, and to allow for following other   users. |
| Display User News Feed  | After   signing-in, a user will be redirected to the news feed page that will show   the list of tweets of the people the user is following, in addition to the   user own tweets. The tweets on the feed page are ordered from most recent to   oldest.                                                                                                                                                        |
| Add a Tweet             | User can   publish text tweets, which will be shown on his timeline and to the users who   are following that user. All tweets are stored in a dedicated table in Table   Storage called “tweets”.                                                                                                                                                                                                              |
| Display User’s Timeline | This will   enable any user or guest, to check the tweets that a single user has   published to the application.                                                                                                                                                                                                                                                                                                |
| Follow User             | Users can follow other registered users in the application. The   table that modelled this relation is the “followers” table. It consists of   two columns, a follower, and a followee.                                                                                                                                                                                                                         |
| List of followers       | Show a list of   users that follows a specific user.                                                                                                                                                                                                                                                                                                                                                            |
| List of Following       | Display a list   of users that a specific user is following.                                                                                                                                                                                                                                                                                                                                                    |

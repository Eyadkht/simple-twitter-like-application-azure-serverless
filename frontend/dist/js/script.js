//################## Utilities Functions ###################
//http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

const months_short_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

//############ Show Message #################
function showMessage(theMessage) {
  var someHTML = `
    Message from Server <br> ${theMessage}
    `;
  document.getElementById('output').innerHTML = document.getElementById('output').innerHTML + someHTML;
}

function showUsername(theMessage) {
  var someHTML = `<a href="https://sotrageaccountsocialapp.z33.web.core.windows.net/usertimeline.html?username=${theMessage}"> <h3 id="username_id" class="profile-username text-center">${theMessage}</h3> </a>`;
  document.getElementById('username_element').innerHTML = someHTML + document.getElementById('username_element').innerHTML;
}

function showDescription(theMessage) {
  var someHTML = `${theMessage}`;
  document.getElementById('description_element').innerHTML = someHTML;
}

function showTweets(theMessage) {
  var someHTML = "";
  
  if(theMessage.length == 0) {
    someHTML = `
    <h3> No Tweets to show.<h3>
    `
  }
  else {
    for (tweet = 0; tweet < theMessage.length; tweet++) {
      date_of_tweet = new Date( Date.parse(theMessage[tweet]["created_at"]));
      someHTML = someHTML +
        `
        <div class="post">
                      <div class="user-block">
                          <img class="img-circle img-bordered-sm" src="dist/img/user-image.png" alt="User Image">
                          <span class="username">
                              <a href="https://sotrageaccountsocialapp.z33.web.core.windows.net/usertimeline.html?username=${theMessage[tweet]['username']}">${theMessage[tweet]['username']}</a>
                          </span>
                          <span class="description">Shared publicly | ${date_of_tweet.getFullYear()} ${date_of_tweet.getDate()} ${months_short_names[date_of_tweet.getMonth()]} ${date_of_tweet.getHours()}:${date_of_tweet.getMinutes()}</span>
                      </div>
                      <p>
                          ${theMessage[tweet]['text']}
                      </p>
          </div>
        `
    }
  }
  
  document.getElementById('tweets_feed').innerHTML = document.getElementById('tweets_feed').innerHTML + someHTML;
}

function showNewTweet(theMessage) {
  current_tweets = document.getElementById('tweets_feed').innerHTML = document.getElementById('tweets_feed').innerHTML;
  date_of_tweet = new Date( Date.parse(theMessage["created_at"]));
  if(current_tweets.length == 71) {
    someHTML = 
    `
        <div class="post">
                  <div class="user-block">
                      <img class="img-circle img-bordered-sm" src="dist/img/user-image.png" alt="User Image">
                      <span class="username">
                          <a href="https://sotrageaccountsocialapp.z33.web.core.windows.net/usertimeline.html?username=${theMessage["username"]}">${theMessage["username"]}</a>
                      </span>
                      <span class="description">Shared publicly | ${date_of_tweet.getFullYear()} ${date_of_tweet.getDate()} ${months_short_names[date_of_tweet.getMonth()]} ${date_of_tweet.getHours()}:${date_of_tweet.getMinutes()}</span>
                  </div>
                  <p>
                      ${theMessage["tweet_text"]}
                  </p>
        </div>
    `
    document.getElementById('tweets_feed').innerHTML = someHTML;
  }
  else {
    someHTML =
    `
    <div class="post">
                  <div class="user-block">
                      <img class="img-circle img-bordered-sm" src="dist/img/user-image.png" alt="User Image">
                      <span class="username">
                          <a href="https://sotrageaccountsocialapp.z33.web.core.windows.net/usertimeline.html?username=${theMessage["username"]}">${theMessage["username"]}</a>
                      </span>
                      <span class="description">Shared publicly | ${date_of_tweet.getFullYear()} ${date_of_tweet.getDate()} ${months_short_names[date_of_tweet.getMonth()]} ${date_of_tweet.getHours()}:${date_of_tweet.getMinutes()}</span>
                  </div>
                  <p>
                      ${theMessage["tweet_text"]}
                  </p>
      </div>
    `
    document.getElementById('tweets_feed').innerHTML = someHTML + document.getElementById('tweets_feed').innerHTML;
  }
  
}

function showFollowButton(theMessage) {
  someHTML = 
  `<a id="follow_button" href="#" class="btn btn-default btn-block"><b>Follow</b></a>
  <input type="hidden" id="follower_username" name="follower_username" value="${theMessage}">
  `
  document.getElementById('username_element').innerHTML = document.getElementById('username_element').innerHTML + someHTML;

  follow_button = document.getElementById('follow_button');
  follow_button.addEventListener('click', followUser);
  follow_button.myParam = GetURLParameter("username");
}

function showFollowingButton() {
  someHTML = 
  `<a id="following_button" href="#" class="btn btn-primary btn-block"><b>Following</b></a>
  `
  document.getElementById('username_element').innerHTML = document.getElementById('username_element').innerHTML + someHTML;
}

function showSinginRequiredButton() {
  someHTML = 
  `<a href="#" class="btn btn-primary btn-block"><b>Sign in Required to Follow Users</b></a>
  `
  document.getElementById('username_element').innerHTML = document.getElementById('username_element').innerHTML + someHTML;
}

function changeFollowToFollowing() {
  document.getElementById('follow_button').innerHTML = "Following";
  document.getElementById('follow_button').className = "btn btn-primary btn-block"
  document.getElementById('follow_button').id = "following_button"
}

function showFollowers(theMessage) {
  var someHTML = "";
  for (user = 0; user < theMessage.length; user++) {
    someHTML = someHTML +
      `
          <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
              <div class="card bg-light">
                <div class="card-body pt-10">
                  <div class="row">
                    <div class="col-7">
                      <h2 class="lead"><a href="https://sotrageaccountsocialapp.z33.web.core.windows.net/usertimeline.html?username=${theMessage[user]}">${theMessage[user]}</a></h2>
                    </div>
                    <div class="col-5 text-center">
                      <img src="dist/img/user-image.png" alt="" class="img-circle img-fluid">
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">
                    <a href="https://sotrageaccountsocialapp.z33.web.core.windows.net/usertimeline.html?username=${theMessage[user]}" class="btn btn-sm btn-primary">
                      <i class="fas fa-user"></i> View Profile
                    </a>
                  </div>
                </div>
              </div>
          </div>
      `
  }
  document.getElementById('followers_users').innerHTML = someHTML;
}

function showFollowing(theMessage) {
  var someHTML = "";
  for (user = 0; user < theMessage.length; user++) {
    someHTML = someHTML +
      `
          <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
              <div class="card bg-light">
                <div class="card-body pt-10">
                  <div class="row">
                    <div class="col-7">
                      <h2 class="lead"><a href="https://sotrageaccountsocialapp.z33.web.core.windows.net/usertimeline.html?username=${theMessage[user]}">${theMessage[user]}</a></h2>
                    </div>
                    <div class="col-5 text-center">
                      <img src="dist/img/user-image.png" alt="" class="img-circle img-fluid">
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">
                    <a href="https://sotrageaccountsocialapp.z33.web.core.windows.net/usertimeline.html?username=${theMessage[user]}" class="btn btn-sm btn-primary">
                      <i class="fas fa-user"></i> View Profile
                    </a>
                  </div>
                </div>
              </div>
          </div>
      `
  }
  document.getElementById('following_users').innerHTML = someHTML;
}

function setFollowingCount(theMessage) {
  someHTML = ` ${theMessage}`
  document.getElementById('following_tab').innerHTML = document.getElementById('following_tab').innerHTML + " " + someHTML;
}

function setFollowersCount(theMessage) {
  someHTML = ` ${theMessage}`
  document.getElementById('followers_tab').innerHTML = document.getElementById('followers_tab').innerHTML + " " + someHTML;
}

// ############### Show Error ####################

function showError(theError) {
  var someHTML = `
    <div class="alert alert-danger" role="alert">
    Oh no! - ${theError} :(
    </div>
    `;
  document.getElementById('output').innerHTML = someHTML;
}

// ############## Process Responses ######################

function processResponse(response) {
  if (response.status === 200) {
    response.json()
      .then(function (data) {
        document.cookie = data.cookie;
        window.location.replace(data.url);
      })
      .catch(function () { showError("JSON Messed Up"); });
  }
  else {
    response.json()
      .then(function (data) {
        showError(data.message);
      })
      .catch(function () { showError("JSON Messed Up"); });
  }
}
// User Feed


function processAddTweet(response) {
  if (response.status === 200) {
    response.json()
      .then(function (data) {
        showNewTweet(data);
      }).catch(function () { showError("JSON Messed Up"); });
  }
  else {
    response.json()
      .then(function (data) {
        showError(data.message);
      })
  }
}

function processPrivilegeResponse(response) {

  if (response.status === 200) {
    response.json()
      .then(function (data) {
        showUsername(data.username);

        if (data.message == "true") {
          // Load Tweets and other elements related to this page 
          loadTweets(data.username);
        }
        else {
          showError(data.message);
          // Redirect user to Login page
          window.location.replace("https://sotrageaccountsocialapp.z33.web.core.windows.net/signin.html");
        }
      }).catch(function () { showError("JSON Messed Up"); });

  }
  else {
    response.json()
      .then(function (data) {
        showError(data.message);
        // Redirect user to Login page
        window.location.replace("https://sotrageaccountsocialapp.z33.web.core.windows.net/signin.html");
      })
  }
}

function processTweets(response) {
  if (response.status === 200) {
    response.json()
      .then(function (data) {
        showTweets(data.tweets);
      }).catch(function () { showError("JSON Messed Up"); });
  }
  else {
    response.json()
      .then(function (data) {
        showError(data.message);
        // Redirect user to Login page
        window.location.replace("https://sotrageaccountsocialapp.z33.web.core.windows.net/signin.html");
      })
  }
}

// User Timeline
function processPrivilegeUsertimeline(response) {

  if (response.status === 200) {
    response.json()
      .then(function (data) {
        if (data.message == "true") {
          // The user visiting this page is signined in, therefor, the next step is to check if the user already follows this account or not
          checkFollowingStatus(data.username);
        }
        else {
          // The user is a guest
          showSinginRequiredButton();
        }
      }).catch(function () { showError("JSON Messed Up"); });

  }
  else {
    response.json()
      .then(function (data) {
        showError(data.message);
        // Redirect user to Login page
        window.location.replace("https://sotrageaccountsocialapp.z33.web.core.windows.net/signin.html");
      })
  }
}

function processFollowingStatus(response) {

  if (response.status === 200) {
    response.json()
      .then(function (data) {
        if (data.message == "true") {
          // The user is already following this account, an activated button showed be shown.
          showFollowingButton();
        }
        else {
          // The user is not following this account, a button to follow this user showd be shown.
          showFollowButton(data.message.username_follower);
        }
      }).catch(function () { showError("JSON Messed Up"); });

  }
  else {
    response.json()
      .then(function (data) {
        showError(data.message);
        // Redirect user to Login page
        window.location.replace("https://sotrageaccountsocialapp.z33.web.core.windows.net/signin.html");
      })
  }
}

function processUserTweets(response) {
  if (response.status === 200) {
    response.json()
      .then(function (data) {
        showUsername(data.userinfo["username"]);
        showDescription(data.userinfo["description"]);
        showTweets(data.tweets);
        setFollowingCount(data.following);
        setFollowersCount(data.followers);
      }).catch(function () {
        showError("JSON Messed Up Process Tweets");
      });
  }
  else {
    response.json()
      .then(function (d) {
        showError(d.message);
      })
  }
}

function processFollowers(response) {
  if (response.status === 200) {
    response.json()
      .then(function (data) {
        showFollowers(data.followers);
      }).catch(function () {
        showError("JSON Messed Up Process Followers");
      });
  }
  else {
    response.json()
      .then(function (data) {
        showError(data.message);
      })
  }
}

function processFollowing(response) {
  if (response.status === 200) {
    response.json()
      .then(function (data) {
        showFollowing(data.following);
      }).catch(function () {
        showError("JSON Messed Up Process Followers");
      });
  }
  else {
    response.json()
      .then(function (data) {
        showError(data.message);
      })
  }
}

function processFollowUser(response) {
  if (response.status === 200) {
    response.json()
      .then(function (data) {
        changeFollowToFollowing();
      }).catch(function () {
        showError("JSON Messed Up Process Followers");
      });
  }
  else {
    response.json()
      .then(function (data) {
        showError(data.message);
      })
  }
}
// ################### Submit Requestes #################

function submitCredentials(e) {
  e.preventDefault();

  let username = document.getElementById('name').value;
  let password = document.getElementById('password').value;
  fetch('https://comp6244-socialapp.azurewebsites.net/api/authenticateUser', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then((res) => processResponse(res))
}

function submitRegistration(e) {
  e.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let description = document.getElementById('description').value;
  let email = document.getElementById('email').value;
  fetch('https://comp6244-socialapp.azurewebsites.net/api/registerUser', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
      description: description,
      email: email
    })
  })
    .then((res) => processResponse(res))
}

// User Feed
function checkPrivilege(e) {
  e.preventDefault();
  //alert(document.cookie);
  fetch('https://comp6244-socialapp.azurewebsites.net/api/checkPrivilege', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      session_id: document.cookie
    })
  })
    .then((res) => processPrivilegeResponse(res))
}

function loadTweets(user_token) {
  fetch('https://comp6244-socialapp.azurewebsites.net/api/listTweets', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username: user_token
    })
  })
    .then((res) => processTweets(res))
}

function submitTweet(e) {
  e.preventDefault();
  let tweet_text = document.getElementById('tweet_text').value;
  document.getElementById('tweet_text').value = "";
  let username = document.getElementById('username_id').innerHTML;
  fetch('https://comp6244-socialapp.azurewebsites.net/api/addTweet', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      tweet_text: tweet_text
    })
  })
    .then((res) => processAddTweet(res))
}

// User timeline
function loadUserTweets(user_token) {
  fetch('https://comp6244-socialapp.azurewebsites.net/api/showUserTimeline' + '?username=' + user_token, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    }
  })
    .then((res) => processUserTweets(res))
}

function loadFollowers(evt) {
  user_token = evt.currentTarget.myParam;
  fetch('https://comp6244-socialapp.azurewebsites.net/api/listFollowers' + '?username=' + user_token, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    }
  })
    .then((res) => processFollowers(res))
}

function loadFollowing(evt) {
  user_token = evt.currentTarget.myParam;
  fetch('https://comp6244-socialapp.azurewebsites.net/api/listFollowing' + '?username=' + user_token, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    }
  })
    .then((res) => processFollowing(res))
}

// Following a new User
function checkPrivilegeUserTimeline(e) {
  //alert(document.cookie);
  fetch('https://comp6244-socialapp.azurewebsites.net/api/checkPrivilege', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      session_id: document.cookie
    })
  })
    .then((res) => processPrivilegeUsertimeline(res))
}

function checkFollowingStatus(user_token) {
  let username_followee = GetURLParameter("username");

  fetch('https://comp6244-socialapp.azurewebsites.net/api/checkFollowingStatus', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username: user_token,
      username_followee:username_followee
    })
  })
    .then((res) => processFollowingStatus(res))
}

function followUser(evt) {
  username_followee = evt.currentTarget.myParam;
  let username_follower = document.getElementById('follower_username').value;

  fetch('https://comp6244-socialapp.azurewebsites.net/api/followUser', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username_follower,
      username_followee:username_followee
    })
  })
    .then((res) => processFollowUser(res))
}
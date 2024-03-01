$(document).ready(() => {
  // $body set equal to the <body> element
  const $body = $('body');
  // make a new div element with the id "tweets" and assign it to $tweetsDiv
  const $tweetsDiv = $('<div id="tweets">');
  // add $tweetsDiv to body using append
  $body.append($tweetsDiv);
  // creates button element called "Show New Tweets" and assign it to $showNewTweetsButton
  const $showNewTweetsButton = $('<button>Show New Tweets</button>');
  // add $showNewTweets button to body using prepend
  $body.prepend($showNewTweetsButton);

  // create a function to make new tweets
  function makeNewTweets(array) {
    // clear the existing tweets so new tweets replace the old ones
    $tweetsDiv.html('');
    // iterate through the latest tweets in reverse order to display new tweets at the top
    for (let i = array.length - 1; i >= 0; i--) {
      // get all tweets in reverse order and assign it to tweet
      const tweet = array[i];
      // create a new div and assign it to $tweet
      const $tweet = $('<div id="each tweet">');
      // timestamps
      const originalTimestamp = moment(tweet.created_at).format("MMMM Do YYYY, h:mm a");
      const relativeTimestamp = moment(tweet.created_at).fromNow();
      // create a new div called username and assign it to $username
      const $username = $(`<div id = "username">@${tweet.user}</div>`);
      // make $username clickable by giving it a click handler
      // inside the click handler, call makeNewTweets(stream.users[tweet.user])
      $username.on('click', function() {
        makeNewTweets(streams.users[tweet.user]);
      });
      // add $username to $tweet
      $tweet.append($username);
      // the text that shows up on my site
      const text = `${tweet.message} - ${originalTimestamp} (${relativeTimestamp})`;
      // make a new div that we are going to add the test to
      const $newDiv = $('<div id="new div">')
      // sets the text to $newDiv
      $newDiv.text(text);
      //add $newDiv to $tweet using append
      $tweet.append($newDiv)
      // add $tweet to $tweetsDiv using append
      $tweetsDiv.append($tweet);
    }
  }

  // call function with streams.home so the tweets show up
  makeNewTweets(streams.home);

  // bind a click event to the button
  $showNewTweetsButton.on('click',function() {
    makeNewTweets(streams.home);
  });

  // function to update timestamps periodically
  function updateTimestamps(){
    makeNewTweets();
  }

  // update timestamps every minute
  setInterval(updateTimestamps, 60000);

  // create my form
  const $tweetForm = $('<form id="tweetForm">');
  const $usernameLabel = $('<label for="username">Username:</label>');
  const $usernameInput = $('<input type="text" id="username" name="username" required>');
  const $tweetLabel = $('<label for="tweet">Tweet:</label>');
  const $tweetInput = $('<input type="text" id="tweet" name="tweet" required>');
  const $submitButton = $('<button type="submit">Post Tweet</button>');

  $tweetForm.append($usernameLabel, $usernameInput, $tweetLabel, $tweetInput, $submitButton);
  $body.prepend($tweetForm);

  $tweetForm.on('submit', function(event){
    event.preventDefault();
    const username = $userNameInput.val();
    const tweetMessage = $tweetInput.val()
    const theTweet = username + tweetMessage;
    writeTweet(theTweet);
    makeNewTweets(streams.home);
  })

});

// create a form for the user to be able to type in their new tweet
  // on submission of that form, thats when i call writeTweet function
  // errors will show up and pay attention to them
    // look at the lines of the errors and look at whats happening
    // set global.visitor to whatever i want like visitor
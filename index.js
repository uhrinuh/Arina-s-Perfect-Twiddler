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
  // make a header and add it to $header
  const $header = $('<header id="twiddlerHeader">Twiddler</header>');

  //decorate!
  $body.css("background-color", "lavender")
  $tweetsDiv.css("background-color", "pink").css("border-radius", "5px").css("padding", "3px")
  $header.css("font-family", "Snell Roundhand").css('font-size', '50px').css('text-align', 'center').css("background-color", "LightPink").css("border-radius", "5px").css("padding", "3px")

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
      // decorate!
      $tweet.css({
        'margin-bottom': '20px',
        'padding': '10px',
        'background-color': '#fff',
        'border': '1px solid #ddd',
        'border-radius': '8px',
        'box-shadow': '0 0 5px rgba(0, 0, 0, 0.1)',
      });
      $username.css({
        'font-weight': 'bold',
        'color': '#333',
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

  // decorate!
  $tweetForm.css({
    'margin-top': '20px',
    'padding': '20px',
    'background-color': '#f9f9f9',
    'border-radius': '8px',
    'box-shadow': '0 0 10px rgba(0, 0, 0, 0.1)',
   });
  $tweetForm.find('label').css({
    'display': 'block',
    'margin-bottom': '8px',
  });
  $tweetForm.find('input').css({
    'width': '100%',
    'padding': '8px',
    'margin-bottom': '16px',
    'box-sizing': 'border-box',
    'border': '1px solid #ccc',
    'border-radius': '4px',
    'font-size': '16px',
  });
  $tweetForm.find('button').css({
    'background-color': '#4CAF50',
    'color': '#fff',
    'padding': '10px 20px',
    'border': 'none',
    'border-radius': '4px',
    'cursor': 'pointer',
    'font-size': '16px',
  });
  
  // add all my forms to the right spots
  $tweetForm.append($usernameLabel, $usernameInput, $tweetLabel, $tweetInput, $submitButton);
  $body.prepend($tweetForm);
  // make the header be on top of the form
  $header.insertBefore($tweetForm);

  $tweetForm.on('submit', function(event){
    event.preventDefault();
    var username = $usernameInput.val();
    // set window.visitor to username
    window.visitor = username;
    // if that username doesn't exist then make it
    if (!streams.users[username]) {
      streams.users[username] = [];
    }
    // make the tweet too
    const tweetMessage = $tweetInput.val();
    // reference writeTweet
    writeTweet(tweetMessage);
    // reference makeNewTweets
    makeNewTweets(streams.home);
  });

});
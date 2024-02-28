$(document).ready(() => {
  const $body = $('body');
  // make a new div "tweets" and assign it to $tweetsDiv
  const $tweetsDiv = $('<div id="tweets">');
  // add $tweetsDiv to body using append
  $body.append($tweetsDiv);
  // create button "Show New Tweets" and assign it to $showNewTweetsButton
  const $showNewTweetsButton = $('<button>Show New Tweets</button>');
  // add $showNewTweets button to body using prepend
  $body.prepend($showNewTweetsButton);

  // create a function to make new tweets
  function makeNewTweets() {
    // clear the existing tweets
    $tweetsDiv.html('');
    // iterate through the latest tweets in reverse order to display new tweets at the top
    for (let i = streams.home.length - 1; i >= 0; i--) {
      const tweet = streams.home[i];
      const $tweet = $('<div></div>');
      // timestamp
      const formattedTimestamp = moment(tweet.created_at).fromNow();
      const text = `@${tweet.user}: ${tweet.message} (${formattedTimestamp})`;
      $tweet.text(text);
      // add $tweet to $tweetsDiv
      $tweetsDiv.append($tweet);
    }
  }
  // create a function to add the new tweets to the top of the tweets div
  function handleNewTweet(tweet) {
    const $newTweet = $('<div></div>');
    // timestamp
    const formattedTimestamp = moment(tweet.created_at).fromNow();
    const newText = `@${tweet.user}: ${tweet.message} (${formattedTimestamp})`;
    $newTweet.text(newText);
    $tweetsDiv.prepend($newTweet);
  }
  // call original function so the original tweets show up
  makeNewTweets();
  // create a function to handle new tweets generated by the data generator
  function handleNewTweetFromGenerator() {
    const latestTweet = streams.home[streams.home.length - 1];
    // call handleNewTweet using latestTweet so the new tweets show up first
    handleNewTweet(latestTweet);
  }
  // bind a click event to the button
  $showNewTweetsButton.click(() => {
    handleNewTweetFromGenerator();
  });
  // function to update timestamps periodicially
  function updateTimestamps(){
    makeNewTweets();
  }
  // update timestamps every minute
  setInterval(updateTimestamps, 60000);
});

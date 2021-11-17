/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const createTweetElement = function(tweetInfo) {
  let tweet = `<article>
    <header>
      <div class="name">
        <img src=${tweetInfo.user.avatars}>
        <span>${tweetInfo.user.name}</span>
      </div>
      <div class="username">
        <span>${tweetInfo.user.handle}</span>
      </div>
    </header>
    <div class="tweetcontent">
      <p>
      ${tweetInfo.content.text}
      </p>
    </div>
    <footer>
      <span>
      ${timeago.format(tweetInfo.created_at)}
      </span>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`;

  return tweet;
};

const renderTweets = function(tweets) {
  for (let tweetdata of tweets) {
    $('#tweet-container').append(createTweetElement(tweetdata));
  }
};


$(document).ready(function() {

  $('#new-tweet').on('submit', (evt) => {
    evt.preventDefault();
    
    const val = $(evt.target.text).serialize();
    
    $.post("/tweets/", val);

  });

  const loadTweets = function() {

    $.get("/tweets").then(data => {
      renderTweets(data);
    });

  };

  loadTweets();



});
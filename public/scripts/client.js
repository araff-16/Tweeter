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
    $('#tweet-container').prepend(createTweetElement(tweetdata));
  }
};


$(document).ready(function() {

  $('#new-tweet').on('submit', (evt) => {
    evt.preventDefault();
    
    if (evt.target.text.value === '') {
      alert("Tweets cannot be an empty string");
      return;
    }

    if (evt.target.counter.value < 0) {
      alert("Tweets cannot be greater than 140 characters");
      return;
    }

    const val = $(evt.target.text).serialize();
    
    $.post("/tweets/", val).then(()=>{
      
      //Resets the field in form
      $('#new-tweet').trigger("reset");

      //Make new AJAX to load new tweet
      $.get("/tweets").then(data => {
        let newTweet = data[data.length - 1];
        $('#tweet-container').prepend(createTweetElement(newTweet));
      });

    });

  });

  const loadTweets = function() {

    $.get("/tweets").then(data => {
      renderTweets(data);
    });

  };

  loadTweets();



});
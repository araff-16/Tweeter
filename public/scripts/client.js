/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//creates an article html element provided necessary tweet info
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
      ${escape(tweetInfo.content.text)}
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

//Loops through all tweets in the datbase an renders them on the page
const renderTweets = function(tweets) {
  for (let tweetdata of tweets) {
    $('#tweet-container').prepend(createTweetElement(tweetdata));
  }
};

//Prevents against Cross Site Scripting
//Ensures user input is only text
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {

  $('#new-tweet').on('submit', (evt) => {
    evt.preventDefault();

    $("#errorMessage").slideUp();

    if (evt.target.text.value === '') {
      $("#errorMessage p").text("Tweets cannot be an empty string!");
      $("#errorMessage").slideDown({
        start: function() {
          $(this).css({
            display: "flex"
          });
        }
      });
      return;
    }

    if (evt.target.counter.value < 0) {
      $("#errorMessage p").text("Tweets cannot be greater than 140 characters!");
      $("#errorMessage").slideDown({
        start: function() {
          $(this).css({
            display: "flex"
          });
        }
      });
      return;
    }

    const val = $(evt.target.text).serialize();
    
    $.post("/tweets/", val).then(()=>{
      
      //Resets the field in form
      $('#new-tweet').trigger("reset");
      $('.counter').val('140')

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

  $("#navNewTweetBut").on("click", () =>{

    console.log($(".new-tweet").css("display"));

    if ($(".new-tweet").css("display") === "none") {
      $(".new-tweet").slideDown();
      return;
    }

    if ($(".new-tweet").css("display") === "block") {
      $(".new-tweet").slideUp();
      return;
    }

  });

});
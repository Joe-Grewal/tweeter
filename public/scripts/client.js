/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetData) {
  const time = timeago.format(tweetData['created_at']);
  let $tweet = (`
    <article class="tweet">
      <header>
        <div class="userAvatar">
          <img src=${tweetData.user.avatars}>
          <p id="firstName">${tweetData.user.name}</p>
        </div>
        <div>
          <p id="userName">${tweetData.user.handle}</p>
        </div>
      </header>
      <p class="tweetText">${tweetData.content.text}</p>
      <footer>
        <div class="contentFooter">
          <p>${time}</p>
          <div class="icons">
            <i class="fas fa-flag" ></i>
            <i class="fas fa-retweet" ></i>
            <i class="fas fa-heart" ></i>
          </div>
        </div>
      </footer>
    </article>`);
return $tweet;
};

// // Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like

// $(document).ready(function() {
//   $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
// });

// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const renderTweets = function(tweets) {
  $(document).ready(function() {
    tweets.forEach(tweet => {
      $('#tweets-container').append(createTweetElement(tweet));
    })
  });
};

// renderTweets(data);

$(document).ready(function() {
  $(".textField").submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    $.post("/tweets", formData, function(data) {
      console.log(formData);
      loadTweets();
    });
  });
});

const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "json",
    success: (data) => {
      console.log("request succeeded and here's the data", data);
      renderTweets(data);
    },
    error: (error) => {
      console.log("request failed and here's the error", error);
    },
  });
};

loadTweets();
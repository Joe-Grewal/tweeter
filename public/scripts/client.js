const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetData) {
  const time = timeago.format(tweetData['created_at']);
  let $tweet = (`
    <article class="tweet">
      <header>
        <div class="userAvatar">
          <img src=${tweetData.user.avatars}>
          <p id="firstName">${escape(tweetData.user.name)}</p>
        </div>
        <div>
          <p id="userName">${escape(tweetData.user.handle)}</p>
        </div>
      </header>
      <p class="tweetText">${escape(tweetData.content.text)}</p>
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

const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      $('#tweets-container').prepend(createTweetElement(tweet));
    })
};

// helper function to render just the newest tweet
const renderNewTweet = function(tweets) {
  const newestTweet = tweets[tweets.length - 1];
  $('#tweets-container').prepend(createTweetElement(newestTweet));
};

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

$(document).ready(function() {
  $('.error').hide();
  $(".textField").submit(function(event) {
    event.preventDefault();
    const newTweet = $('#tweet-text').val().length;
    if (!newTweet) {
      $('.error').html("The tweet is empty!");
      $('.error').slideDown();
      return;
    } else if (newTweet > 140) {
      $('.error').html("Your tweet contains too many characters!");
      $('.error').slideDown();
      return;
    }
    $('.error').html("");
    $('.error').hide();
    const formData = $(this).serialize();
    $.post("/tweets", formData, function(data) {
      $('#tweet-text').val('');
      $('.counter').val(140);
      $.get('/tweets', renderNewTweet);
    });
  }); loadTweets();
});
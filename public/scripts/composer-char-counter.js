$(document).ready(function() {
  const tweet = document.getElementById("tweet-text");

  tweet.addEventListener("input", function() {
    let numOfChars = (140 - $(this).val().length);
    let counter = $('.counter');

    if (numOfChars < 0) {
      counter.addClass('exceedCharLimit');
    } else {
      counter.removeClass('exceedCharLimit');
    }
    counter.html(numOfChars);
  });
});
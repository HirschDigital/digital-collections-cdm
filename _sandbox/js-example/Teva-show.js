var btn = $('#topButton');

$(window).scroll(function() {
  if ($(window).scrollTop() > 600) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.click(function() {
  $('html, body').animate({scrollTop:0}, "slow");
});